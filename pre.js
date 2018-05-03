var Module = {
  convert: function(md, opt) {
    if (typeof md !== 'string') {
      throw new Error('Argument "md" must be an string.');
    }

    var len = lengthBytesUTF8(md) + 1;
    var buffer = _malloc(len);
    stringToUTF8(md, buffer, len);

    var resBuffer = _cmark_gfm_markdown_to_html(buffer, len, opt);
    var resString = UTF8ToString(resBuffer);

    _free(buffer);
    _free(resBuffer);
    return resString;
  }
};

if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  window.CmarkGFM = Module;
}
