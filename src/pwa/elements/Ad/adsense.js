let firstAd = true;

const create = args => {
  const googletag = window && window.googletag ? window.googletag : {};
  googletag.cmd = googletag.cmd || [];
  window.googletag = googletag;

  if (firstAd) {
    firstAd = false;

    const script = window.document.createElement('script');
    script.src = '//www.googletagservices.com/tag/js/gpt.js';
    script.async = true;
    window.document.body.append(script);
    googletag.cmd.push(() => {
      googletag.pubads().setCentering(true);
      googletag.pubads().enableAsyncRendering();
      googletag.enableServices();
    });
  }

  const { adUnitPath, width, height, tagId, opt_clickUrl } = args;
  let slot;

  googletag.cmd.push(() => {
    slot = googletag.pubads().display(adUnitPath, [width, height], tagId, opt_clickUrl);
  });

  return () => googletag.cmd.push(() => {
    console.log('DESTROYED');
    googletag.destroySlots([slot]);
  });
};

export default { create };
