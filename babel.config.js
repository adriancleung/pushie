module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@app/components': './src/components',
          '@app/navigation': './src/navigation',
          '@app/services': './src/services',
          '@app/util': './src/util',
          '@app/views': './src/views',
          '@app/constants': './src/constants.js',
        },
      },
    ],
    ['module:react-native-dotenv'],
  ],
};
