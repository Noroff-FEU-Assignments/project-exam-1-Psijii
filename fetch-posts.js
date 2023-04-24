async function fetchStickiedPosts() {
  try {
    const response = await fetch("https://examone.techlilja.io/wp-json/wp/v2/posts?sticky=true");
    const stickiedPosts = await response.json();

    for (let i = 0; i < stickiedPosts.length && i < 4; i++) {
      const post = stickiedPosts[i];
      const imgElement = document.getElementById(`small-image-${i + 1}`);
      const linkElement = document.getElementById(`small-image-link-${i + 1}`);
      const featuredImage = post._links['wp:featuredmedia'][0].href;

      if (imgElement && linkElement) {
        imgElement.src = featuredImage;
        imgElement.alt = post.title.rendered;

        linkElement.href = `posts.html?post_id=${post.id}`;
      }
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchStickiedPosts);
