cd ./lib/mgen-cmark-gfm
make
cd -
mkdir -p dist
emcc \
  -O3 -o dist/libcmark.js \
  ./lib/mgen-cmark-gfm/src/*.c ./lib/mgen-cmark-gfm/extensions/*.c \
  -I ./lib/mgen-cmark-gfm/build/src \
  -I ./lib/mgen-cmark-gfm/src \
  -I ./lib/mgen-cmark-gfm/build/extensions \
  -I ./lib/mgen-cmark-gfm/extensions \
  -s EXPORT_NAME='"cmarkGFM"' \
  -s EXPORTED_FUNCTIONS='["_cmark_gfm_markdown_to_html"]' \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["lengthBytesUTF8", "_malloc", "stringToUTF8", "UTF8ToString", "_free"]' \
  --memory-init-file 0 \
  --pre-js ./pre.js
