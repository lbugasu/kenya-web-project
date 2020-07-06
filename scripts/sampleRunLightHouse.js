const lh = require("./launchChromeAndRunLighthouse");
const fs = require("fs");
const configJson = JSON.parse(fs.readFileSync("scripts/config.json"));

var data = [];
try {
  data = JSON.parse(fs.readFileSync("data/websiteData.json", "utf8"));
} catch (e) {
  console.log("Error", e.stack);
}

data.splice(0, 5).forEach((thisOne) => {
  var address = "https://www." + thisOne.site;

  lh.launchChromeAndRunLighthouse(address, configJson)
    .then((results) => {
      const parsedResults = JSON.parse(results);

      let performance = parsedResults.categories.performance.score * 100;
      let sizeString = parsedResults["audits"]["total-byte-weight"][
        "displayValue"
      ].split(" ");
      let size = sizeString[sizeString.length - 1];
      thisOne["performance"] = performance;
      thisOne["size on home page load"] = size;
      fs.appendFile(
        "data/sampleOutput.json",
        JSON.stringify(thisOne),
        "utf8",
        function (err) {
          if (err) throw err;
        }
      );
      fs.appendFile("out.json", ",", "utf8", function (err) {
        if (err) throw err;
      });
    })
    .catch((err) => console.log(err));
});