import { getImageById } from "~/server/queries";
import Modal from "~/app/@modal/(.)photos/[id]/modal";
import PhotoInteractions from "./PhotoInteractions";
import CommentSection from "./CommentSection";
import CommentBox from "./CommentBox";

import CloseButton from "~/app/@modal/(.)photos/[id]/closeButton";

export default async function PhotoModal({
                                             params,
                                         }: {
    params: Promise<{ id: string }>;
}) {
    const image = await getImageById(parseInt((await params).id));

    return (
        <Modal>
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/90">
                <div className="w-[90vw] h-[85vh] max-w-7xl bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">

                    <CloseButton />

                    <div className="flex h-full">



                        {/* Image Container - Fixed to 65% width */}
                        <div className="w-[65%] h-full bg-slate-900">
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Info and Interaction Section - Fixed to 35% width */}
                        <div className="w-[35%] h-full flex flex-col">
                            {/* Header with User Info */}
                            <div className="p-6 border-b border-slate-700">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                                    <div>
                                        <h3 className="font-medium text-slate-100">
                                            {image.name}
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            By {image.userId}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <PhotoInteractions imageId={image.id} />
                                <CommentSection imageId={image.id} />
                                <CommentBox imageId={image.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}