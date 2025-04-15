import { useNavigation } from "@remix-run/react";
import Logo from "/logo-star-wars.png";
import { Rocket } from "lucide-react";

export default function GlobalLoading() {
  const { state } = useNavigation();

  return (
    <>
      {state === "loading" && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-indigo-600 opacity-20 z-[150]" />
          <div className="max-w-[100px] space-y-5 flex flex-col items-center z-[200]">
            <img
              className="w-full"
              src={Logo}
              alt="loading logo"
              draggable={false}
            />
            <Rocket className="inline animate-spin w-1/2 h-auto z-[200] text-cyan-400" />
          </div>
        </div>
      )}
    </>
  );
}
