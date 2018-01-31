# JSON builder for Archive.org

This tool scrapes a URL on Archive.org and then builds a JSON file with all the audio file details.

## Setup

Find a URL on Archive.org that hosts audio files.

EXAMPLE: [https://archive.org/details/neil-rogers-show-soundboard](https://archive.org/details/neil-rogers-show-soundboard)

Pass that URL as a parameter to app.js. The code will scrape `Archive.org` and generate a JSON file that includes filename, duration, mp3 link, and ogg link for each file.

```javascript
node app.js https://archive.org/details/neil-rogers-show-soundboard
```

The result will look like this:

```json
{
  "files": [
    {
      "name": "1 to 12 hour - Boca Britany Somers",
      "duration": "0:00:03",
      "mp3":
        "https://archive.org/download/neil-rogers-show-soundboard/1-to-12-hour.mp3",
      "ogg":
        "https://archive.org/download/neil-rogers-show-soundboard/1-to-12-hour.ogg"
    },
    {
      "name": "A Stench of Cow Manure... - Jim Mandich",
      "duration": "0:00:08",
      "mp3":
        "https://archive.org/download/neil-rogers-show-soundboard/A-Stench-of-Cow-Manure.mp3",
      "ogg":
        "https://archive.org/download/neil-rogers-show-soundboard/A-Stench-of-Cow-Manure.ogg"
    },
    {
      "name": "Absolutely Correct Sir - Neil Rogers/Old Bridge Dude",
      "duration": "0:00:02",
      "mp3":
        "https://archive.org/download/neil-rogers-show-soundboard/Absolutely-Correct-Sir.mp3",
      "ogg":
        "https://archive.org/download/neil-rogers-show-soundboard/Absolutely-Correct-Sir.ogg"
    }
  ]
}
```
