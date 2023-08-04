# 🎨 TailwindCSS WP Global Styles Plugin

This plugin takes the CSS contents of the global stylesheet from WordPress and adds it to the TailwindCSS build process.

You will have access to all the utility classes from the WordPress Global Stylesheet in your TailwindCSS build. As well as the css variables.

## 🚀 Installation

```bash
npm install tailwindcss-wp-global-styles
```

## 📦 Usage

Add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
	plugins: [
		require('tailwindcss-wp-global-styles')({
			globalStyes: fs.readFileSync('./path/to/wp/global.css', 'utf8'),
		}),
	],
}
```

## ⛭ Options

The `globalStyles` option is required. It should be the contents of the WordPress global stylesheet.

## 🪪 License

MIT

**Made by [natac13](https://github.com/natac13)**
