const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'config.json');
const exampleConfigPath = path.join(__dirname, 'config.example.json');
let config;
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath).toString('utf-8'));
} else if (fs.existsSync(exampleConfigPath)) {
  config = JSON.parse(fs.readFileSync(exampleConfigPath).toString('utf-8'));
} else {
  throw new Error('Configuration could not be found. Expected config.json or config.example.json at: ' + __dirname);
}

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: config.serverRuntimeConfig,
  publicRuntimeConfig: config.publicRuntimeConfig,
  async redirects() {
    return [
      {
        source: '/catalog.aspx',
        destination: '/catalog',
        permanent: true,
      },
      /*
      {
        source: '/catalog/:id/:name',
        destination: '/redirect-item?id=:id',
        permanent: false,
      },
       */
      {
        source: '/groups/:id/:name',
        destination: '/My/Groups.aspx?gid=:id',
        permanent: false,
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  },
}
