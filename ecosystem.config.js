module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.',
    instances : "2",
    exec_mode : "cluster"
  },
  {
    name: "consumers",
    script: "./consumers/index.js",
    instance: "1"
  }
]
};
