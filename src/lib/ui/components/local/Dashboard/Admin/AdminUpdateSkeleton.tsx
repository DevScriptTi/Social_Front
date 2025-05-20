export default function AdminUpdateSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-full max-w-md animate-pulse">
            {/* Username Input Skeleton */}
            <div className="flex flex-col items-start gap-4 w-full">
                <div className="relative z flex items-center h-14 rounded-md w-full border-2 border-primary dark:border-dark-primary px-4">
                    <div className="absolute z-0 top-0 px-2 text-lable-large -translate-y-1/2 bg-surface-container-low dark:bg-dark-surface-container-low">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>

            {/* Last Name Input Skeleton */}
            <div className="flex flex-col items-start gap-4 w-full">
                <div className="relative z flex items-center h-14 rounded-md w-full border-2 border-primary dark:border-dark-primary px-4">
                    <div className="absolute z-0 top-0 px-2 text-lable-large -translate-y-1/2 bg-surface-container-low dark:bg-dark-surface-container-low">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>

            {/* Button Skeleton */}
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    );
} 