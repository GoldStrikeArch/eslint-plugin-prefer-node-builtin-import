# eslint-plugin-prefer-node-builtin-imports

ESlint plugin to change imports of builtin node modules to &#39;node:MODULE_NAME&#39;

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-prefer-node-builtin-imports`:

```sh
npm install eslint-plugin-prefer-node-builtin-imports --save-dev
```

## Usage

Add `prefer-node-builtin-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "prefer-node-builtin-imports"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "prefer-node-builtin-imports/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


