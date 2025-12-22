/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'f1-red': '#FF2800', // Ferrari Rosso Corsa
                'f1-black': '#15151E',
                'carbon': '#1F1F2B',
                'silver': '#E1E1E6',
                'ferrari-yellow': '#FFF200',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
