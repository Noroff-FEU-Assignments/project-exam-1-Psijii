document.addEventListener('DOMContentLoaded', function() {
  var userId = 1; 

  fetch('https://examone.techlilja.io/wp-json/wp/v2/users/' + userId)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function(author) {
      var authorInfoContainer = document.getElementById('author-info');
      var html = '';

      html += '<h2>' + author.name + '</h2>';
      html += '<p>' + author.description + '</p>';

      authorInfoContainer.innerHTML = html;
    })
    .catch(function(error) {
      console.log('An error occurred while fetching author data: ' + error);
    });
});
