const { execSync } = require("child_process");
const num = process.env.npm_config_num;
if (!num) {
  process.exit(1);
}
const file = `src/C/Bai${num}.ts`;
console.log(` Running: ${file}`);
execSync(`npx ts-node ${file}`, { stdio: "inherit" });
