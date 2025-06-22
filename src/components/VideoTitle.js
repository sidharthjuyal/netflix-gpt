const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video xl:pt-[13%] lg:pt-[10%] md:pt-[10%] pt-[8%] absolute px-6 md:px-24 bg-gradient-to-r from-black">
      <h1 className="text-white xl:text-2xl lg:text-xl md:text-lg text-2xl font-bold">{title}</h1>
      <p className="text-white py-6 xl:text-md lg:text-sm md:text-xs text-xs w-3/4 md:w-1/2">{overview}</p>
      <div>
        <button className="hover:opacity-[0.85] bg-white text-black py-2 px-5 md:py-4 md:px-10 xl:text-lg lg:text-md md:text-sm text-sm rounded-lg">▷ Play</button>
        <button className="hidden md:inine-block  hover:opacity-[0.85] bg-gray-500 text-white py-4 px-10 xl:text-lg lg:text-md md:text-sm text-xl rounded-lg mx-2">ⓘ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
