/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./www/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        iosDark: '#0f1015',
        iosCard: '#1a1c24',
        iosCardHover: '#232632',
        iosBorder: '#2c303f',
        iosAccent: '#3b82f6',
        recoveryGreen: '#34c759',
        recoveryAmber: '#ff9f0a',
        recoveryRed: '#ff453a'
      }
    }
  }
};
