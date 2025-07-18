import { heroui } from "@heroui/react"

module.exports = {
   content: [
      "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
      "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
      "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
   ],
   theme: { 
      extend: {} 
   },
   darkMode: "class",
   plugins: [heroui()],
};
