const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video xl:pt-[13%] lg:pt-[10%] md:pt-[10%] pt-[15%] absolute px-24 bg-gradient-to-r from-black">
      <h1 className="text-white xl:text-2xl lg:text-xl md:text-lg text-3xl font-bold">{title}</h1>
      <p className="text-white py-6 xl:text-md lg:text-sm md:text-xs text-lg w-1/2">{overview}</p>
      <div className="">
        <button className="hover:opacity-[0.85] bg-white text-black py-4 px-10 xl:text-lg lg:text-md md:text-sm text-xl rounded-lg">▷ Play</button>
        <button className="hover:opacity-[0.85] bg-gray-500 text-white py-4 px-10 xl:text-lg lg:text-md md:text-sm text-xl rounded-lg mx-2">ⓘ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
