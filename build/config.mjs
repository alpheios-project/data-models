const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'intl-messageformat': 'intl-messageformat'
    },
    target: "node"
  },

  production: {
    output: {filename: 'alpheios-data-models.min.js'}
  },
  development: {
    output: {filename: 'alpheios-data-models.js'}
  }
}

export { webpack }