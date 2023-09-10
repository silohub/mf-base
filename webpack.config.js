// eslint-disable-next-line @typescript-eslint/no-var-requires
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mf = require('@angular-architects/module-federation/webpack')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const share = mf.share

const sharedMappings = new mf.SharedMappings()
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped paths to share */
])

module.exports = {
  output: {
    publicPath: 'http://localhost:4200/', //->url donde se aloja el microfront
    uniqueName: 'mfBase', //-> nombre del proyecto
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfBase', //-> nombre del proyecto
      filename: 'baseRemoteEntry.js',
      exposes: {
        'HomeModule': './src/app/pages/home/home.module.ts'
      },
      library: { type: 'module' },
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        },
        rxjs: {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          includeSecondaries: true
        },
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ]
}
