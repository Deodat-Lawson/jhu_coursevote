'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PhotoInteractionsProps {
    imageId: number;
}

export default function FullPageImagePhotoInteractions({ imageId }: PhotoInteractionsProps) {
    const [likes, setLikes] = useState(1200);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        try {
            setIsLiked(!isLiked);
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Check out this photo',
                url: window.location.href,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                    isLiked ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'
                } transition-colors duration-200`}
            >
                <Heart className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} />
                <span>{likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors duration-200">
                <MessageCircle className="w-6 h-6" />
                <span>234</span>
            </button>
            <button
                onClick={handleShare}
                className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors duration-200"
            >
                <Share2 className="w-6 h-6" />
                <span>Share</span>
            </button>
        </div>
    );
}