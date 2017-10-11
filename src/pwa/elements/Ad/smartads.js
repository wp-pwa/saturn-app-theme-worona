let firstAd = true;

const create = args => {
  const sas = window && window.sas ? window.sas : {};

  const callParams = { ...args, async: true };
  const { tagId } = args;

  sas.cmd = sas.cmd || [];

  if (firstAd) {
    firstAd = false;
    sas.cmd.push(() => {
      sas.setup({ networkid: 2506, domain: '//www8.smartadserver.com', async: true });
    });
  }

  sas.cmd.push(() => {
    const containerExists = window.document.getElementById(tagId) !== null;
    if (containerExists) sas.call('iframe', callParams);
  });
};

export default { create };
