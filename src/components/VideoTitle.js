const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] absolute px-24 bg-gradient-to-r from-black">
      <h1 className="text-white text-4xl font-bold">{title}</h1>
      <p className="text-white py-6 text-lg w-1/3">{overview}</p>
      <div className="">
        <button className="hover:opacity-[0.85] bg-white text-black py-4 px-10 text-xl rounded-lg">▷ Play</button>
        <button className="hover:opacity-[0.85] bg-gray-500 text-white py-4 px-10 text-xl rounded-lg mx-2">ⓘ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
