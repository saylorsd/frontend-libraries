#!/usr/bin/env bash

# This will replace and initialize the config files in each of the @wprdc-components components.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

COMPONENT_DIR=$SCRIPT_DIR/../packages/@wprdc-components
TYPES_DIR=$SCRIPT_DIR/../packages/@wprdc-types

TEMPLATE_DIR=$SCRIPT_DIR/../templates/types

for DIR in "$COMPONENT_DIR"/*; do
  DIR=${DIR%*/}
  cd "$DIR" || exit

  # to fix directories in PascalCase
  # NAME="$(tr '[:upper:]' '[:lower:]' <<< ${"$(basename "$DIR")":0:1})${"$(basename "$DIR")":1}"
  NAME="$(basename "$DIR")"
  echo $NAME

  CUR_TYPE_DIR="$TYPES_DIR/$NAME"

  mkdir -p "$CUR_TYPE_DIR/src"

  cp "./src/types.ts" "$CUR_TYPE_DIR/src/index.ts"

  cp "$TEMPLATE_DIR/.gitignore" "$CUR_TYPE_DIR"
  cp "$TEMPLATE_DIR/LICENSE" "$CUR_TYPE_DIR"
  cp -n "$TEMPLATE_DIR/package.json" "$CUR_TYPE_DIR"
  cp "$TEMPLATE_DIR/README.md" "$CUR_TYPE_DIR"
  cp "$TEMPLATE_DIR/tsconfig.json" "$CUR_TYPE_DIR"
  cp "$TEMPLATE_DIR/tslint.json" "$CUR_TYPE_DIR"

  sed -i '' "s/--name--/$NAME/g" "$CUR_TYPE_DIR/package.json"
  sed -i '' "s/--name--/$NAME/g" "$CUR_TYPE_DIR/README.md"

done
