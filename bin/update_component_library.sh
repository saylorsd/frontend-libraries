#!/usr/bin/env bash

# This will replace and initialize the config files in each of the @wprdc-viz vizes.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
BASE_DIR=$SCRIPT_DIR/../packages

TEMPLATE_DIR=$SCRIPT_DIR/../templates/viz

for DIR in "$BASE_DIR"/@wprdc-components/*; do
  DIR=${DIR%*/}
  cd "$DIR" || exit

    NAME="$(basename "$DIR")"
  echo "export * from '@wprdc-components/$NAME';"

done
