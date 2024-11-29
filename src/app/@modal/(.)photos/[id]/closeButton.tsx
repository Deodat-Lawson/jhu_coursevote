'use client';

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600
                     transition-colors duration-200 z-10"
        >
            <X className="w-6 h-6 text-slate-200" />
        </button>
    );
}