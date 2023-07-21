/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'arimo': ['Arimo', 'sans-serif'],
        },
        colors: {
          'primary': "#374458",
          "light": "#fff",
          "dark-primary": "#2C3646"
        },
        spacing: {
          'heading-1': "48px",
          'heading-2': "32px",
        }
      },
    },

    extends: {
      spacing: {
        
      }
    },
    plugins: [],
  }