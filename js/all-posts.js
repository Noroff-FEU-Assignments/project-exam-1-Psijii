let currentPage = 1;

async function fetchPosts(page = 1) {
  const perPage = 4;
  const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`);
  const posts = await response.json();
  return posts;
}

async function displayPosts(posts) {
  const allPostsContainer = document.getElementById("all-posts-container");

  posts.forEach(async (post) => {
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("post");

    const title = document.createElement("h2");
    title.innerHTML = `<a href="blog.html?postId=${post.id}" class="post-link">${post.title.rendered}</a>`;

    const content = document.createElement("div");
    content.innerHTML = post.content.rendered;

    // Add date
    const date = document.createElement("p");
    date.innerHTML = new Date(post.date).toLocaleDateString();
    date.classList.add("post-date");

    // Fetch author information
    const authorResponse = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/users/${post.author}`);
    const authorData = await authorResponse.json();
    const author = document.createElement("p");
    author.innerHTML = `By ${authorData.name}`;
    author.classList.add("post-author");

    postWrapper.appendChild(title);
    postWrapper.appendChild(date);
    postWrapper.appendChild(author);
    postWrapper.appendChild(content);

    // Check if post has an image, and adding it to the post(s)
    if (post._embedded && post._embedded["wp:featuredmedia"]) {
      const imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
      const image = document.createElement("img");
      image.src = imageUrl;
      image.classList.add("post-image");
      postWrapper.appendChild(image);
    }

    allPostsContainer.appendChild(postWrapper);
  });

  handleModalBehavior(); 
}

async function loadMorePosts() {
  currentPage += 1;
  const posts = await fetchPosts(currentPage);
  displayPosts(posts);
}

function createLoadMoreButton() {
  const loadMoreButton = document.createElement('button');
  loadMoreButton.innerText = 'Load more';
  loadMoreButton.addEventListener('click', loadMorePosts);
  document.body.appendChild(loadMoreButton);
}

function handleModalBehavior() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const closeModal = document.getElementsByClassName("close")[0];

  closeModal.onclick = function() {
    modal.style.display = "none";
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.matches('.post-image') || target.matches('.post img')) {
      openModal(target.src);
    }
  });

  function openModal(imageUrl) {
    modal.style.display = "block";
    modalImg.src = imageUrl;
  }
}

async function init() {
  const posts = await fetchPosts();
  displayPosts(posts);
  createLoadMoreButton();
}

init();
