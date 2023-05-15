// Fetches the latest post and displays it as a preview
async function displayLatestPost() {
  try {
    const response = await fetch('https://examone.techlilja.io/wp-json/wp/v2/posts?per_page=1&_embed');
    const data = await response.json();

    if (data.length > 0) {
      const post = data[0];
      const postId = post.id;
      const postTitle = post.title.rendered;
      const postContent = post.content.rendered;

      // Extract the first five lines of the post content
      const contentLines = postContent.split('\n').slice(0, 5);
      const truncatedContent = contentLines.join('\n');

      // Display the post preview
      const postPreview = document.createElement('div');
      postPreview.classList.add('post-preview');
      postPreview.innerHTML = `
        <h2>${postTitle}</h2>
        <div class="fade-text">${truncatedContent}</div>
      `;
      document.getElementById('post-container').appendChild(postPreview);

      // Create a "Load More" button
      const loadMoreButton = document.createElement('button');
      loadMoreButton.innerText = 'Read more';
      loadMoreButton.addEventListener('click', function () {
        // Redirect to posts.html with post ID
        window.location.href = `posts.html?id=${postId}`;
      });
      document.getElementById('post-container').appendChild(loadMoreButton);
    } else {
      console.log('No posts found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to display the latest post
displayLatestPost();
