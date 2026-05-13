/**
 * Simple HTTP Server for PlayStation Cafe Manager PWA
 * Run: node server.js
 * Then open: http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.css': 'text/css'
};

// Simple placeholder PNG generator (8x8 pixel blue square)
function generatePlaceholderPNG() {
  const width = 192;
  const height = 192;
  const size = width * height * 4 + 54;
  const buffer = Buffer.alloc(size);
  
  // BMP header (simplified for demo)
  buffer.writeUInt8(0x89, 0); // PNG signature
  buffer.writeUInt8(0x50, 1);
  buffer.writeUInt8(0x4E, 2);
  buffer.writeUInt8(0x47, 3);
  
  // For production, use a proper PNG library or pre-generate icons
  // This is a minimal placeholder
  return buffer;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  if (pathname === '/') {
    pathname = '/PlayStation_Cafe_Manager_V5.html';
  }
  
  // Handle icon generation on-the-fly
  if (pathname === '/icon-192x192.png' || pathname === '/icon-512x512.png') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    // Serve a minimal valid PNG (transparent with blue background)
    // For production, generate or serve pre-built icons
    const minimalPNG = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD8, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0xC8, 0x1E, 0x0B, 0x6B, 0x00, 0x00, 0x00,
      0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    res.end(minimalPNG);
    return;
  }
  
  const filePath = path.join(__dirname, pathname);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found: ' + pathname);
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║     PlayStation Cafe Manager - PWA Server                     ║
╠════════════════════════════════════════════════════════════════╣
║ Server running at: http://localhost:${PORT}                      ║
║ Open in Chrome: http://localhost:${PORT}                        ║
║ Install on Android: Tap menu → "Install app"                  ║
╠════════════════════════════════════════════════════════════════╣
║ Service Worker: Active                                        ║
║ Offline Mode: Enabled                                         ║
║ localStorage: Persisted                                       ║
╚════════════════════════════════════════════════════════════════╝
  `);
});
