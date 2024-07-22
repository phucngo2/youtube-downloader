import { IVideoInfo } from "../types";
import { videoInfo } from "@distube/ytdl-core";

export const mapToIVideoInfo = (videoInfo: videoInfo): IVideoInfo => {
  return {
    formats: videoInfo.formats.map((format) => ({
      container: format.container,
      contentLength: format.contentLength,
      hasAudio: format.hasAudio,
      hasVideo: format.hasVideo,
      itag: format.itag,
      quality: format.quality,
      qualityLabel: format.qualityLabel,
      url: format.url,
      audioBitrate: format.audioBitrate,
      audioQuality: format.audioQuality,
      bitrate: format.bitrate,
      fps: format.fps,
      height: format.height,
      mimeType: format.mimeType,
      width: format.width,
    })),
    title: videoInfo.videoDetails.title,
    thumbnails: videoInfo.videoDetails.thumbnails,
    keywords: videoInfo.videoDetails.keywords,
    embedUrl: videoInfo.videoDetails.embed.iframeUrl,
    videoUrl: videoInfo.videoDetails.video_url,
    videoId: videoInfo.videoDetails.videoId,
  };
};
