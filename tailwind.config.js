module.exports = {
  content: [
    './index.html',
    './services.html',
    './projects.html',
    './about.html',
    './blog/**/*.html',
    './contact.html',
    './src/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#183153',
        teal: '#2ec4b6',
        lightbg: '#f5f5f5',
        brandwhite: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
