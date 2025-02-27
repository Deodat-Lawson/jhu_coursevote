import "server-only"
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";


export async function getUserImages() {
    const user = await auth();
    if (!user.userId) {
        throw new Error("Unauthorized");
    }
    const images = await db.query.images.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}
