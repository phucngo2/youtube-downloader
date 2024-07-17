import {
  thumbnail,
  VideoFormatQuality as YtdlVideoFormatQuality,
} from "ytdl-core";

type ExtendString<T extends string> = T | Omit<string, T>;
export type VideoFormatQuality = ExtendString<YtdlVideoFormatQuality>;

export type QualityLabel =
  | "144p"
  | "144p 15fps"
  | "144p60 HDR"
  | "240p"
  | "240p60 HDR"
  | "270p"
  | "360p"
  | "360p60 HDR"
  | "480p"
  | "480p60 HDR"
  | "720p"
  | "720p60"
  | "720p60 HDR"
  | "1080p"
  | "1080p60"
  | "1080p60 HDR"
  | "1440p"
  | "1440p60"
  | "1440p60 HDR"
  | "2160p"
  | "2160p60"
  | "2160p60 HDR"
  | "4320p"
  | "4320p60";

export type VideoContainer = "flv" | "3gp" | "mp4" | "webm" | "ts";

export interface IVideoFormat {
  itag: number;
  url: string;
  mimeType?: string;
  bitrate?: number;
  audioBitrate?: number;
  width?: number;
  height?: number;
  quality: VideoFormatQuality;
  container: VideoContainer;
  hasVideo: boolean;
  hasAudio: boolean;
  contentLength: string;
  qualityLabel: QualityLabel;
  fps?: number;
  audioQuality?: "AUDIO_QUALITY_LOW" | "AUDIO_QUALITY_MEDIUM";
}

export interface IVideoInfo {
  formats: IVideoFormat[];
  videoUrl: string;
  thumbnails: thumbnail[];
  title: string;
  keywords?: string[];
  embedUrl: string;
}
