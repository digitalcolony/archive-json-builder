const request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  moment = require("moment");

// parse argument
var url = process.argv[2];

if (url !== undefined && url.startsWith("https://archive.org/details/")) {
  var jsonFilename = url
    .replace("https://archive.org/details/", "")
    .concat(".json");

  console.log("Fetching...");
  // Load page hosting audio from archive.org
  request(url, function(error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);

      // Build array of show names
      var name = $('meta[itemprop="name"]')
        .map(function() {
          return $(this).attr("content");
        })
        .get();

      // Build array of show duration afer converting ugly (EX: PT0M458S) to HH:MM:SS format
      var duration = $('meta[itemprop="duration"]')
        .map(function() {
          var strDuration = $(this).attr("content");
          strDuration = strDuration.replace("PT0M", "").replace("S", "");

          return moment()
            .startOf("day")
            .seconds(strDuration)
            .format("H:mm:ss");
        })
        .get();

      // build array of MP3 links
      var mp3 = $('link[itemprop="associatedMedia"]')
        .map(function() {
          if (
            $(this)
              .attr("href")
              .endsWith(".mp3")
          ) {
            return $(this).attr("href");
          }
        })
        .get();

      // build array of OGG links
      var ogg = $('link[itemprop="associatedMedia"]')
        .map(function() {
          if (
            $(this)
              .attr("href")
              .endsWith(".ogg")
          ) {
            return $(this).attr("href");
          }
        })
        .get();

      // merge the 4 arrays into a single array then convert to JSON
      var jsonArr = [];
      for (var i = 0; i < name.length; i++) {
        jsonArr.push({
          name: name[i],
          duration: duration[i],
          mp3: mp3[i],
          ogg: ogg[i]
        });
      }
      var myJSON = JSON.stringify(jsonArr);

      // save JSON file to disk
      fs.writeFileSync(
        jsonFilename,
        JSON.stringify(jsonArr, null, "\t"),
        "utf8"
      );
      console.log("Saving JSON file.");
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
} else {
  console.log("A valid archive.org URL required as a parameter.");
  console.log(
    "Example: node app.js https://archive.org/details/neil-rogers-show-soundboard"
  );
}
