var app = {
  config: require('./config.json'),
  init: require('./core/init'),
  socket: require('./core/socket')
}

app.init(app)
