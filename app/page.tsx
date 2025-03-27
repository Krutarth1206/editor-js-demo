"use client";

import { useState } from "react";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false, // Disable SSR for EditorJS
});
import dynamic from "next/dynamic";
const EditorOutput = dynamic(() => import("@/components/EditorOutput"), {
  ssr: false, // Disable SSR for EditorJS
});

export default function CreatePost() {
  const [content, setContent] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedContent, setSavedContent] = useState<{
    title: string;
    content: any;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  const handleEditorChange = (data: any) => {
    setContent(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post Content:", content);

    // Store the content in state instead of sending to API
    setIsSubmitting(true);
    setTimeout(() => {
      setSavedContent({ title, content: content || { blocks: [] } });
      setIsSubmitting(false);
    }, 500); // Simulate network delay
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            EditorJS Demo
          </h1>
          <p className="mt-2 text-gray-600">
            Create rich content with this powerful editor
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "editor"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => setActiveTab("editor")}
            >
              Editor
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "preview"
                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
          </div>

          {activeTab === "editor" ? (
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter post title"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content
                  </label>
                  <div className="border border-gray-200 rounded-md p-1">
                    <Editor
                      data={content || undefined}
                      onChange={handleEditorChange}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Try different blocks: paragraphs, headings, lists, quotes,
                    code, and more!
                  </p>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <div className="text-sm text-gray-500">
                    {content && content.blocks
                      ? `${content.blocks.length} blocks created`
                      : "No content yet"}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isSubmitting
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
                  >
                    {isSubmitting ? "Saving..." : "Save Content"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Content Preview</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                {savedContent?.content ? (
                  <EditorOutput data={savedContent.content} />
                ) : (
                  <div className="text-gray-500 italic">
                    No content saved yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
