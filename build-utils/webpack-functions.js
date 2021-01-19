const path = require("path");

const timestamp = Date.now();

// Try to keep this list in port order as it's easier to see conflicts.
const modulePorts = {
  'shell': 3000,
  'dashboard': 3001,
  'attendance': 3002,
};

const getModulePort = (moduleName) => {
  const modulePort = modulePorts[moduleName];
  if (modulePort) {
    return modulePort;
  }

  throw `Could not find port for module ${moduleName}. Please assign one in /webpack-utils/publicPaths.js`;
};

const getPublicPath = (moduleName, mode) => {
  if (mode === 'production') {
    return `/static/${moduleName}/`;
  }

  const modulePort = getModulePort(moduleName);
  if (modulePort) {
    return `http://localhost:${modulePort}/`;
  }

  throw `Could not find port for module ${moduleName}. Please assign one in /webpack-utils/publicPaths.js`;
};

const getRemoteUrl = (moduleName, mode) => {
  const publicPath = getPublicPath(moduleName, mode);
  return `${moduleName}@${publicPath}remoteEntry.js?v=${timestamp}`;
};

const getProductionDistPath = (moduleName) => {
  return path.resolve(__dirname, `../dist/static/${moduleName}`);
}

module.exports = {
  getModulePort,
  getPublicPath,
  getRemoteUrl,
  getProductionDistPath,
};

