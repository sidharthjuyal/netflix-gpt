const GptSearchBar = () => {
  return (
    <div className="w-full flex justify-center items-center h-60 bg-black">
      <form className="w-1/2 flex justify-center p-6 m-6">
        <input
          type="text"
          placeholder="What would you like to watch today?"
          className="w-4/5 p-2 m-4 bg-white"
        />
        <button className="w-1/5 p-2 m-4 bg-red-700 text-white rounded-lg hover:cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
