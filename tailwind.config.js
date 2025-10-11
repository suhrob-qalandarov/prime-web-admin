/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Barcha JS/JSX fayllarni skan qilish
    ],
    theme: {
        extend: {
            borderColor: {
                border: 'var(--border)', // --border o‘zgaruvchisiga mos rang
            },
            outlineColor: {
                ring: 'var(--ring)', // --ring o‘zgaruvchisiga mos rang
            },
            backgroundColor: {
                background: 'var(--background)', // --background o‘zgaruvchisi
            },
            textColor: {
                foreground: 'var(--foreground)', // --foreground o‘zgaruvchisi
            },
        },
    },
    plugins: [],
};