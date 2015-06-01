module.exports = function (e) {
  var target = e.target.target;
  if (target === '_system' && window.navigator.app && window.navigator.app.loadUrl) {
    e.preventDefault();
    window.navigator.app.loadUrl(e.target.href, {
      openExternal: true
    });
  }
};
