/**
 * @fileoverview ESlint plugin to change imports of builtin node modules to &#39;node:MODULE_NAME&#39;
 * @author Mikhail Pertsev
 */
"use strict";

const rule = require("./rules/prefer-node-builtin-imports");

module.exports.rules = {
  "prefer-node-builtin-imports": rule,
};
