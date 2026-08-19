import next from "eslint-config-next";

/** Next 16 flat config. `eslint-config-next` exports a flat config array
 *  directly (no FlatCompat needed). We append the design-system guardrail. */
const eslintConfig = [
  ...next,
  {
    rules: {
      // Guardrail: keep everyone on the design tokens, no escape-hatch hex.
      // See docs/02-DESIGN-SYSTEM-WEB.md / AGENTS.md §2.
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "Literal[value=/^(bg|text|border)-\\[#([0-9a-fA-F]{3,8})\\]$/]",
          message:
            "Use a palette token (bg-lime, text-black, …), not an arbitrary hex. See AGENTS.md §2.",
        },
      ],
    },
  },
  { ignores: [".next/**", "node_modules/**", "out/**"] },
];

export default eslintConfig;
