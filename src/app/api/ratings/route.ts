import { db } from "~/server/db";
import { ratings } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, avg, count } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    console.log("Rating request received");
    try {
        const user = await auth();
        const { imageId, rating, command } = await request.json();

        if (!user.userId) {

            // Get average rating and total count
            const [avgResult] = await db
                .select({
                    average: avg(ratings.rating),
                    total: count(ratings.id),
                })
                .from(ratings)
                .where(eq(ratings.imageId, imageId));

            const result = {
                averageRating: avgResult?.average ?? 0,
                totalRatings: avgResult?.total ?? 0,
                userRating: 0, // Return 0 if no rating exists
            };

            return new NextResponse(JSON.stringify(result), { status: 200 });

        }




        if(command === "get") {
            // First check if user has already rated this image
            const [existingRating] = await db
                .select()
                .from(ratings)
                .where(
                    and(
                        eq(ratings.imageId, imageId),
                        eq(ratings.userId, user.userId)
                    )
                );

            // Get average rating and total count
            const [avgResult] = await db
                .select({
                    average: avg(ratings.rating),
                    total: count(ratings.id),
                })
                .from(ratings)
                .where(eq(ratings.imageId, imageId));

            const result = {
                averageRating: avgResult?.average ?? 0,
                totalRatings: avgResult?.total ?? 0,
                userRating: existingRating?.rating ?? 0, // Return 0 if no rating exists
            };

            return new NextResponse(JSON.stringify(result), { status: 200 });

        }
        else{ //command is "set"

            // Check if user has already rated this image
            const existingRating = await db
                .select()
                .from(ratings)
                .where(
                    and(
                        eq(ratings.imageId, imageId),
                        eq(ratings.userId, user.userId)
                    )
                );

            if (existingRating.length > 0) {
                // Update existing rating
                await db
                    .update(ratings)
                    .set({
                        rating: rating,
                        updatedAt: new Date(),
                    })
                    .where(
                        and(
                            eq(ratings.imageId, imageId),
                            eq(ratings.userId, user.userId)
                        )
                    );
            } else {
                // Insert new rating
                await db
                    .insert(ratings)
                    .values({
                        userId: user.userId,
                        imageId: imageId,
                        rating: rating,
                        createdAt: new Date(),
                    });
            }

            // Get updated stats
            const [avgResult] = await db
                .select({
                    average: avg(ratings.rating),
                    total: count(ratings.id),
                })
                .from(ratings)
                .where(eq(ratings.imageId, imageId));

            // Get user's current rating
            const [userRating] = await db
                .select()
                .from(ratings)
                .where(
                    and(
                        eq(ratings.imageId, imageId),
                        eq(ratings.userId, user.userId)
                    )
                );

            const result = {
                averageRating: avgResult?.average ?? 0,
                totalRatings: avgResult?.total ?? 0,
                userRating: userRating?.rating ?? null,
            };

            return new NextResponse(JSON.stringify(result), { status: 200 });
        }




    } catch (error) {
        console.error('Error updating rating:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



