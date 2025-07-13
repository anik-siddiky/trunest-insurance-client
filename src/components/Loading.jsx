import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
        style={{
          borderColor: "oklch(53.343% 0.148 149.093)",
          borderTopColor: "transparent",
        }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
