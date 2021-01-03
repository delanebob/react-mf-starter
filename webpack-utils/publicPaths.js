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
  if (mode !== 'development') {
    return `http://example.com/${moduleName}`;
  }

  const modulePort = getModulePort(moduleName);
  if (modulePort) {
    return `http://localhost:${modulePort}/`;
  }

  throw `Could not find port for module ${moduleName}. Please assign one in /webpack-utils/publicPaths.js`;
};

const getRemoteUrl = (moduleName) => {
  const modulePort = getModulePort(moduleName);
  return `${moduleName}@http://localhost:${modulePort}/remoteEntry.js`;
};

module.exports = {
  getModulePort,
  getPublicPath,
  getRemoteUrl,
};

