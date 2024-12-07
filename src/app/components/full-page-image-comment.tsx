'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";


interface CommentSectionProps {
    imageId: number;
}

export default function FullPageImageCommentSection({ imageId }: CommentSectionProps) {
    const router = useRouter();
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {

            // console.log("request started");
            const response = await fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageId,
                    text: newComment,
                }),
            });

            // console.log("request sent");

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to post comment");
            }

            setNewComment("");
            router.refresh();
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to post comment";
            setError(message);
            console.error("Error posting comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Comments</h4>

            <form onSubmit={handleSubmitComment} className="flex gap-2 sticky bottom-4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                             text-slate-100 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="px-6 py-2 bg-blue-600 text-slate-100 rounded-lg
                             hover:bg-blue-500 active:bg-blue-700
                             transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Posting..." : "Post"}
                </button>
            </form>
            {error && (
                <div className="text-red-400 text-sm px-4">
                    Error: Please Sign In
                </div>
            )}

        </div>
    );
}