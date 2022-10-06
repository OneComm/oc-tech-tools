import { lookup } from 'mxtoolbox-connect';

async function LookupDomain(domain) {
  const apiKey = process.env.REACT_APP_MXTB_API;

  const dns = await lookup(domain,"dns",apiKey);
  const mx = await lookup(domain,"mx", apiKey);

  const data = {dns, mx};
  return data;
}

export { LookupDomain }