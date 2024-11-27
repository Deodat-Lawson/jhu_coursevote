import Link from "next/link";
import { db } from "~/server/db";
import {getMyImages} from "~/server/queries";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";


export const dynamic = "force-dynamic";



export default async function HomePage() {

    const images = await getMyImages();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="flex flex-wrap gap-4 justify-center">
                {images.map((post) => (
                    <div key={post.id} className="m-2">
                        <Image src={post.url} style={{objectFit: "contain"}} alt={post.name} width={192} height={192}/>
                        <div>uploaded by {post.userId}</div>
                    </div>
                ))}


                Hello, development in progress!
            </div>
        </main>
    );
}