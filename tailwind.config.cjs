/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./server/views/*.{html,js,css,ejs}", 
  "./server/views/partials/*.{html,js,css,ejs}",
  "./server/views/user/*.{html,js,css,ejs}",
  "./server/views/auth/*.{html,js,css,ejs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
