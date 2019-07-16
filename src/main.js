document.getElementById("getAll").addEventListener("click", getAll);
function getAll() {
  fetch("/all.json")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(mkJson) {
      document.getElementById("all").innerHTML = mkJson.forEach(restaurant => {
        ""
      });
    })
    .catch(err => {
      console.log(`There was an error`);
    });
}