const yt = require('../utils/yt');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

exports.getVideoInfo = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Checking cache
    const cachedData = cache.get(url);
    if (cachedData) {
      return res.json(cachedData);
    }

    const info = await yt.extractInfo(url);
    
    // Store in cache
    cache.set(url, info);
    
    res.json(info);
  } catch (error) {
    next(error);
  }
};

exports.proxyDownload = (req, res, next) => {
  const { url, title, ext } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const filename = encodeURIComponent(title || 'QuickVidDownload') + '.' + (ext || 'mp4');
    
    // We import https here or at top. Using require('https')
    require('https').get(url, (stream) => {
      if (stream.statusCode !== 200 && stream.statusCode !== 206) {
        return res.status(stream.statusCode || 500).send('Failed to access remote file');
      }
      res.setHeader('Content-Type', stream.headers['content-type'] || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      if (stream.headers['content-length']) {
        res.setHeader('Content-Length', stream.headers['content-length']);
      }
      stream.pipe(res);
    }).on('error', (err) => {
      res.status(500).send('Stream error: ' + err.message);
    });
  } catch (error) {
    next(error);
  }
};
