#!/usr/bin/env bash

# This will replace and initialize the config files in each of the @wprdc-components components.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
BASE_DIR=$SCRIPT_DIR/../packages/@wprdc-components

TEMPLATE_DIR=$SCRIPT_DIR/../templates/components

for DIR in "$BASE_DIR"/*; do
  DIR=${DIR%*/}
  cd "$DIR" || exit

  # to fix directories in PascalCase
  # NAME="$(tr '[:upper:]' '[:lower:]' <<< ${"$(basename "$DIR")":0:1})${"$(basename "$DIR")":1}"
  NAME="$(basename "$DIR")"

  echo $NAME
#  cp "$TEMPLATE_DIR/src/main.css" ./src/main.css
#  cp "$TEMPLATE_DIR/src/typings.d.ts" ./src/typings.d.ts
#  cp "$TEMPLATE_DIR/.gitignore" .
#  cp "$TEMPLATE_DIR/LICENSE" .
#  cp -n "$TEMPLATE_DIR/package.json" .
#  cp "$TEMPLATE_DIR/postcss.config.js" .
#  cp "$TEMPLATE_DIR/README.md" .
#  cp "$TEMPLATE_DIR/rollup.config.js" .
  cp "$TEMPLATE_DIR/tailwind.config.js" .
#  cp "$TEMPLATE_DIR/tsconfig.json" .
#  cp "$TEMPLATE_DIR/tslint.json" .

  sed -i '' "s/--name--/$NAME/g" "$DIR/package.json"
  sed -i '' "s/--name--/$NAME/g" "$DIR/README.md"

done
