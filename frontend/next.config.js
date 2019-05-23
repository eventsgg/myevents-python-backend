const withPlugins = require('next-compose-plugins')
const css = require('@zeit/next-css')
const typescript = require('@zeit/next-typescript')
const images = require('next-images')

module.exports = withPlugins([
    [css],
    [typescript],
    [images]
]);