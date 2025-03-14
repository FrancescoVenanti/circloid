import Image from "next/image";
import Link from "next/link";

const BuyMeACoffee = () => {
  return (
    <div className="flex justify-center mt-6">
      <Link
        href="https://www.buymeacoffee.com/circloid"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 hover:bg-yellow-500 hover:shadow-2xl text-black font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition duration-300"
      >
        <Image src="/bmc.png" alt="buy my a coffee" width={20} height={20} />
      </Link>
    </div>
  );
};

export default BuyMeACoffee;
