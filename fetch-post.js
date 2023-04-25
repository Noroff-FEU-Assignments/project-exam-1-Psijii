async function getPostById(id) {
  const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts/${id}`);
  const data = await response.json();
  return data;
}

async function displayPost() {
  const postId = sessionStorage.getItem('selectedPostId');
  const post = await getPostById(postId);
  const postContainer = document.getElementById('post-container');

  const title = document.createElement('h1');
  title.innerHTML = post.title.rendered;

  const content = document.createElement('div');
  content.innerHTML = post.content.rendered;

  postContainer.appendChild(title);
  postContainer.appendChild(content);
}

displayPost();

