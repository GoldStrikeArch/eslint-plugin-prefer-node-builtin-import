/**
 * @fileoverview ESlint plugin to change imports of builtin node modules to &#39;node:MODULE_NAME&#39;
 * @author Mikhail Pertsev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");
