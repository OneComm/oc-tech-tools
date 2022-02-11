import LinkSpeed from 'link-speed';

async function SpeedTest () {
  return await LinkSpeed();
}

export { SpeedTest };