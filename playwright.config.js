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
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium"
      }
    },
    {
      name: "edge",
      use: {
        browserName: "chromium",
        channel: "msedge"
      }
    }
  ]
};

module.exports = config;
