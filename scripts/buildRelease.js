const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

// Setup
const ROOT = path.resolve("");
const INPUT_DIR = path.join(ROOT, "build");
const OUTPUT_DIR = path.join(ROOT, "artifacts");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const outputName = `release.zip`;
const outputFile = path.join(OUTPUT_DIR, outputName);
const archive = archiver("zip", { zlib: { level: 9 } });
const output = fs.createWriteStream(outputFile);

// Execute
console.log("Creating Archive");

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log("Completed");
});

output.on("end", function () {
  console.log("Data has been drained");
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn(err);
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on("error", function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.directory(INPUT_DIR, false);

archive.finalize();
