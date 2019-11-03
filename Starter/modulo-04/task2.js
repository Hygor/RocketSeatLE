let body = document.body;
let form = document.querySelector('#github-search');
let input = document.querySelector('#github-search input');

function getUserRepos(user) {
  let results = document.querySelector('.results');
  results.innerHTML = `Loading...`

  const message = {
    empty: 'This user has no repositories.',
    notfound: 'User not found!',
    disconnected: 'Something is wrong with your connection!' 
  }

  axios.get(`https://api.github.com/users/${user}/repos`)
    .then( function(response) {
      let repos = response.data;
      if ( repos.length ) renderRepos(repos);
      else results.innerHTML = message.empty;
    })
    .catch( function(error) {
      let response = error.response;
      if ( response && response.status == '404')
        results.innerHTML = message.notfound;
      else results.innerHTML = message.disconnected;
    })
};

function renderRepos(repos) {
  let results = document.querySelector('.results');
  results.innerHTML = '';
  for ( repo of repos ) {
    let item = document.createElement('li');
    item.innerText = repo.name;
    results.appendChild(item);
  }
}

form.onsubmit = function(e) {
  e.preventDefault();
  let user = input.value;
  let results = document.querySelector('.results') || document.createElement('ul');
      results.classList = 'results';
  body.appendChild(results);
  getUserRepos(user);
};
