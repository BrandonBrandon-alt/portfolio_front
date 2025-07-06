import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className="p-6 rounded-lg border-2 border-[var(--color-accent-jedi-blue)]/50 bg-[var(--color-background)]/40 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center animate-pulse">
      <div className="w-full h-48 bg-[var(--color-text-muted)]/30 rounded-md mb-4"></div>
      <div className="w-3/4 h-6 bg-[var(--color-text-muted)]/30 rounded-md mb-2"></div>
      <div className="w-1/2 h-4 bg-[var(--color-text-muted)]/30 rounded-md"></div>
      <div className="mt-4 w-full flex justify-center space-x-2">
        <div className="w-1/3 h-8 bg-[var(--color-text-muted)]/30 rounded-md"></div>
        <div className="w-1/3 h-8 bg-[var(--color-text-muted)]/30 rounded-md"></div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
