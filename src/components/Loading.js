import { BG_URL } from "../utils/constants";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-black text-xl p-4">
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-10">
            <img
              className="w-full h-full object-cover"
              alt="background Image"
              src={BG_URL}
            />
          </div>
          <div className="backdrop-blur-sm rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-3 bg-[rgba(0,0,0,0.8)]">
            Loading...
          </div>
        </div>
      </div>
  );
};

export default Loading;

