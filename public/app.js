const API_KEY = '9ddcae7901fe2ea913c39df9a64b06c3';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const cardsConteiner = document.querySelector('.res-cards');

const date = new Date();
const date2 = date.toISOString();

const formatedDate = new Date(date2);
console.log(formatedDate);

const btn = document.querySelector('.btn');

const getData = async function (url) {
  try {
    const res = await fetch(url);
    console.log(res);

    if (res.status === 404) {
      throw new Error(`Please enter polish(PL) zip-code`);
    }
    if (res.status === 400) {
      throw new Error(`Please enter correct zip-code`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    cardsConteiner.innerHTML = '';
    const markup = `
    <div class='alert'>${error}</div>
    `;
    cardsConteiner.insertAdjacentHTML('afterbegin', markup);
  }
};

// http://openweathermap.org/img/w/10d.png

const postData = async function (url = '/data', data = { book: 42 }) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error');
  }
};

const updateUI = async (data) => {
  const res = await fetch('/data', data);
  const newData = await res.json();

  console.log(newData);
  cardsConteiner.innerHTML = '';

  newData.map((data) => {
    console.log(data);
    const date = new Date(data.date);
    const dateFormatted = new Intl.DateTimeFormat(navigator.language).format(
      date
    );

    const markup = ` <div class="card">
      <div class="text-container">
        <h2 class="card-title">${data.text}</h2>
        <p>${dateFormatted}</p>
      </div>

      <div class="weather-details">
        <img
          class="icon"
          src="http://openweathermap.org/img/wn/${data.icon}@2x.png"
        />
        <div class="weather-deatails">
          <h4 class="location-heading">${data.city}</h4>
          <h3 class="temp-text">${data.temp}°</h3>
          <p class="weather-description">${data.description}</p>
        </div>
      </div>
    </div>`;

    cardsConteiner.insertAdjacentHTML('afterbegin', markup);
  });
};

btn.addEventListener('click', performAction);

function performAction() {
  const zipCode = document.querySelector('.input').value;
  const text = document.querySelector('.textarea').value;
  const URL = `${baseURL}${zipCode},pl&units=metric&appid=${API_KEY}`;
  getData(URL)
    .then((res) => {
      postData('/data', {
        city: res.name,
        temp: res.main.temp,
        description: res.weather[0].main,
        text: text,
        date: new Date().toISOString(),
        icon: res.weather[0].icon,
      });
    })
    .then((res) => updateUI(res))
    .catch((err) => console.log('second'));
}

//  console.log(res.name, res.main.temp, res.weather[0].main)
