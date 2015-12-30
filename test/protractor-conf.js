exports.config = {
  specs: [
    'e2e/*.js'
  ],
  baseUrl: 'http://localhost:5000/',
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
