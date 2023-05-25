// Function to update the document title dynamically
function updateDocumentTitle(dynamicTitle) {
  document.title = "Callie Furmint | " + dynamicTitle;
}

// Function to fetch the dynamic title from the API using post ID
function fetchDynamicTitle(postId) {
  fetch('https://examone.techlilja.io/wp-json/wp/v2/posts/' + postId)
    .then(response => response.json())
    .then(data => {
      const dynamicTitle = data.title.rendered;
      updateDocumentTitle(dynamicTitle);
    })
    .catch(error => {
      console.error("Error fetching dynamic title:", error);
    });
}

// Get the current post ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

fetchDynamicTitle(postId);
