export default function Video() {
    return (
      <video width="100%" height="100%" controls preload="none" muted autoPlay >
        <source src="https://videos.pexels.com/video-files/3521318/3521318-hd_1280_720_30fps.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    )
  }