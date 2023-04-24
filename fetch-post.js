async function fetchPost() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");

    if (!postId) {
      console.error("No post ID provided in URL.");
      return;
    }

    const response = await fetch(`http://examone.techlilja.io/posts/${postId}`);
    const post = await response.json();

    document.querySelector(".post-title").textContent = post.title;
    document.querySelector(".post-content").innerHTML = post.content;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchPost);
