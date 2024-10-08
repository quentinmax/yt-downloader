import { Format } from "./App";
import { VideoData } from "./types/VideoData";

export const handleDownload = async (
  videoData: VideoData,
  format: Format,
  setDownloadProgress: Function,
  setDownloading: Function,
  setError: Function,
) => {
  
  if (!videoData.url) {
    console.error("No video provided.");
    setError("No video provided.");
    return;
  }

  try {
    // Call an external API service for downloading the YouTube video
    const url = import.meta.env.VITE_API_URL;
    console.log(url);
    
    const response = await fetch(url +  "/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoUrl: videoData.url, format }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error during download:", errorText);
      setError("Error during download. Try again later.")
      return;
    }

    setDownloading(true);

    const contentLength = response.headers.get("Content-Length"); // Get total file size
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

    if (!totalBytes) {
      console.error("Unable to determine file size.");
      setError("Unable to determine file size.")
      return;
    }

    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;

    //Read stream in chunks
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      chunks.push(value!);
      receivedBytes += value!.length;

      // Update progress percentage
      const progress = Math.floor((receivedBytes / totalBytes) * 100);
      setDownloadProgress(progress);
    }

    // Download the file using the URL returned by the API
    const blob = new Blob(chunks, { type: "video/mp4" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${videoData.title}.${format === "bestaudio" ? "m4a" : "mp4"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Network error:", error);
    setError("Network error.");
    return;
  }
};
