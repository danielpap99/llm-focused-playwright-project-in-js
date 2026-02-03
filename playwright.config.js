// @ts-check
import { defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',

  timeout: 30000,
  
  expect : {
    timeout: 5000
  },

  reporter: 'html',
  
  use: {
    trace: 'on',
  },
});

module.exports = config;

