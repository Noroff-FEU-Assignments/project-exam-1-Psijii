async function fetchAllPosts() {
  const response = await fetch("https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&per_page=100");
  const data = await response.json();
  return data;
}

async function displayAllPosts() {
  const posts = await fetchAllPosts();
  const allPostsContainer = document.getElementById("all-posts-container");

  posts.forEach((post) => {
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("post");

    const title = document.createElement("h2");
    title.innerHTML = post.title.rendered;

    const content = document.createElement("div");
    content.innerHTML = post.content.rendered;

    postWrapper.appendChild(title);
    postWrapper.appendChild(content);
    allPostsContainer.appendChild(postWrapper);
  });

  handleModalBehavior();
}

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");

function openModal(imageUrl) {
  modal.style.display = "block";
  modalImg.src = imageUrl;
}

function handleModalBehavior() {
  const closeModal = document.getElementsByClassName("close")[0];
  closeModal.onclick = function() {
    modal.style.display = "none";
  };

  const images = document.querySelectorAll(".post-image");
  images.forEach((image) => {
    image.onclick = function() {
      openModal(image.src);
    };
  });
}

displayAllPosts();
