new webpack.DefinePlugin({
  'process.env':{
    'HEROKU_SLUG_COMMIT': JSON.stringify(process.env.HEROKU_SLUG_COMMIT),
    'HEROKU_RELEASE_CREATED_AT': JSON.stringify(process.env.HEROKU_RELEASE_CREATED_AT)
  }
})