async function getPostById(id) {
  const response = await fetch(`https://examone.techlilja.io/wp-json/wp/v2/posts/${id}`);
  const data = await response.json();
  return data;
}

async function displayPost() {
  const postId = sessionStorage.getItem('selectedPostId');
  const post = await getPostById(postId);
  const postContainer = document.getElementById('post-container');

  const title = document.createElement('h1');
  title.innerHTML = post.title.rendered;

  const content = document.createElement('div');
  content.innerHTML = post.content.rendered;

  postContainer.appendChild(title);
  postContainer.appendChild(content);
}

displayPost();

document.getElementById("comment-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const postId = sessionStorage.getItem("selectedPostId");
  const author = document.getElementById("comment-author").value;
  const email = document.getElementById("comment-email").value;
  const content = document.getElementById("comment-content").value;

  try {
    await submitComment(postId, author, email, content);
    alert("Comment submitted successfully!");
    document.getElementById("comment-form").reset();
  } catch (error) {
    console.error("Failed to submit comment", error);
    alert("Failed to submit comment. Please try again.");
  }
});

async function submitComment(postId, author, email, content) {
  const response = await fetch("https://examone.techlilja.io/wp-json/wp/v2/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post: postId,
      author_name: author,
      author_email: email,
      content: content,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit comment");
  }

  return await response.json();
}
