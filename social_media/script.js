function createPost() {
  const content = document.getElementById('postContent').value.trim();
  if (content === '') return;
  const post = document.createElement('div');
  post.className = 'post';
  const text = document.createElement('p');
  text.textContent = content;
  post.appendChild(text);
  const feed = document.getElementById('feed');
  feed.prepend(post);
  document.getElementById('postContent').value = '';
}
