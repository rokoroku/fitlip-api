module.exports = function (wallaby) {
  const env = [
    `NODE_PATH=${wallaby.projectCacheDir}`
  ];

  return {
    env: {
      type: 'node',
      params: {
        env: env.join(';')
      }
    },
    debug: true,
    files: [
      'src/**/*.ts',
      'data/**/*.csv',
    ],
    tests: [
      'test/**/*.spec.ts'
    ],
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript()
    },
    delays: {
      run: 500
    }
  }
};
