// to naviagte from page tp page
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient shine-text">
      <span className="text-center text-2xl font-semibold text-cyan-500 ">
        <div>
          <span className="text-black">T</span>his{" "}
          <span className="text-black">I</span>s
        </div>{" "}
        <span className="text-black">S</span>tudio{" "}
        <span className="text-black">G</span>hibli{" "}
        <span className="text-black">E</span>njoyers'{" "}
        <span className="text-black">C</span>ommunity
        <Link
          to="/posts"
          className="w-85  px-5  mb-6 font-mono text-md  text-cyan-400 border-none rounded-sm cursor-pointer"
        >
          -----
        </Link>
      </span>
    </div>
  );
}
export default Home;
