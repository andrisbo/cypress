import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://intranet.ctco.lv',
    },
  env:{
    username: 'andris.boriss',
    password: ''
  }
  },
);



