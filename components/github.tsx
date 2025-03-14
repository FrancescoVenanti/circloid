import { Github } from "lucide-react";
import Link from "next/link";

const GithubButton = () => {
  return (
    <div className="flex justify-center mt-6">
      <Link
        href="https://github.com/FrancescoVenanti/circloid"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition duration-300"
      >
        <Github />
      </Link>
    </div>
  );
};

export default GithubButton;
