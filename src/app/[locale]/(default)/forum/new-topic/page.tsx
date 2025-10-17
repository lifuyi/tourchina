import { Metadata } from "next";
import NewTopicForm from "@/components/blocks/forum/new-topic-form";

export const metadata: Metadata = {
  title: "Create New Topic | China Travel Forum",
  description: "Start a new discussion in the China Travel Forum community.",
};

export default function NewTopicPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Topic
          </h1>
          <p className="text-gray-600 mb-8">
            Start a new discussion and engage with the China travel community
          </p>
          
          <NewTopicForm />
        </div>
      </div>
    </div>
  );
}