import { UpdateIcon } from "@radix-ui/react-icons";
import Logo from "/logo-star-wars.png";

export default function LoadingData() {
  return (
    <>
      <div className="absolute inset-0 z-[100] flex items-center justify-center">
        <div className="absolute inset-0 z-[150]" />
        <div className="max-w-[100px] space-y-5 flex flex-col items-center z-[200]">
          <img
            className="w-full"
            src={Logo}
            alt="loading logo"
            draggable={false}
          />
          <UpdateIcon className="inline animate-spin  w-1/2 h-auto z-[200] text-blue-400" />
        </div>
      </div>
    </>
  );
}
