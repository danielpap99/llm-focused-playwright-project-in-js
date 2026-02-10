const config = {
  testDir: "./tests",
  outputDir: "./test-results",

  timeout: 10000,

  expect: {
    timeout: 5000
  },

  reporter: "html",

  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  }
};

module.exports = config;
