import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        const user = await auth();

        if (!user.userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { imageId, text } = await request.json();

        if (!imageId || !text) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await db.insert(comments).values({
            userId: user.userId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            imageId: imageId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            content: text,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}