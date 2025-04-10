import { UpdateIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import Logo from "/logo-dark.png";

function Timer() {
  const [initialTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() - initialTime;
      setElapsedTime(time);
    }, 250);
    return () => clearInterval(interval);
  }, []);
  return (
    <p className="text-white font-bold text-2xl">
      {elapsedTime.toString().padStart(4, "0")}ms
    </p>
  );
}

export default function GlobalLoading() {
  const { state } = useNavigation();
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    const isDev = /hub\.dev|localhost/.test(window?.location?.href || "");
    setIsDev(isDev);
  }, []);

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
            <UpdateIcon className="inline animate-spin  w-1/3 h-auto z-[200] text-blue-400" />
            {isDev && <Timer />}
          </div>
        </div>
      )}
    </>
  );
}
