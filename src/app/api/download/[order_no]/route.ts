import { NextResponse } from "next/server";
import { findOrderByOrderNo, OrderStatus } from "@/models/order";
import { getUserUuid } from "@/services/user";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ order_no: string }> }
) {
  try {
    const { order_no } = await params;

    // Get authenticated user
    const user_uuid = await getUserUuid();
    if (!user_uuid) {
      return NextResponse.json(
        { error: "Please sign in to download" },
        { status: 401 }
      );
    }

    // Find order
    const order = await findOrderByOrderNo(order_no);
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Verify order belongs to user
    if (order.user_uuid !== user_uuid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Verify order is paid
    if (order.status !== OrderStatus.Paid) {
      return NextResponse.json(
        { error: "Order not paid" },
        { status: 403 }
      );
    }

    // Verify it's the china-guide product
    if (order.product_id !== "china-guide") {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    // TODO: Generate signed URL from S3/R2 storage
    // For now, return a placeholder message
    const pdfUrl = process.env.PDF_DOWNLOAD_URL || "/china-tour-guide-2025.pdf";

    // Option 1: Redirect to PDF URL (if using S3 signed URLs)
    // return NextResponse.redirect(pdfUrl);

    // Option 2: Return download URL as JSON
    return NextResponse.json({
      success: true,
      download_url: pdfUrl,
      product_name: order.product_name,
      message: "PDF download ready. Configure STORAGE_* env vars to enable S3 downloads.",
    });

    // Option 3: Stream file directly (if stored locally)
    // const file = await fs.readFile(path.join(process.cwd(), 'public', 'china-tour-guide-2025.pdf'));
    // return new NextResponse(file, {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename="china-tour-guide-2025.pdf"`,
    //   },
    // });

  } catch (e: any) {
    console.error("Download error:", e);
    return NextResponse.json(
      { error: "Download failed: " + e.message },
      { status: 500 }
    );
  }
}
