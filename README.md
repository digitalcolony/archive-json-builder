# JSON builder for Archive.org

This tool scrapes a URL on Archive.org and then builds a JSON file with all the audio file details.

## Setup

Find a URL on Archive.org that hosts audio files.

EXAMPLE: [https://archive.org/details/neil-rogers-show-soundboard](https://archive.org/details/neil-rogers-show-soundboard)

Add that URL into the the app.js as the url variable. Then run app.js to generate a JSON file that includes filename, duration, mp3 link, and ogg link for each file.

```javascript
$ node app.js
```
