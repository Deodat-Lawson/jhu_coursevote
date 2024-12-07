import { getImageById } from "~/server/queries";
import FullPageImagePhotoInteractions from "~/app/components/full-page-image-photo-interactions";
import FullPageImageCommentSection from "~/app/components/full-page-image-comment";
import FullPageImageCommentBox from "~/app/components/full-page-image-comment-box";

export default async function FullPageImageView({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await getImageById(parseInt(id, 10));

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="w-[90vw] h-[85vh] max-w-7xl mx-auto bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
                <div className="flex h-full">
                    {/* Image Container */}
                    <div className="w-[65%] h-full bg-slate-900">
                        <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Info and Interaction Section */}
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
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <FullPageImagePhotoInteractions imageId={image.id} />
                            <FullPageImageCommentSection imageId={image.id} />
                            <FullPageImageCommentBox imageId={image.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}