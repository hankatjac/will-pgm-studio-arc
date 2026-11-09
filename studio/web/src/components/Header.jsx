import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";

const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="relative z-10 flex h-[150px] items-center justify-between px-4 shadow-md transition-colors dark:bg-slate-800 relative  bg-[#bedd95] bg-[url('/src/assets/img/logos/bg_header.png')] bg-no-repeat bg-[50%_0%]">
      <div className="absolute w-[104px] h-[84px] left-[-106px] top-[3px] bg-[url('/src/assets/img/logos/bg_left-part.png')] bg-no-repeat"></div>
      <div
        className="text-xl font-bold no-underline absolute top-[28px] left-1/2 -ml-[71px] block h-auto w-[142px] pt-[72px] overflow-hidden text-center text-[21px] text-[#ea6b6e] font-['Gochi_Hand',_cursive] bg-[url('/src/assets/img/logos/logo.png')] bg-no-repeat"
        to="/"
      >
        Will-PGM Studio
      </div>
      <div className="flex items-center gap-x-3 pl-2">
        <button className="size-10" onClick={() => setCollapsed(!collapsed)}>
          <ChevronsLeft
            className={`${
              collapsed ? "rotate-180" : ""
            } text-slate-700 dark:text-slate-200`}
          />
        </button>
        {/* <div className="flex gap-x-3">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-100 bg-gray-300 text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-x-3">
        <span className="text-yellow-500">
          <Sun size={20} />
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
        <span className="text-gray-300 dark:text-white">
          <Moon size={20} />
        </span>
      </div>
    </header>
  );
};

export default Header;
