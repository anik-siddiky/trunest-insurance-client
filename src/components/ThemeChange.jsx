import React from "react";
import { useTheme } from "@/components/theme-provider";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

function ThemeChange() {
    const { theme, setTheme } = useTheme();
    const themes = ["light", "dark"];

    const handleThemeChange = () => {
        const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(newTheme);
    };
    return (
        <span className="bg-popover text-popover-foreground w-fit rounded-full flex justify-center items-center m-2 p-2 cursor-pointer">
            <button className="cursor-pointer" onClick={handleThemeChange}>
                {theme === "dark" ? <FaMoon size={25} /> : <MdSunny size={25} />}
            </button>
        </span>
    );
}

export default ThemeChange;