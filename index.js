const css = require('css')
const plugin = require('tailwindcss/plugin')
const { getWPSafelist } = require('./utils')

/**
 * Object containing CSS variables as key-value pairs.
 *
 * @type {Object.<string, string>}
 */
const cssVariables = {}

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param {string} kebab - The kebab-case string to convert.
 * @returns {string} The camelCase version of the input string.
 */
function convertKebabToCamel(kebab) {
	if (!kebab.includes('-')) {
		return kebab
	}
	return kebab.replace(/-([a-z])/g, function (g) {
		return g[1].toUpperCase()
	})
}

module.exports = plugin.withOptions(
	({ globalStyles }) => {
		return function ({ addComponents, addBase, addUtilities }) {
			if (!globalStyles) {
				console.error('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨')
				console.error('No globalStyles passed to tailwind config')
				console.error('Please pass the globalStyles to the tailwind config')
				return
			}

			const ast = css.parse(globalStyles)

			const rules = ast?.stylesheet?.rules

			if (!rules) {
				console.error('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨')
				console.error('No rules found in globalStyles')
				return
			}

			for (let i = 0; i < rules.length; i++) {
				const rule = rules[i]

				// skip non rules
				if (!rule || !('selectors' in rule) || !('declarations' in rule)) {
					continue
				}

				const selectors = rule.selectors
				const declarations = rule.declarations

				if (!selectors || !declarations) {
					continue
				}

				const selectorLength = selectors.length
				const declarationsLength = declarations.length

				// skip empty rules
				if (selectorLength === 0 || declarationsLength === 0) {
					continue
				}

				// handle the first rule which is the body containing most of the css variables
				if (i === 0 && selectorLength === 1 && selectors[0] === 'body') {
					// store css variables in an object so we can use them to extend the colors
					// in the tailwind config

					const declarationsLength = declarations.length
					for (let z = 0; z < declarationsLength; z++) {
						const declaration = declarations[z]
						if (!declaration || !('property' in declaration) || !('value' in declaration)) {
							continue
						}
						const property = declaration.property
						const value = declaration.value

						if (!property || !value) {
							continue
						}

						if (property.startsWith('--')) {
							// cssVariables[property] = value.replace(' !important', '')
							cssVariables[property] = value
						}
					}
					continue
				}

				// handle all the .has- classes which should only contain one declaration
				// and one selector
				if (selectorLength === 1 && selectors[0].startsWith('.has') && declarationsLength === 1) {
					if (declarations[0].type !== 'declaration') {
						continue
					}
					const declaration = declarations[0]
					if (!declaration || !('property' in declaration) || !('value' in declaration)) {
						continue
					}
					const property = declaration.property
					// const value = declaration.value?.replace(' !important', '')
					const value = declaration.value

					if (!property || !value) {
						continue
					}
					// const cssVariable = value.match( /var\(\s{1}(.+)\s{1}\)/ );

					// if ( ! cssVariable || ! cssVariables[ cssVariable[ 1 ] ] ) {
					// 	continue;
					// }

					const propertyCamel = convertKebabToCamel(property)

					addComponents(
						{
							[selectors[0]]: { [propertyCamel]: value },
						},
						{
							respectImportant: true,
							respectPrefix: true,
						},
					)

					continue
				}

				// handle all the other selectors
				if (selectorLength > 0) {
					/**
					 * An object containing CSS styles as key-value pairs.
					 * @type {Object.<string, string>}
					 */
					const styles = {}
					// create the styles object from the declarations
					for (const declaration of declarations) {
						if (!declaration || !('property' in declaration) || !('value' in declaration)) {
							continue
						}
						const property = declaration.property
						// const value = declaration.value?.replace(' !important', '')
						const value = declaration.value

						if (!property || !value) {
							continue
						}

						if (property.startsWith('--')) {
							cssVariables[property] = value
							styles[property] = value
						} else {
							styles[convertKebabToCamel(property)] = value
						}
					}

					if (selectors.every((s) => s.match(/^(\.[a-z\-_]+)$/))) {
						for (const selector of selectors) {
							addComponents(
								{
									[selector]: styles,
								},
								{
									respectImportant: true,
									respectPrefix: true,
								},
							)
						}
					} else if (selectorLength > 1) {
						addBase({
							[selectors.join(', ')]: styles,
						})
					} else {
						addBase({
							[selectors[0]]: styles,
						})
					}
					continue
				}
			}

			// add the css variables to the root and body
			addBase({
				':root': cssVariables,
			})
			addBase({
				body: cssVariables,
			})
		}
	},
	({ globalStyles }) => {
		return {
			theme: {},
			safelist: getWPSafelist(globalStyles),
		}
	},
)

module.exports.getWPSafelist = getWPSafelist
