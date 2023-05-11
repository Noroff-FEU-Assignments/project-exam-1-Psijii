const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");

function openModal(imageUrl) {
  modal.style.display = "block";
  modalImg.src = imageUrl;
}

async function fetchAllPosts() {
  const response = await fetch("https://examone.techlilja.io/wp-json/wp/v2/posts?_embed&per_page=100");
  const data = await response.json();

  const allPostsContainer = document.getElementById("all-posts-container");

  data.forEach(async (post) => {
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("post");

    const title = document.createElement("h2");
    title.innerHTML = post.title.rendered;

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

function handleModalBehavior() {
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
}

fetchAllPosts();
