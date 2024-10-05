const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

async function modifyText(text) {
  return text.toUpperCase().split("").reverse().join("");
}

async function main(filePath) {
  try {
    const data = await readFile(filePath, "utf8");
    const modified = await modifyText(data);
    console.log(modified);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`); // This writes to stderr
    process.exit(1);
  }
}

if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Please provide a file path.");
    process.exit(1);
  }
  main(filePath);
}
