"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const CustomLoading = ({ loading }) => {
    // Early return for a clean conditional check
    if (!loading) return null;

    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                {/* Title for the dialog */}
                <AlertDialogTitle>Processing Request</AlertDialogTitle>

                {/* Description for accessibility */}
                <AlertDialogDescription>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {/* Loading spinner with accessible label */}
                        <div
                            className="spinner w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                            aria-label="Loading, please wait..."
                        />
                        {/* Informative message */}
                        <p className="text-lg font-semibold text-gray-700">
                            Generating your video... Please wait.
                        </p>
                    </div>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomLoading;
