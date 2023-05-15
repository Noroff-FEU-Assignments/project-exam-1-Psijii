
// -------------------------------------------- //
//
// It's working perfectly! Stop destryoing it.  //
//
// -------------------------------------------- //


async function getStickiedPosts() {
  const response = await fetch('https://examone.techlilja.io/wp-json/wp/v2/posts?sticky=true');
  const data = await response.json();

  const stickiedPosts = await Promise.all(
    data.map(async post => {
      if (post.featured_media) {
        const mediaResponse = await fetch(
          `https://examone.techlilja.io/wp-json/wp/v2/media/${post.featured_media}`
        );
        const mediaData = await mediaResponse.json();
        post.featured_media_url = mediaData.source_url;
      }
      return post;
    })
  );

  return stickiedPosts;
}

async function displayGallery() {
  const stickiedPosts = await getStickiedPosts();
  const galleryContainer = document.getElementById('gallery-container');

  stickiedPosts.forEach(post => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const image = document.createElement('img');
    image.src = post.featured_media_url;
    image.alt = post.title.rendered;
    image.dataset.postId = post.id;

    // Create a new element for the title
    const title = document.createElement('span'); 
    title.innerText = post.title.rendered;
    title.classList.add('image-title'); 

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(title); 
    galleryContainer.appendChild(imageWrapper);
  });
  addClickEventsToImages();
}


function addClickEventsToImages() {
  const images = document.querySelectorAll('.image-wrapper img');

  images.forEach(img => {
    img.addEventListener('click', () => {
      const postId = img.dataset.postId;
      const postTitle = img.alt; // Get the post title from the image's alt attribute

      sessionStorage.setItem('selectedPostId', postId);
      sessionStorage.setItem('selectedPostTitle', postTitle); // Store the post title in sessionStorage
      
      window.location.href = `posts.html?postId=${postId}`; // Add the postId as a query string parameter
    });
  });
}



displayGallery();

