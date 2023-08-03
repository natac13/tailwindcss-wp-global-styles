declare function plugin(options?: { globalStyles: string }): {
	handler: () => void
}

declare namespace plugin {
	const __isOptionsFunction: boolean
}

export = plugin
