// JavaScript functions for search and newsletter subscription
function search() {
  var searchInput = document.getElementById('searchInput').value;
  var url = 'https://examone.techlilja.io/wp-json/wp/v2/?search=' + searchInput;

  // Perform search using the API endpoint
  // You'll need to implement this part to fetch the search results from the API
  // and handle the response accordingly
  console.log('Performing search for: ' + searchInput);
  console.log('API Endpoint: ' + url);
}

function subscribeNewsletter() {
  // You can implement the newsletter subscription functionality here
  console.log('Subscribing to newsletter');
}
