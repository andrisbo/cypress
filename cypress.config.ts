import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: '',
    },
  env:{
    username: '',
    password: ''
  }
  },
);



