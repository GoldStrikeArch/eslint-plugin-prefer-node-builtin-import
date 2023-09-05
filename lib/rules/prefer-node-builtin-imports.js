"use strict";

const { builtinModules } = require("module");

const MESSAGE_ID = "prefer-node-builtin-imports";
const messages = {
  [MESSAGE_ID]: "Prefer `node:{{moduleName}}` over `{{moduleName}}`.",
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Prefer using the `node:` protocol when importing Node.js builtin modules.",
      recommended: true,
      category: "Best Practices",
      url: null,
    },
    fixable: "code",
    schema: [],
    messages,
  },
  create() {
    console.log("1");
    const startsWithNodePrefix = (value) =>
      builtinModules.includes(value) && value.startsWith("node:");

    const isStringLiteral = (node) =>
      node?.type === "Literal" && typeof node.value === "string";

    const isImportStatement = (node) =>
      (node.parent.type === "ImportDeclaration" ||
        node.parent.type === "ExportNamedDeclaration" ||
        node.parent.type === "ImportExpression") &&
      node.parent.source === node;

    const isStaticRequire = (node) =>
      node.parent.parent.type === "CallExpression" &&
      node.parent.type === "Identifier" &&
      node.parent.name === "require" &&
      node.parent.arguments[0] === node;

    return {
      Literal(node) {
        if (!isStringLiteral(node)) return;

        if (!(isImportStatement(node) || isStaticRequire(node))) return;

        const { value } = node;

        if (startsWithNodePrefix(value)) return;

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
