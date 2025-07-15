import React from "react";
import { useTheme } from "@/components/theme-provider";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function ThemeChange() {
    const { theme, setTheme } = useTheme();
    const themes = ["light", "dark"];

    const handleThemeChange = () => {
        const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(newTheme);
    };

    const iconVariants = {
        initial: {
            rotateY: 90,
            scale: 0.5,
            opacity: 0,
        },
        animate: {
            rotateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Ease-out-back style
            },
        },
        exit: {
            rotateY: -90,
            scale: 0.5,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.55, 0.085, 0.68, 0.53], // ease-in
            },
        },
    };

    return (
        <span className="bg-popover text-popover-foreground w-fit rounded-full flex justify-center items-center m-2 p-2 cursor-pointer transition-colors duration-500">
            <button className="cursor-pointer relative w-[30px] h-[30px]" onClick={handleThemeChange}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={theme}
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                    >
                        {theme === "dark" ? <FaMoon size={22} /> : <MdSunny size={22} />}
                    </motion.span>
                </AnimatePresence>
            </button>
        </span>
    );
}

export default ThemeChange;
