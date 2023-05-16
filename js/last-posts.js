let currentPage = 1;
let totalPages = 1;

async function displayLatestPosts(page = 1) {
  currentPage = page;
  const perPage = 4;
  const response = await fetch(
    `https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}&sticky=false`
  );
  const posts = await response.json();
  
  displayPosts(posts);
}

async function displayPostPreview(postId) {
  const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts/${postId}?_embed`);
  const post = await response.json();

  const previewContainer = document.getElementById('post-preview');
  previewContainer.innerHTML = '';

  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper', 'post-preview-wrapper');
  

  const imageWrapper = document.createElement('div');
  const imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  imageWrapper.style.backgroundImage = `url(${imageUrl})`;

  const title = document.createElement('h3');
  title.innerHTML = post.title.rendered;

  const excerpt = document.createElement('p');
  excerpt.innerHTML = post.excerpt.rendered;

  const readMoreButton = document.createElement('button');
  readMoreButton.innerHTML = 'READ MORE';
  readMoreButton.addEventListener('click', () => {
    sessionStorage.setItem('selectedPostId', post.id);
    sessionStorage.setItem('selectedPostTitle', post.title.rendered);
    window.location.href = `posts.html?postId=${post.id}`;
  });

  postWrapper.appendChild(imageWrapper);
  postWrapper.appendChild(title);
  postWrapper.appendChild(excerpt);
  postWrapper.appendChild(readMoreButton);
  previewContainer.appendChild(postWrapper);
}

function displayPosts(posts) {
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

    postWrapper.addEventListener('click', () => {
      displayPostPreview(post.id);
    });
  }

  // If the number of fetched posts is less than 4, add empty placeholders - I tried to get this to work, but having difficulties
  if (posts.length < 4) {
    const remainingPostsCount = 4 - posts.length;
    for (let i = 0; i < remainingPostsCount; i++) {
      const emptyPostWrapper = document.createElement('div');
      emptyPostWrapper.classList.add('empty-post-wrapper');
      latestPostsContainer.appendChild(emptyPostWrapper);
    }
  }
}

async function loadPreviousPosts() {
  if (currentPage > 1) {
    currentPage -= 1;
    await displayLatestPosts(currentPage);
  }
}

async function loadNextPosts() {
  if (currentPage < totalPages) {
    currentPage += 1;
    await displayLatestPosts(currentPage);
  }
}

function createPreviousButton() {
  const paginationContainerLeft = document.getElementById('pagination-container-left');
  
  const previousButton = document.createElement('button');
  previousButton.innerHTML = '<i class="fa-solid fa-angles-left fa-2xl"></i>';
  previousButton.addEventListener('click', loadPreviousPosts);
  paginationContainerLeft.appendChild(previousButton);
}

function createNextButton() {
  const paginationContainerRight = document.getElementById('pagination-container-right');
  
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '<i class="fa-solid fa-angles-right fa-2xl"></i>';
  nextButton.addEventListener('click', loadNextPosts);
  paginationContainerRight.appendChild(nextButton);
}

function createPaginationButtons() {
  createPreviousButton();
  createNextButton();
}


async function init() {
  totalPages = await getNumberOfPages();
  await displayLatestPosts(1);
  createPaginationButtons();
  
  // If there's a selected post ID in session storage, display its preview
  const selectedPostId = sessionStorage.getItem('selectedPostId');
  if (selectedPostId) {
    await displayPostPreview(selectedPostId);
  }
}

async function getNumberOfPages() {
  const response = await fetch('https://examone.techlilja.io/wp-json/wp/v2/posts');
  const totalPages = parseInt(response.headers.get('x-wp-totalpages'));
  return totalPages;
}

init();

