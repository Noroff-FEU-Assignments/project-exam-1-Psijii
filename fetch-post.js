async function getPostById(id) {
  const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts/${id}?_embed`);
  const data = await response.json();
  return data;
}


async function displayPost() {
  const postId = sessionStorage.getItem('selectedPostId');
  const post = await getPostById(postId);
  const postContainer = document.getElementById('post-container');

  const title = document.createElement('h1');
  title.innerHTML = post.title.rendered;

  const author = document.createElement('p');
  author.innerHTML = `Author: ${post._embedded.author[0].name}`;

  const date = document.createElement('p');
  date.innerHTML = `Date: ${post.date}`;

  const content = document.createElement('div');
  content.innerHTML = post.content.rendered;

  postContainer.appendChild(title);
  postContainer.appendChild(author);
  postContainer.appendChild(date);
  postContainer.appendChild(content);
}

displayPost();
