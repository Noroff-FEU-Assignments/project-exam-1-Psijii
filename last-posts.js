async function displayLatestPosts(page = 1) {
  const perPage = 4;
  const response = await fetch(
    `https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}&sticky=false`
  );
  const posts = await response.json();

  const latestPostsContainer = document.getElementById('latest-posts-container');
  latestPostsContainer.innerHTML = '';

  for (const post of posts) {
    const postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
    const imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    imageWrapper.style.backgroundImage = `url(${imageUrl})`;

    const title = document.createElement('h3');
    title.innerHTML = post.title.rendered;

    postWrapper.appendChild(imageWrapper);
    postWrapper.appendChild(title);
    latestPostsContainer.appendChild(postWrapper);

    // Add click event listener
    postWrapper.addEventListener('click', () => {
      sessionStorage.setItem('selectedPostId', post.id);
      window.location.href = 'posts.html';
    });
  }
}

async function displayPagination() {
  const totalPages = await getNumberOfPages();
  const paginationContainer = document.getElementById('pagination-container');

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.addEventListener('click', () => {
      displayLatestPosts(i);
    });
    paginationContainer.appendChild(pageButton);
  }
}

async function getNumberOfPages() {
  const response = await fetch('https://examone.techlilja.io/wp-json/wp/v2/posts');
  const totalPages = parseInt(response.headers.get('x-wp-totalpages'));
  return totalPages;
}

displayLatestPosts(1);
displayPagination();
