const fs = require('fs')
const path = require('path')
const plugin = require('tailwindcss-wp-global-styles')
const fn = require('tailwindcss-wp-global-styles/utils').getWPSafelist

const globalStyles = fs.readFileSync(path.resolve(__dirname, './globalStylesheet.css'), 'utf8')
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {},
	plugins: [
		plugin({
			globalStyles,
		}),
	],
	safelist: ['flex-wrap-reverse', 'gap-0', 'list-disc', 'list-inside', ...fn(globalStyles)],
}
