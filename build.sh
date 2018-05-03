cd ./lib/mgen-cmark-gfm
make
cd -
emcc -O3 -o libcmark.js ./lib/mgen-cmark-gfm/src/*.c ./lib/mgen-cmark-gfm/extensions/*.c -I ./lib/mgen-cmark-gfm/build/src -I ./lib/mgen-cmark-gfm/src -I ./lib/mgen-cmark-gfm/build/extensions -I ./lib/mgen-cmark-gfm/extensions -s EXPORTED_FUNCTIONS='["_cmark_gfm_markdown_to_html"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
