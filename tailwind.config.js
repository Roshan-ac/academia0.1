/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*..tsx",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
 
    // Or if using `src` directory:
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily:{
        rosh:["Patua One","cursive"],
        shibu:["Ubuntu", "sans-serif"]
      }
    },
  },
  plugins: [ require('flowbite/plugin')],
}