module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", 
        secondary: "#9333EA",
        background: "#F3F4F6",
        foreground: "#1F2937",
      },
      margin: {
        '5': '1.25rem',
        '10': '2.5rem',
        '15': '3.75rem',
      },
      padding: {
        '5': '1.25rem',
        '10': '2.5rem',
        '15': '3.75rem',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      lineHeight: {
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
    },
  },
  plugins: [],
};