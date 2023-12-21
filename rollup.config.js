const typescript = require("@rollup/plugin-typescript");

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/server.ts",
  output: {
    file: "dist/main.js",
    format: "cjs"
  },
  plugins: [
    typescript({
      exclude: "./src/client/*",
      // include: "./src/client/build/*",
      compilerOptions: {
        module: "esnext"
      }
    })
  ]
};

module.exports = config;
