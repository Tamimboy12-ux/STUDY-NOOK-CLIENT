import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full space-y-4">
     <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-muted">Success</span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading, please wait...
      </h2>
      <p className="text-sm text-gray-400">
        Fetching Study Nook data
      </p>
    </div>
  );
}