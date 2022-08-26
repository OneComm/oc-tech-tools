import { FastSpeedtest } from 'fast-speedtest-api';

async function SpeedTest () {
  const speedtest = new FastSpeedtest({
    token: "your-app-token", // required
    verbose: false, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
  });

  speedtest.getSpeed().then(result => {
    return {
      ping: result.ping,
      dls: result.downloadSpeed,
      uls: result.uploadSpeed
    };
  }).catch(e => {
      console.error(e.message);
  });
}

export { SpeedTest };