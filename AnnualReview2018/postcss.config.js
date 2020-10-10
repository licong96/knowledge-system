module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['> 2%', 'iOS >= 8']
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      viewportHeight: 667, // not now used; TODO: need for different units and math for different properties
      unitPrecision: 3,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',  // vmin is more suitable.
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    },
    // 'postcss-plugin-px2rem' : {
    //   rootValue: 375,
    //   unitPrecision: 3,
    //   propWhiteList: [],
    //   propBlackList: [],
    //   exclude:false,
    //   selectorBlackList: [],
    //   ignoreIdentifier: false,
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0
    // }
  }
}