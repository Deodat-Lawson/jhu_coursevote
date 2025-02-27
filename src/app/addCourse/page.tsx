"use client";
// Previous imports remain the same
import React, { useState, useEffect } from "react";
import { UploadingBox } from "~/app/_components/UploadingBox";
import { RefreshCw, Loader2 } from "lucide-react"; // Import the refresh icon

export const dynamic = "force-dynamic";

// PRESET_IMAGES and interfaces remain the same...
const PRESET_IMAGES = [
    { id: 1, src: "/assets/sigma.gif", alt: "Funny Course Image 1" , url: "https://utfs.io/f/7CCGyytM9ORCFGKhm4nsIbGl2he4AvWfkDKSNC9ZREiLmap7"},
    { id: 2, src: "/assets/kim.gif", alt: "Funny Course Image 2", url:"https://utfs.io/f/7CCGyytM9ORCboWhEauOw8sMPYGrfh7T5AlENagnKQFVIqj3"},
    { id: 3, src: "/assets/ew.jpg", alt: "Funny Course Image 3", url: "https://utfs.io/f/7CCGyytM9ORCJERL6bxiaVfLoKeWcgly6xHs25UkAqC93I8w"},
    { id: 4, src: "/assets/hamster.gif", alt: "Funny Course Image 4", url: "https://utfs.io/f/7CCGyytM9ORCQ7r5oOYzOQ4hiWTvPCsfnG1rlVbjdYFyLacA"},
];

interface UserUploadedImage {
    id: number;
    src: string;
    alt: string;
}

export default function CourseAdditionPage() {
    // Previous state declarations remain the same...
    const [step, setStep] = useState(1);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [userUploadedImages, setUserUploadedImages] = useState<UserUploadedImage[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [formData, setFormData] = useState({
        teacher: '',
        courseNumber: '',
        description: '',
        name: '',
    });

    // Previous useEffect and handlers remain the same...
    useEffect(() => {
        const fetchUserUploadedImages = async () => {
            try {
                setIsRefreshing(true);
                console.log("Fetching images...");
                const response = await fetch("/api/images", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                const formattedImages = data.map((img: { id: number; url: string }) => ({
                    id: img.id,
                    src: img.url,
                    alt: 'User uploaded image'
                }));

                setUserUploadedImages(formattedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsRefreshing(false);
            }
        };

        void fetchUserUploadedImages();
    }, [refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };


    // Keep all other existing handlers...
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        // Validation
        if (!selectedImage) {
            setSubmitError("Please select an image for the course");
            setIsSubmitting(false);
            return;
        }

        if (!formData.name || !formData.teacher || !formData.courseNumber) {
            setSubmitError("Please fill in all required fields");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl: selectedImageUrl,
                    teacher: formData.teacher,
                    courseCode: formData.courseNumber,
                    description: formData.description,
                    title: formData.name,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to save course');
            }

            setSubmitSuccess(true);

            // Reset form after successful submission
            setFormData({
                teacher: '',
                courseNumber: '',
                description: '',
                name: ''
            });
            setSelectedImage(null);
            setStep(1);

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageSelect = (id: number, url: string, isPreset: boolean) => {
        setSelectedImage(id);
        setSelectedImageUrl(url);
    };


    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Progress steps remain the same... */}
                <div className="mb-8 flex justify-center">
                    <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-600'} flex items-center justify-center text-white`}>1</div>
                        <div className={`h-1 w-16 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-600'}`} />
                        <div className={`h-8 w-8 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-600'} flex items-center justify-center text-white`}>2</div>
                    </div>
                </div>

                {step === 1 ? (
                    <div className="rounded-xl bg-slate-700/50 p-6 border-2 border-slate-600">
                        {/* First section remains the same... */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Choose a Funny Course Image!</h2>
                            <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {PRESET_IMAGES.map((image) => (
                                    <div
                                        key={image.id}
                                        onClick={() => handleImageSelect(image.id, image.src, true )}
                                        className={`relative cursor-pointer rounded-lg overflow-hidden ${
                                            selectedImage === image.id ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User uploaded images section with refresh button */}
                        {userUploadedImages.length > 0 && (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-xl font-semibold text-white">Choose your own Image!</h2>
                                        <button
                                            onClick={handleRefresh}
                                            disabled={isRefreshing}
                                            className="p-2 text-slate-200 hover:text-white rounded-lg bg-slate-600/50 hover:bg-slate-600 transition-colors"
                                        >
                                            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                        </button>
                                    </div>
                                    <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {userUploadedImages.map((image) => (
                                            <div
                                                key={image.id}
                                                onClick={() => handleImageSelect(image.id, image.src, false)}
                                                className={`relative cursor-pointer rounded-lg overflow-hidden ${
                                                    selectedImage === image.id ? 'ring-2 ring-blue-500' : ''
                                                }`}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Upload section remains the same... */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Or Upload Your Own</h2>
                            <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                            <UploadingBox />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setStep(2)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                ) : (
                    // Second step remains exactly the same...
                    <div className="rounded-xl bg-slate-700/50 p-6 border-2 border-slate-600">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Course Details</h2>
                            <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                        </div>

                        {submitError && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                                        Course Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Enter course name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="teacher" className="block text-sm font-medium text-slate-200 mb-2">
                                        Teacher <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="teacher"
                                        name="teacher"
                                        value={formData.teacher}
                                        onChange={handleChange}
                                        className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Enter teacher's name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="courseNumber"
                                           className="block text-sm font-medium text-slate-200 mb-2">
                                        Course Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="courseNumber"
                                        name="courseNumber"
                                        value={formData.courseNumber}
                                        onChange={handleChange}
                                        className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Enter course number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description"
                                           className="block text-sm font-medium text-slate-200 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Enter course description"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin"/>
                                            Saving...
                                        </>
                                    ) : (
                                        'Save Course'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}