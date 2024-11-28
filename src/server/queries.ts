import "server-only";
import { db } from "~/server/db";


export async function getImages() {

    const images = await db.query.images.findMany({
        orderBy: (model, {desc}) => desc(model.id),
    });
    return images;
}


export async function getImageById(id: number) {
    const image = await db.query.images.findFirst({
        where: (model, {eq}) => eq(model.id, id),
    });
    if(!image) {
        throw new Error("Image not found");
    }
    return image;
}