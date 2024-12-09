"use client";

import {UploadingBox} from "~/app/_components/UploadingBox";
import {useState} from "react";

export default function CourseAdditionPage() {
    const [formData, setFormData] = useState({
        teacher: '',
        courseNumber: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Upload Section */}
                <div className="mb-12 rounded-xl bg-slate-700/50 p-6 border-2 border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Add a Course</h2>
                        <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                        <UploadingBox />
                    </div>
                </div>


                {/* Course Details Form */}
                <div className="rounded-xl bg-slate-700/50 p-6 border-2 border-slate-600">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Course Details</h2>
                        <div className="h-px flex-1 bg-slate-600 mx-4"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Teacher Input */}
                            <div>
                                <label htmlFor="teacher" className="block text-sm font-medium text-slate-200 mb-2">
                                    Teacher
                                </label>
                                <input
                                    type="text"
                                    id="teacher"
                                    name="teacher"
                                    value={formData.teacher}
                                    onChange={handleChange}
                                    className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Enter teacher's name"
                                />
                            </div>

                            {/* Course Number Input */}
                            <div>
                                <label htmlFor="courseNumber" className="block text-sm font-medium text-slate-200 mb-2">
                                    Course Number
                                </label>
                                <input
                                    type="text"
                                    id="courseNumber"
                                    name="courseNumber"
                                    value={formData.courseNumber}
                                    onChange={handleChange}
                                    className="w-full rounded-lg bg-slate-800/50 border border-slate-600 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Enter course number"
                                />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
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

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                            >
                                Save Course
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
}




