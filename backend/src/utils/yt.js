const youtubedl = require('youtube-dl-exec');

exports.extractInfo = async (url) => {
  try {
    const rawInfo = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      ]
    });

    const formats = rawInfo.formats.filter(f => f.url);
    
    // Video formats containing mp4 (both pre-muxed and dashboard streams)
    const videoFormats = formats.filter(f => f.ext === 'mp4' && f.vcodec !== 'none');

    // Audio formats
    const audioFormats = formats.filter(f => f.ext === 'm4a' || (f.acodec !== 'none' && f.vcodec === 'none'));

    const duration = rawInfo.duration || 0;
    const getFileSize = (f) => {
      if (f.filesize) return f.filesize;
      if (f.filesize_approx) return f.filesize_approx;
      if (f.tbr && duration) return Math.floor((f.tbr * 1024 / 8) * duration);
      if (f.vbr && duration) return Math.floor(((f.vbr + (f.abr || 128)) * 1024 / 8) * duration);
      return 0;
    };

    return {
      title: rawInfo.title,
      thumbnail: rawInfo.thumbnail,
      duration: rawInfo.duration_string || rawInfo.duration,
      channel: rawInfo.channel,
      videoFormats: videoFormats.map(f => ({
        formatId: f.format_id,
        resolution: f.resolution || f.format_note,
        url: f.url,
        ext: f.ext,
        filesize: getFileSize(f)
      })).sort((a, b) => (b.filesize || 0) - (a.filesize || 0)), 
      audioFormats: audioFormats.map(f => ({
        formatId: f.format_id,
        url: f.url,
        ext: f.ext,
        filesize: getFileSize(f),
        note: f.format_note || 'Audio'
      })).sort((a, b) => (b.filesize || 0) - (a.filesize || 0)), 
      originalUrl: rawInfo.original_url || url
    };

  } catch (error) {
    throw new Error('Failed to extract video info: ' + error.message);
  }
};
