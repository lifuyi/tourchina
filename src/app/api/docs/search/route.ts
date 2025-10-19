import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/open-source/supported-languages
  language: "english",
  // For multilingual support, we'll use English as the primary language
  // Chinese content will be indexed using English stemming
});
