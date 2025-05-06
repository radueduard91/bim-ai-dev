// frontend/jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
    devtools: process.env.DEVTOOLS === 'true',
    args: ['--window-size=1920,1080']
  },
  server: {
    command: 'npm start',
    port: 3000,
    launchTimeout: 30000
  }
};