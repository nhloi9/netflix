/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	// corePlugins: {
	// 	preflight: false,
	// },
	theme: {
		extend: {
			height: {
				header: '560px',
				rate: '400px',
			},
			fontSize: {
				h1: '2.6rem',
			},
			screens: {
				xs: '475px',
			},
			colors: {
				main: '#080A1A',
				subMain: '#F20000',
				dry: '#0B0F29',
				star: '#FFB000',
				text: '#C0C0C0',
				border: '#4B5563',
				dryGray: '#E0D5D5',
			},
		},
	},
	plugins: [],
};
