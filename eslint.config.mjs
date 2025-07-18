import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
});

const eslintConfig = [
   ...compat.extends("next/core-web-vitals", "next/typescript"),
   {
      files: ["**/*.ts", "**/*.js", "**/*.tsx", "**/*.jsx"],
      rules: {
         indent: ["error", 3],
         "react/jsx-wrap-multilines": [
            "error",
            {
               return: "parens-new-line",
               declaration: "parens-new-line",
               assignment: "parens-new-line",
               arrow: "parens-new-line",
               condition: "ignore",
               logical: "ignore",
               prop: "ignore",
            },
         ],
      },
   },
];

export default eslintConfig;
