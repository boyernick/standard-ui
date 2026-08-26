import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // The Lifeline internals are built on the latest-ref pattern: refs assigned
  // during render to keep callbacks fresh across scroll frames. The React
  // Compiler rules that ship with eslint-plugin-react-hooks v7 reject that
  // idiom wholesale, and the code predates them. Scoped off here so the rest
  // of the tree keeps a clean baseline and new violations stay visible.
  // Revisit when these files move to useEffectEvent.
  {
    files: ["packages/react/src/lifeline/**"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);

export default eslintConfig;
