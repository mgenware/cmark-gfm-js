command -v emcc >/dev/null 2>&1 || { echo >&2 "Build failed. emcc not found. You may need to install Emscripten SDK at http://kripken.github.io/emscripten-site/"; exit 1; }

command -v cmake >/dev/null 2>&1 || { echo >&2 "Build failed. cmake not found. You may need to install cmake at https://cmake.org/download/"; exit 1; }

cd ./lib/mgen-cmark-gfm
make || { echo >&2 "make failed."; exit 1; }
cd -
mkdir -p dist
emcc \
  -O3 -o dist/cmark-gfm.js \
  ./lib/mgen-cmark-gfm/src/*.c ./lib/mgen-cmark-gfm/extensions/*.c \
  -I ./lib/mgen-cmark-gfm/build/src \
  -I ./lib/mgen-cmark-gfm/src \
  -I ./lib/mgen-cmark-gfm/build/extensions \
  -I ./lib/mgen-cmark-gfm/extensions \
  -s EXPORT_NAME='"cmarkGFM"' \
  -s EXPORTED_FUNCTIONS='["_cmark_gfm_markdown_to_html"]' \
  -s EXTRA_EXPORTED_RUNTIME_METHODS='["lengthBytesUTF8", "_malloc", "stringToUTF8", "UTF8ToString", "_free"]' \
  --memory-init-file 0 \
  --pre-js ./lib/pre.js
