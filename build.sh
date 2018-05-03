cd ./lib/mgen-cmark-gfm
make
cd -
mkdir -p dist
emcc -O3 -o dist/libcmark.js ./lib/mgen-cmark-gfm/src/*.c ./lib/mgen-cmark-gfm/extensions/*.c -I ./lib/mgen-cmark-gfm/build/src -I ./lib/mgen-cmark-gfm/src -I ./lib/mgen-cmark-gfm/build/extensions -I ./lib/mgen-cmark-gfm/extensions -s EXPORTED_FUNCTIONS='["_cmark_gfm_markdown_to_html"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s EXPORT_NAME="'cmarkGFM'" --memory-init-file 0
