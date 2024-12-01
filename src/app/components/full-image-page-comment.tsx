'use client';

import { useState } from 'react';

interface Comment {
    id: number;
    user: string;
    text: string;
    timestamp: string;
}

interface CommentSectionProps {
    imageId: number;
}

export default function FullPageImageCommentSection({ imageId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            user: 'User123',
            text: 'Beautiful capture! Love the composition and lighting.',
            timestamp: '2 hours ago'
        }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const comment: Comment = {
                id: Date.now(),
                user: 'CurrentUser',
                text: newComment,
                timestamp: 'Just now'
            };

            setComments(prev => [comment, ...prev]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Comments</h4>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="flex space-x-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                             text-slate-100 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-slate-100 rounded-lg
                             hover:bg-blue-500 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    Post
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="border-b border-slate-700 pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-slate-700" />
                            <div>
                                <p className="font-medium text-sm text-slate-100">
                                    {comment.user}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {comment.timestamp}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}