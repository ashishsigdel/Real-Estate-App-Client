import { FaSearch } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2 mb-3">
      <div className="px-3 py-2 rounded-md flex items-center text-darkcolor/80 gap-2 border border-lightcolor dark:border-darkcolor w-28 sm:w-52">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none placeholder:text-darkcolor/50 dark:placeholder:text-gray-500 text-darkcolor dark:text-gray-300 w-full"
        />
        <button type="submit">
          <div className="text-skin">
            <FaSearch />
          </div>
        </button>
      </div>
    </form>
  );
};
export default SearchInput;
