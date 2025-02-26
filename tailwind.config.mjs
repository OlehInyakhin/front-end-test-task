/** @type {import('tailwindcss').Config} */

export default {
	darkMode: 'class',
	content: ["./src/**/*.{ts,js,tsx,jsx}", "./node_modules/preline/*.js"],
	plugins: [require('@tailwindcss/forms'), require("preline/plugin")],
};
