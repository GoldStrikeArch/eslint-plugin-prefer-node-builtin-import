/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Prefer using the `node:` protocol when importing Node.js builtin modules.",
      recommended: true,
      category: "Best Practices",
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // Utility function that accepts a VariableDeclaration node and
    // returns true if it contains any VariableDeclarators (node.declarations)
    // that have an Identifier (declarator.id) with a name
    // starting with an underscore
    const startsWithUnderscore = (node) =>
      node.declarations.some((declarator) =>
        declarator.id.name.startsWith("_")
      );
    return {
      // Visit any VariableDeclaration node and report an error
      // if we determine the node is in violation
      VariableDeclaration: (node) => {
        if (startsWithUnderscore(node)) {
          // report() is the main function from the context and
          // is used for specifying errors found in code
          context.report({
            node,
            message: "Variable names cannot begin with an underscore.",
          });
        }
      },
    };
  },
};
