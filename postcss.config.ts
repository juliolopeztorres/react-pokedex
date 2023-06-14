
let plugins = [
  'postcss-preset-env',
  'tailwindcss',
]

if (process.env.ENV === 'prod') {
  plugins.push('cssnano')
}

export default {
  plugins: plugins
}
