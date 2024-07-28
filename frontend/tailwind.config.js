/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        logofont: ["Sevillana", "cursive"]
      },
      backgroundImage: {
        'Profile': "url('/src/images/Profile.jpg')",
        'Signup': "url('/src/images/Signup.jpg')",
      },
    },
  },
}