const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let editorContent = ""; // Shared content in memory

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send existing content to new user
  socket.emit('loadContent', editorContent);

  // Handle text change from one client and broadcast to others
  socket.on('textChange', (data) => {
    editorContent = data.content;
    socket.broadcast.emit('updateContent', data);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running on C:\Users\lenovo\OneDrive\Desktop\New1\text${PORT}`);
});
