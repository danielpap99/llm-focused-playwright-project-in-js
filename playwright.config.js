const config = {
  testDir: "./tests",
  outputDir: "./test-results",

  timeout: 10000,

  expect: {
    timeout: 5000
  },

  reporter: "html",

  use: {
    trace: "on",
    screenshot: "only-on-failure"
  }
};

module.exports = config;
