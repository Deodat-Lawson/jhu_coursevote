import { db } from "~/server/db";
import {auth} from "@clerk/nextjs/server";


export async function getCourses() {
    const courses = await db.query.courses.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    return courses;
}


export async function getImages() {
    const images = await db.query.images.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}

export async function getImageById(id: number) {
    const image = await db.query.images.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });
    if (!image) {
        throw new Error("Image not found");
    }
    return image;
}

export async function getCommentsByImageId(imageId: number) {
    const comments = await db.query.comments.findMany({
        where: (model, { eq }) => eq(model.imageId, imageId),
        orderBy: (model, { desc }) => desc(model.createdAt),
    });
    return comments;
}

export async function getCommentById(commentId: number) {
    const comment = await db.query.comments.findFirst({
        where: (model, { eq }) => eq(model.id, commentId),
    });
    if (!comment) {
        throw new Error("Comment not found");
    }
    return comment;
}