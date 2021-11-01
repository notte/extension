module.exports = (env) => ({
    mode: env.production ? "production" : "development",
    entry: "./src/index.ts",
  
    output: {
      path: "/dist",
      filename: "./index.js"
    }
})