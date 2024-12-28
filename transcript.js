const fs = require("fs");
const { getSubtitles } = require("youtube-captions-scraper");

const videoLink = "https://www.youtube.com/watch?v=MMK9tR4pH2A";

// Extract the video ID from the YouTube link
const extractVideoId = (url) => {
  const urlParams = new URL(url).searchParams;
  return urlParams.get("v");
};

const videoId = extractVideoId(videoLink);

if (!videoId) {
  console.error("Invalid YouTube link. Please provide a valid video URL.");
} else {
  getSubtitles({
    videoID: videoId,
    lang: "en",
  })
    .then((captions) => {
      if (captions.length === 0) {
        console.log("No subtitles are available for this video.");
      } else {
        // Format subtitles as a string
        const subtitles = captions.map((caption) => `Time: ${caption.start}s - Text: ${caption.text}`).join("\n");

        // Append subtitles to a file
        const outputFileName = "subtitles.txt";

    

        fs.appendFile(outputFileName,subtitles + "\n", (err) => {
          if (err) {
            console.error("Error appending subtitles to file:", err);
          } else {
            console.log(`Subtitles have been appended to ${outputFileName}`);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching subtitles:", error);
    });
}
