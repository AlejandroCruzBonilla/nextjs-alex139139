import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

module.exports = {
	mode: "jit",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			"xs": "480px",
			...defaultTheme.screens,
			"2xl": "1440px",
		},

		extend: {
			colors: {
				primary: {
					light: colors.green[300],
					DEFAULT: colors.green[400],
					dark: colors.green[500],
				},

				secondary: {
					light: colors.emerald[400],
					DEFAULT: colors.emerald[500],
					dark: colors.emerald[600],
				},

				font: {
					light: colors.stone[200],
					dark: colors.stone[800],
				},

				backgroundBase: {
					light: colors.zinc[200],
					dark: colors.zinc[950],
				},

				background: {
					light: colors.zinc[50],
					dark: colors.zinc[700],
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
}
