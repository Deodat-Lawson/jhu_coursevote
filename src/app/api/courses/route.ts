import { NextResponse } from 'next/server';
import { courses } from "~/server/db/schema";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        const user = await auth();

        if (!user.userId) {
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            );
        }

        const {imageId, teacher, courseCode, description, title} = await request.json();

        const insertedCourse = await db.insert(courses).values({

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            title: title,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            imageId: imageId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            teacher: teacher,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            courseNumber: courseCode,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            description: description,
            createdAt: new Date(),
        });

        return NextResponse.json({success: true});
    } catch (error) {
        console.error("Error creating course:", error);
        return NextResponse.json(
            {error: "Failed to create course"},
            {status: 500}
        );
    }
}