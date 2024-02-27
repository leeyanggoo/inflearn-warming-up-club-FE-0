const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const form = document.querySelector('form');
const url = 'https://api.github.com/users';
let prevInputValue;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  loadUser(searchInput.value);
});

async function loadUser(input) {
  prevInputValue = input;

  try {
    // const response = await fetch('./src/javascript/user.json');
    const response = await fetch(`${url}/${input}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch user json');
    }

    const json = await response.json();

    setUserAvatar(json);
    setUserInfo(json);

    await loadUserRepos(json);
  } catch (error) {
    console.error(error);
  }
}

function setUserAvatar(data) {
  const avatar = document.getElementById('avatar');
  avatar.src = data.avatar_url;
  const viewProfileBtn = document.getElementById('view-profile');
  viewProfileBtn.removeAttribute('disabled');
  viewProfileBtn.setAttribute('_blank', '');

  viewProfileBtn.addEventListener('click', () => {
    window.open(data.html_url);
  });
}

function setUserInfo(data) {
  const public_repos = document
    .getElementById('public_repos')
    .querySelector('span');
  const public_gists = document
    .getElementById('public_gists')
    .querySelector('span');
  const followers = document.getElementById('followers').querySelector('span');
  const following = document.getElementById('following').querySelector('span');
  const company = document.getElementById('company').querySelector('span');
  const blog = document.getElementById('blog').querySelector('span');
  const location = document.getElementById('location').querySelector('span');
  const created_at = document
    .getElementById('created_at')
    .querySelector('span');

  public_repos.textContent = data.public_repos;
  public_gists.textContent = data.public_gists;
  followers.textContent = data.followers;
  following.textContent = data.following;
  company.textContent = data.company;
  blog.textContent = data.blog;
  location.textContent = data.location;
  created_at.textContent = data.created_at;
}

async function loadUserRepos(data) {
  try {
    const reposUrl = data.repos_url;
    // const response = await fetch('./src/javascript/repos.json');
    const response = await fetch(`${reposUrl}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch repos json');
    }

    const json = await response.json();

    setUserRepos(json);
  } catch (error) {
    console.error(error);
  }
}

function setUserRepos(data) {
  const reposWrap = document.getElementById('repos-wrap');
  reposWrap.replaceChildren();

  for (let i = 0; i < 5; i++) {
    const p = document.createElement('p');
    p.className = 'container flex flex-row flex-between';
    const link = document.createElement('a');
    link.textContent = data[i].name;
    link.href = data[i].html_url;
    p.appendChild(link);

    const reposInfoWrap = document.createElement('div');
    reposInfoWrap.className = 'flex flex-row flex-between gap-10';
    const styleArray = [
      'bg-primary-light',
      'bg-secondary-light',
      'bg-secondary-light',
    ];
    const dataArray = ['stargazers_count', 'watchers_count', 'forks_count'];
    const textArray = ['Stars', 'Watchers', 'Forks'];
    styleArray.forEach((style, index) => {
      const span = document.createElement('span');
      span.className = `${style} info-count`;
      span.textContent = `${textArray[index]} ${data[i][dataArray[index]]}`;
      reposInfoWrap.appendChild(span);
    });
    p.appendChild(reposInfoWrap);

    reposWrap.appendChild(p);
  }
}
