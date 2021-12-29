const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '355px',
                ...defaultTheme.screens,
            },
            colors: {
                bWhite: '#fff',
                bBgBlue: '#6daffe',
                bBlue: '#4096ff',
                bBlueDark: '#2b8aff',
            },
            // boxShadow: {
            //     def: defaultTheme.boxShadow.DEFAULT,
            // },
        },
    },
    plugins: [],
}
