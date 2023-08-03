const fs = require('fs')
const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {},
	plugins: [
		require('tailwindcss-wp-faust')({
			globalStyles: fs.readFileSync(path.resolve(__dirname, './globalStylesheet.css'), 'utf8'),
		}),
	],
}
