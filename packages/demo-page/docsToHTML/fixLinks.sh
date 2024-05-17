#!/bin/sh
SCRIPT_DIR=$(dirname ${PWD}/$0)
DOCS_DIR="$SCRIPT_DIR/../public/docs"

if [ ! -d "$DOCS_DIR" ]; then
  echo "fixLinks, error: no docs/ directory ($DOCS_DIR)"
  return 1
fi

echo "fixing links in .html files in $DOCS_DIR"
for filename in "$DOCS_DIR/*.html"; do
  sed -i "s/.md/.html/g" $filename
done
