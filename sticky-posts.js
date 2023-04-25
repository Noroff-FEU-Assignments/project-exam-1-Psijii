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

    const title = document.createElement('div');
    title.classList.add('image-title');
    title.innerHTML = post.title.rendered;

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
      sessionStorage.setItem('selectedPostId', postId);
      window.location.href = 'posts.html';
    });
  });
}

displayGallery();

