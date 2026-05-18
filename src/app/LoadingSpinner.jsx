"use client";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin">        Global loading......
</div>
    </div>
  );
};

export default LoadingSpinner;