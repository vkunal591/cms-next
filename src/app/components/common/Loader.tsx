import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Replace with your logo */}
        <div className="animate-bounce">
          <Image
            src="/assets/logo/logo.png" // replace with your logo path
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <div className="text-gray-700 text-sm font-medium animate-pulse">
          Loading your experience...
        </div>
      </div>
    </div>
  );
}
