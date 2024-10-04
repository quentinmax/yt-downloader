import { Clock, Download, User } from "lucide-react";
import BACKGROUND_IMG from "../public/background-gradient.png";
import { useEffect, useState } from "react";
import { VideoData } from "./types/VideoData";
import { handleDownload } from "./download";
import ToggleGroup from "./components/ToggleGroup";

export type Format = "best" | "bestaudio";

function App() {
  const [active, setActive] = useState(0);
  const [videoData, setVideoData] = useState<VideoData>({
    channel: "-",
    duration: "-",
    title: "Loading...",
    url: "",
  });

  const [format, setFormat] = useState<Format>("best");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const getYoutubeVideoData = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id! },
        func: () => {
          const youtubePlayer =
            document.getElementsByClassName("video-stream")[0];

          const url = window.location.href;
          const title =
            document.querySelector(
              "yt-formatted-string.style-scope.ytd-watch-metadata"
            )?.textContent || "";

          const channel =
            document.querySelector(
              "a.yt-simple-endpoint.style-scope.yt-formatted-string"
            )?.textContent || "";

          // @ts-ignore
          var duration = youtubePlayer.duration;

          const seconds = Math.floor(duration); // Total duration in seconds
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          duration = `${mins}:${secs < 10 ? "0" : ""}${secs}`; // Format as mm:ss
          return {
            url,
            title,
            channel,
            duration,
          };
        },
      },
      (result) => {
        if (result[0].result) {
          setVideoData(result[0].result);
        } else {
          throw new Error("Something unexpected happened. Try again.");
        }
      }
    );
  };

  useEffect(() => {
    getYoutubeVideoData();
  }, []);

  useEffect(() => {
    switch (active) {
      case 0:
        setFormat("best");
        break;
      case 1:
        setFormat("bestaudio");
        break;
      default:
        setFormat("best");
        break;
    }
  }, [active]);

  return (
    <main>
      <img
        src={BACKGROUND_IMG}
        alt="bg-gradient"
        width={400}
        draggable={false}
      />
      <h1>YT Downloader</h1>
      <section className="info-section">
        <p className="subtitle">Currently watching</p>
        <h2 className="video-title">{videoData?.title}</h2>
        <div className="chip-container">
          <div className="data-chip">
            <Clock color="var(--border)" />
            <p>{videoData.duration}</p>
          </div>
          <div className="data-chip">
            <User color="var(--border)" />
            <p>{videoData.channel}</p>
          </div>
        </div>

        <hr className="separator" />
        {/* TODO: Add refresh button */}

        {/* Download Section */}
        {!downloading ? (
          <>
            <ToggleGroup setValue={setActive} value={active} />
            <button
              className="download-btn"
              onClick={() => {
                setDownloading(true);
                handleDownload(videoData, format, setDownloadProgress);
              }}
            >
              <Download color="white" width={25} height={25} strokeWidth={2} />
              <p>Download</p>
            </button>
          </>
        ) : (
          <>
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <p className="subtitle">
              {downloadProgress === 0
                ? "Downloading... This might take a bit."
                : downloadProgress + "%"}
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
