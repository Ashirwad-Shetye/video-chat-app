import { useState, useEffect, useRef } from "react";
import { getCurrentDay, getCurrentTime } from "../../utils/helper";
import { Icons } from "../ui/icon/Icon";

function Nav() {
  const [currentTime, setCurrentTime] = useState<string>();
  const currentDay = useRef<string>(getCurrentDay());

  useEffect(() => {
    const intervalTimeUpdate = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(intervalTimeUpdate);
    };
  }, []);
  return (
    <div className="w-full h-16 px-5 flex justify-between items-center">
      <div className="flex">
        <img
          src="/logo/logo-1.png"
          alt="Google Meet logo"
          className="w-8 mr-2"
        />
        <img src="/logo/logo-3.png" alt="Google Meet" className="mt-1 w-32" />
      </div>
      <div className="text-gray-600 flex gap-4">
        <div className="flex text-lg gap-1 items-center">
          <h2>{currentTime}</h2>
          <h2 className="text-4xl font-serif mb-1">·</h2>
          <h2>{currentDay.current}</h2>
        </div>
        <div className="flex items-center gap-6 text-2xl">
          <div className="flex gap-3">
            <button>
              <Icons.Support />
            </button>
            <button className="">
              <Icons.Report />
            </button>
            <button>
              <Icons.Settings />
            </button>
          </div>
          <div className="flex gap-3">
            <button>
              <Icons.Apps />
            </button>
            <button>
              <Icons.User />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
