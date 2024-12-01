'use client';

import { useState, useEffect } from 'react';
import { Star, MessageCircle, Share2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import {  SignedIn, SignedOut} from '@clerk/nextjs'

interface RatingData {
    averageRating: number;
    totalRatings: number;
    userRating: number | null;
}

export default function PhotoInteractions({ imageId }: { imageId: number }) {
    const router = useRouter();
    const [rating, setRating] = useState<number | null>(null);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial rating data
    useEffect(() => {
        const fetchRatingData = async () => {
            try {

                console.log("Rating request received");
                const response = await fetch("/api/ratings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        imageId: imageId,
                        rating: -1,
                        command: "get",
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch ratings');
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const data: RatingData = await response.json();
                setRating(data.userRating);
                setAverageRating(Number(data.averageRating));
                setTotalRatings(data.totalRatings);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchRatingData();
    }, [imageId]);

    const handleRating = async (rating: number) => {
        try {
            const response = await fetch("/api/ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageId: imageId,
                    rating: rating,
                    command: "set",
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update rating');
            }

            const data: RatingData = await response.json();
            setRating(data.userRating);
            setAverageRating(Number(data.averageRating));
            setTotalRatings(data.totalRatings);
            console.log(data);
            router.refresh();
        } catch (error) {
            console.error('Error rating:', error);
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

    if (isLoading) {
        return (
            <div className="flex space-x-4 mb-6">
                <div className="animate-pulse flex space-x-4">
                    <div className="h-6 w-32 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex space-x-4 mb-6">
            <div className="flex items-center space-x-2">

                <SignedIn>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(null)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className="w-6 h-6 transition-colors duration-200"
                                    fill={(hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                        ? '#60A5FA'
                                        : 'none'}
                                    stroke={(hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                        ? '#60A5FA'
                                        : '#94A3B8'}
                                />
                            </button>
                        ))}
                    </div>
                </SignedIn>

                <SignedOut>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className="w-6 h-6 text-slate-400"
                                fill="none"
                            />
                        ))}
                    </div>

                </SignedOut>


                <span className="text-slate-600">
                    {averageRating.toFixed(1)} ({totalRatings})
                </span>
            </div>

            <button
                onClick={handleShare}
                className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-colors duration-200"
            >
                <Share2 className="w-6 h-6"/>
                <span>Share</span>
            </button>
        </div>
    );
}