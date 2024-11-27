import Link from "next/link";
import { db } from "~/server/db";

import { ClerkProvider } from "@clerk/nextjs";


export const dynamic = "force-dynamic";

const images = await db.query.images.findMany();

export default async function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="flex flex-wrap gap-4">
                {images.map((post) => (
                    <div key={post.id} className="m-2">
                        <img src={post.url} className="flex w-48 flex-col" />
                        <div>{post.name}</div>
                        <div>uploaded by {post.userId}</div>
                    </div>
                ))}


                Hello, development in progress!
            </div>
        </main>
    );
}