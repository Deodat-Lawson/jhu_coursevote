

import Link from "next/link";
import { db } from "~/server/db";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/app/utils/uploadthing";
import { getImages } from "~/server/queries";
import {UploadingBox} from "~/app/_components/UploadingBox"

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getImages();

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((post) => (
                <div
                    key={post.id}
                    className="group overflow-hidden rounded-lg bg-white/10 p-4 transition-all hover:bg-white/20"
                >
                    <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                            src={post.url}
                            alt={post.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="mt-4 space-y-2">
                        <h3 className="text-lg font-medium text-white">{post.name}</h3>
                        <p className="text-sm text-slate-300">
                            Uploaded by {post.userId}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

}

export default function HomePage() {

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">Popular Hopkins Courses</h1>
                </div>

                <div className="mb-8 rounded-lg bg-blue-600/20 p-4 text-center text-white">
                    <p>Project still in development, please sign in to upload</p>
                    <p></p>
                </div>

                <div>
                    <p>Upload here</p>
                    <UploadingBox />
                </div>



                {/* Gallery Grid */}
                <Images/>
            </div>
        </main>
    );
}