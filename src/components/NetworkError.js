const NetworkError = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white text-center p-4">
      <div className="max-w-md bg-red-800/60 p-4 rounded-xl backdrop-blur">
        <h2 className="text-xl font-bold mb-2">⚠️ Network Issue</h2>
        <p className="text-sm">
          We tried reloading the page, but it still didn't work. Please check
          your internet and try manually refreshing.
        </p>
      </div>
    </div>
  );
};

export default NetworkError;