/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			scale: {
				200: '2'
			}
		},
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
			heading: ['Caveat', 'sans-serif']
		}
	},
	safelist: ['scale-100', 'scale-150', 'scale-200'],
	plugins: []
};
