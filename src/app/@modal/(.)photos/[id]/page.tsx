import {getImageById} from "~/server/queries";

export default async function PhotoModal({
                                             params,
                                         }: {
    params: Promise<{ id: string }>;
}) {
    const image = await getImageById(parseInt((await params).id));
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-3xl w-full bg-white rounded-lg p-4 shadow-lg">
                <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-medium text-gray-800">{image.name}</h3>
                    <p className="text-sm text-gray-600">
                        Uploaded by {image.userId}
                    </p>
                </div>
            </div>
        </div>
    );
}