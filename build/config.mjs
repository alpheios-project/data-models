const webpack = {
  common: {
    externals: {
      'intl-messageformat': 'intl-messageformat'
    }
  },

  production: {
    entry: './driver.js',
    output: {filename: 'alpheios-data-models.min.js'}
  },
  development: {
    entry: './driver.js',
    output: {filename: 'alpheios-data-models.js'}
  }
}

export { webpack }
