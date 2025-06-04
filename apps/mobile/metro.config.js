// apps/mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver alias to ensure single React instance
config.resolver.alias = {
  ...config.resolver.alias,
  'react': require.resolve('react'),
  'react-native': require.resolve('react-native'),
};

module.exports = config;