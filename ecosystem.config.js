module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    instances : "max",
    exec_mode : "cluster"
  }]
};
