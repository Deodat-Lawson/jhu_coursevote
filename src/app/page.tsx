

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
                        <Link href={`/photos/${post.id}`}>
                        <img
                            src={post.url}
                            alt={post.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        </Link>
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
                    <h1 className="text-3xl font-bold text-white">JHU Course Vote (Beta 1.0)</h1>
                </div>

                <div className="mb-8 rounded-lg bg-blue-600/20 p-4 text-center text-white">
                    <p>Project still in development, please sign in to upload</p>
                </div>

                {/* Upload Section */}
                <div className="mb-12 rounded-xl bg-slate-700/50 p-6 border-2 border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Add a Course</h2>
                        <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                        <UploadingBox />
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Popular Courses</h2>
                        <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                    </div>
                    <Images/>
                </div>
            </div>
        </main>
    );
}