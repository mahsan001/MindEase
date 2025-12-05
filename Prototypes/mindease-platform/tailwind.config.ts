import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F5E6D3",
                foreground: "#2C3E50",
                primary: {
                    DEFAULT: "#4A9B9B",
                    hover: "#3D8282",
                },
                secondary: "#2C3E50",
                light: "#ECF0F1",
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-poppins)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
