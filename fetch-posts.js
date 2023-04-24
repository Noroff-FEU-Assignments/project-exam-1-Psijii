async function fetchStickiedPosts() {
  try {
    const response = await fetch("https://examone.techlilja.io/");
    const data = await response.json();
    const stickiedPosts = data.filter((post) => post.stickied);

    for (let i = 0; i < stickiedPosts.length && i < 4; i++) {
      const post = stickiedPosts[i];
      const imgElement = document.getElementById(`small-image-${i + 1}`);

      if (imgElement) {
        imgElement.src = post.image_url;
        imgElement.alt = post.title;
      }
    }
  } catch (error) {
    console.error("Error fetching stickied posts:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchStickiedPosts);

for (let i = 0; i < stickiedPosts.length && i < 4; i++) {
  const post = stickiedPosts[i];
  const imgElement = document.getElementById(`small-image-${i + 1}`);

  if (imgElement) {
    imgElement.src = post.image_url;
    imgElement.alt = post.title;

    // Add the following lines
    imgElement.style.cursor = "pointer";
    imgElement.addEventListener("click", () => {
      window.location.href = `posts.html?post_id=${post.id}`;
    });
  }
}