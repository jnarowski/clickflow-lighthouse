// https: //github.com/GoogleChrome/lighthouse/blob/master/docs/understanding-results.md#config-settings
// https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch(flags).then(chrome => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results));
  });
}

const flags = {
  chromeFlags: ['--headless']
};

launchChromeAndRunLighthouse('https://github.com', flags).then(results => {
  // Use results!
  console.log('RESULTS', results.lhr)
});