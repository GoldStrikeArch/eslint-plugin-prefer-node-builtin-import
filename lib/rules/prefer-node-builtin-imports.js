"use strict";

const { builtinModules } = require("module");

const MESSAGE_ID = "prefer-node-builtin-imports";
const messages = {
  [MESSAGE_ID]: "Prefer `node:{{moduleName}}` over `{{moduleName}}`.",
};

function replaceStringLiteral(
  fixer,
  node,
  text,
  relativeRangeStart,
  relativeRangeEnd
) {
  const firstCharacterIndex = node.range[0] + 1;
  const start = Number.isInteger(relativeRangeEnd)
    ? relativeRangeStart + firstCharacterIndex
    : firstCharacterIndex;
  const end = Number.isInteger(relativeRangeEnd)
    ? relativeRangeEnd + firstCharacterIndex
    : node.range[1] - 1;

  return fixer.replaceTextRange([start, end], text);
}

const isStringLiteral = (node) =>
  node?.type === "Literal" && typeof node.value === "string";

const isImportStatement = (node) =>
  (node.parent.type === "ImportDeclaration" ||
    node.parent.type === "ExportNamedDeclaration" ||
    node.parent.type === "ImportExpression") &&
  node.parent.source === node;

const isStaticRequire = (node) =>
  node.parent.type === "CallExpression" &&
  !node.parent.optional &&
  node.parent.callee.type === "Identifier" &&
  node.parent.callee.name === "require" &&
  node.parent.arguments[0] === node &&
  // check for only 1 argument
  !node.parent.arguments[1];

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Prefer using the `node:` protocol when importing Node.js builtin modules.",
      recommended: true,
      category: "Best Practices",
      url:
        "https://github.com/GoldStrikeArch/eslint-plugin-prefer-node-builtin-import/blob/main/docs/rules/prefer-node-builtin-imports.md",
    },
    fixable: "code",
    schema: [],
    messages,
  },
  create() {
    return {
      Literal(node) {
        if (!isStringLiteral(node)) return;

        if (!(isImportStatement(node) || isStaticRequire(node))) return;

        const { value } = node;

        if (!builtinModules.includes(value)) return;

        if (value.startsWith("node:")) return;

        return {
          node,
          messageId: MESSAGE_ID,
          data: { moduleName: value },
          /** @param {import('eslint').Rule.RuleFixer} fixer */
          fix: (fixer) => replaceStringLiteral(fixer, node, "node:", 0, 0),
        };
      },
    };
  },
};
