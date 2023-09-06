# Prefer using the `node:` protocol when importing Node.js builtin modules

This plugin is a minimalistic implemenation of [eslint-plugin-unicorn-prefer-node-protocol-rule](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md).

When importing builtin modules, it's better to use the [`node:` protocol](https://nodejs.org/api/esm.html#node-imports) as it makes it perfectly clear that the package is a Node.js builtin module.

Note that Node.js support for this feature began in:

> v16.0.0, v14.18.0 (`require()`)
>
> v14.13.1, v12.20.0 (`import`)

## Fail

```js
import dgram from "dgram";
```

```js
export { strict as default } from "assert";
```

```js
import fs from "fs/promises";
```

```js
const fs = require("fs/promises");
```

## Pass

```js
import dgram from "node:dgram";
```

```js
export { strict as default } from "node:assert";
```

```js
import fs from "node:fs/promises";
```

```js
const fs = require("fs");
```

```js
import _ from "lodash";
```

```js
import fs from "./fs.js";
```

```js
const fs = require("node:fs/promises");
```
