const config = {
  testDir: "./tests",
  outputDir: "./test-results",

  timeout: 30000,

  expect: {
    timeout: 10000
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
