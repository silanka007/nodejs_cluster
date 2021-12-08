module.exports = {
  apps : [{
    script: 'queue-server.js',
    watch: './queue-server.js',
    instances: "1",
    exec_mode: "cluster"
  }, {
    name: "redis-subscriber",
    script: './subscribers.js',
    watch: "./subscribers.js",
    instances: "1"
  }],
};
