const Loading = ({ isLoading }: { isLoading?: boolean }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center h-screen bg-black bg-opacity-40">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loading;
