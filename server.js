const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.join(__dirname, 'www');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
  let filePath = path.join(ROOT, path.normalize(urlPath));
  const ext = path.extname(filePath);
  if (!ext && !urlPath.endsWith('/')) {
    const tryPath = path.join(ROOT, urlPath.slice(1) + '.html');
    if (fs.existsSync(tryPath)) filePath = tryPath;
  }

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end();
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(500);
      res.end('Server error');
      return;
    }
    const ext = path.extname(filePath);
    const type = MIME[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    if (['.html', '.css', '.js', '.webmanifest'].indexOf(ext) !== -1 || path.basename(filePath) === 'sw.js') {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  基隆料理教室 Keelung Cooking School');
  console.log('  http://localhost:' + PORT + '/');
  console.log('  http://127.0.0.1:' + PORT + '/');
  console.log('');
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('');
    console.error('  連接失敗：port ' + PORT + ' 已被佔用。');
    console.error('  請先關閉佔用 3000 的程式，或執行：');
    console.error('    lsof -i :3000');
    console.error('  然後 kill 對應的 PID。');
    console.error('');
    process.exit(1);
  }
  throw err;
});
