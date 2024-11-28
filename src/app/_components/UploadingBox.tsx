"use client";

import {useRouter} from "next/navigation";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {UploadButton, UploadDropzone} from "~/app/utils/uploadthing";

export const  UploadingBox= () => {

    const router = useRouter();

    return (

    <SignedIn>

        <UploadDropzone endpoint="imageUploader" onClientUploadComplete={() => {
             router.refresh();
        }}/>

    </SignedIn>

    );
};
