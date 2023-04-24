async function fetchPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");

  if (!postId) {
    console.error("Post ID not found in the URL");
    return;
  }

  try {
    const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();

    displayPost(post);
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
}

function displayPost(post) {
  const postContainer = document.getElementById("post-container");

  const postTitle = document.createElement("h2");
  postTitle.innerHTML = post.title.rendered;
  postContainer.appendChild(postTitle);

  const postContent = document.createElement("div");
  postContent.innerHTML = post.content.rendered;
  postContainer.appendChild(postContent);
}

document.addEventListener("DOMContentLoaded", fetchPost);
