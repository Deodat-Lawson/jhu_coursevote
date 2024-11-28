"use client";

import { useRouter } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
import { UploadDropzone } from "~/app/utils/uploadthing";
import { useState } from "react";

export const UploadingBox = () => {
    const router = useRouter();
    const [uploadError, setUploadError] = useState<string | null>(null);

    return (
        <SignedIn>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Upload completed:", res);
                    router.refresh();
                }}
                onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    setUploadError(error.message);
                }}
                onUploadBegin={() => {
                    console.log("Upload starting");
                    setUploadError(null);
                }}
                // Add config to match your server settings

            />
            {uploadError && (
                <div className="text-red-500 mt-2">
                    Error: {uploadError}
                </div>
            )}
        </SignedIn>
    );
};