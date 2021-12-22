import * as child_process from "child_process";

child_process.execSync("npx patch-package", { stdio: "inherit" });
