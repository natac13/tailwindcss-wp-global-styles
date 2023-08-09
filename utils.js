const css = require('css')

/**
 * Returns an array of selectors from a given CSS string.
 *
 * @param {string} globalStyles - The CSS string to parse.
 * @returns {string[]} - An array of selectors.
 */
function getWPSafelist(globalStyles) {
	/**
	 * @type {string[]}
	 */
	const safelistSelectors = []

	if (!globalStyles) {
		return []
	}

	const ast = css.parse(globalStyles)

	const rules = ast?.stylesheet?.rules

	if (!rules) {
		return []
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

		for (const selector of selectors) {
			safelistSelectors.push(selector)
		}
	}

	return safelistSelectors
}

module.exports = {
	getWPSafelist,
}
