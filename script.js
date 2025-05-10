const socket = io();
const editor = document.getElementById('editor');
const loginScreen = document.getElementById('login-screen');
const editorScreen = document.getElementById('editor-screen');
const usernameInput = document.getElementById('username');
const currentUserSpan = document.getElementById('currentUser');

let username = '';

document.getElementById('joinBtn').addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (!username) return alert("Please enter a name");

  loginScreen.style.display = 'none';
  editorScreen.style.display = 'block';
  currentUserSpan.textContent = username;
});

// Load content when joining
socket.on('loadContent', (content) => {
  editor.innerHTML = content;
});

// Update content from others
socket.on('updateContent', (data) => {
  if (data.username !== username) {
    editor.innerHTML = data.content;
  }
});

// Send changes on input
editor.addEventListener('input', () => {
  const content = editor.innerHTML;
  socket.emit('textChange', { username, content });
});
