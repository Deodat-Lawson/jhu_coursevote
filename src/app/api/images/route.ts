import { db } from "~/server/db";
import {images, ratings} from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    console.log("Rating request received");
    try {
        const user = await auth();

        if (!user.userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userImages = await db
            .select()
            .from(images)
            .where(
                eq(images.userId, user.userId)
            );

        return new NextResponse(JSON.stringify(userImages), { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}



