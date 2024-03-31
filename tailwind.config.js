/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            height: {
                '128': '32rem',
            }
        }
    },
    plugins: [
        function ({addUtilities}) {
            addUtilities({
                '.scrollbar-none::-webkit-scrollbar': {
                    display: 'none'
                },
                'scrollbar-none': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none'
                }
            })
        }
    ]
}