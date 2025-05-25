'use client';
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Mode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mode = document.cookie.split(';').find(c => c.trim().startsWith('mode='));
        const currentMode = mode ? mode.split('=')[1] : 'light';
        setIsDarkMode(currentMode === 'dark');
        
        if (currentMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleMode = () => {
        const newMode = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        document.cookie = `mode=${newMode};path=/`;
    };

    return (
        <button
            onClick={toggleMode}
            className="flex items-center justify-center size-10 text-primary dark:text-dark-primary cursor-pointer"
        >
            {isDarkMode ? (
                <Sun size={24} />
            ) : (
                <Moon size={24} />
            )}
        </button>
    )
}