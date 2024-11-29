
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

// Get all comments for a specific image
export async function getCommentsByImageId(imageId: number) {
    const comments = await db.query.comments.findMany({
        where: (model, {eq}) => eq(model.imageId, imageId),
        orderBy: (model, {desc}) => desc(model.createdAt),
    });
    return comments;
}

// Get a specific comment by ID
export async function getCommentById(commentId: number) {
    const comment = await db.query.comments.findFirst({
        where: (model, {eq}) => eq(model.id, commentId),
    });
    if (!comment) {
        throw new Error("Comment not found");
    }
    return comment;
}

