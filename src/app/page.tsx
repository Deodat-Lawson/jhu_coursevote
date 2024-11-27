import Link from "next/link";
import { db } from "~/server/db";


export const dynamic = "force-dynamic";

const posts = await db.query.posts.findMany();

const mockUrl = [
    "https://utfs.io/f/7CCGyytM9ORCCFJ2C5euiXWMRZ8pT590k71jgUAnoEwPJy2F",
];

const mockImages = mockUrl.map((url, index) => ({
    id: index + 1,
    url,
}));

export default async function HomePage() {



    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="flex flex-wrap gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="m-2">
                        <h2 className="text-xl font-bold">{post.name}</h2>
                    </div>
                ))}

                {mockImages.map((image) => (
                    <div key={image.id} className="m-2">
                        <img
                            src={image.url}
                            alt="mock"
                            className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                        />
                    </div>
                ))}

                Hello, development in progress!
            </div>
        </main>
    );
}