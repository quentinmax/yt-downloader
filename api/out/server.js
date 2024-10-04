import express from "express";
import youtubedl from "youtube-dl-exec";
import cors from "cors";
import path from "path";
import { randomBytes } from "crypto";
import fs from "fs";
const app = express();
const PORT = 5000;
// Enable CORS for the extension
app.use(cors());
app.use(express.json());
app.post("/download", async (req, res) => {
    const { videoUrl, format } = req.body;
    if (!videoUrl) {
        return res.status(400).json({ error: "Video URL is required" });
    }
    const videoId = randomBytes(12).toString("hex");
    try {
        // Download the video using youtube-dl-exec
        console.log("Downloading video...");
        //If not specified, do not set format here, so youtubedl will find the best one
        var outputPath = path.join("../downloads", `${videoId}.${format === "bestaudio" ? "m4a" : "mp4"}`);
        if (!fs.existsSync(path.resolve("../downloads"))) {
            fs.mkdirSync(path.resolve("../downloads"), { recursive: true });
        }
        await youtubedl(videoUrl, {
            output: outputPath,
            format,
            noCheckCertificates: true,
        });
        const fileSize = fs.statSync(outputPath).size;
        res.setHeader("Content-Length", fileSize);
        res.download(outputPath, `${videoId}.${format === "bestaudio" ? "m4a" : "mp4"}`, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res
                    .status(500)
                    .send({ error: "Something unexpected happened. Try again later." });
            }
            // Delete file
            fs.unlinkSync(outputPath);
            console.log("File sent.");
        });
    }
    catch (error) {
        console.error("Download error:", error);
        res
            .status(500)
            .json({ err: "Something unexpected happened. Try again later." });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
