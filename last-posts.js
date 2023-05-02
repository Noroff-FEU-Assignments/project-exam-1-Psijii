
async function displayLatestPosts(page = 1) {
  currentPage = page;
  const perPage = 10;
  const response = await fetch(
    `https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}&sticky=false`
  );
  const posts = await response.json();
  
  displayPosts(posts, page !== 1);
}
function displayPosts(posts, append = false) {
  const latestPostsContainer = document.getElementById('latest-posts-container');
  if (!append) {
    latestPostsContainer.innerHTML = '';
  }

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

    postWrapper.addEventListener('click', () => {
      sessionStorage.setItem('selectedPostId', post.id);
      sessionStorage.setItem('selectedPostTitle', post.title.rendered); // Store the post title in sessionStorage
      window.location.href = `posts.html?postId=${post.id}`;
    });
  }
}


async function loadMorePosts() {
  currentPage += 1;
  displayLatestPosts(currentPage);
}

function createLoadMoreButton() {
  const paginationContainer = document.getElementById('pagination-container');
  const loadMoreButton = document.createElement('button');
  loadMoreButton.innerText = 'Load more';
  loadMoreButton.addEventListener('click', loadMorePosts);
  paginationContainer.appendChild(loadMoreButton);
}

async function init() {
  displayLatestPosts(1);
  createLoadMoreButton();
}

init();

async function getNumberOfPages() {
  const response = await fetch('https://examone.techlilja.io/wp-json/wp/v2/posts');
  const totalPages = parseInt(response.headers.get('x-wp-totalpages'));
  return totalPages;
}
