const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");

const OUT_DIR = path.resolve("./out");

async function removeUnderscores() {
  const nextSrc = path.join(OUT_DIR, "_next");
  const nextDst = path.join(OUT_DIR, "assets");

  const changedFiles = await replace({
    files: "./out/**/*",
    from: /_next/g,
    to: "assets",
  });
  console.log(`Updated ${changedFiles.length} files`);

  if (fs.existsSync(nextSrc)) {
    fs.renameSync(nextSrc, nextDst);
    console.log("Renamed _next folder");
  }
}

removeUnderscores().then(() => {
  console.log("Completed");
});
