module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      'stroke': '#001858',
      'paragraph': '#172c66',
      'button-text': '#001858',
      'main': '#f3d2c1',
      'highlight': '#fef6e4',
      'secondary': '#8bd3dd',
      'tertiary': '#f582ae'
    },
    extend: {
      anmiation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}