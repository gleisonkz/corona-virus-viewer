(async () => {
  const $headerTemplate = document.querySelector("template");
  const $countryContainer = document.querySelector(".country__container");
  const $totalInfoHeader = document.querySelector(".total-info__cards");

  const response = await fetch("https://covid-api.mmediagroup.fr/v1/cases?country=Brazil");
  const responseObj = await response.json();
  const {
    All: { confirmed, deaths, recovered },
  } = responseObj;

  const states = Object.entries(responseObj)
    .filter(([key]) => key !== "All")
    .map(([key, { confirmed, deaths, recovered } = value]) => ({
      name: key,
      confirmed,
      deaths,
      recovered,
    }));

  appendHeader();
  states.forEach(appendState);

  function format(value) {
    return value
      .toString()
      .replace(/(\d{1,3})(\d{3})(\d{3})/, "$1.$2.$3")
      .replace(/(\d{1,3})(\d{3})/, "$1.$2");
  }

  function appendState({ name, confirmed, recovered, deaths }) {
    const $country = document.createElement("div");
    $country.classList.add("country");
    $country.innerHTML = `
    <div class="country">
    <h5 class="country__title">${name}</h5>
    <div class="card card--confirmed">
      <div class="card__body">
        <span class="card__title">${format(confirmed)}</span>
        <span class="card__text">CONFIRMADOS</span>
      </div>
    </div>

    <div class="card card--recovered">
      <div class="card__body">
        <span class="card__title">${format(recovered)}</span>
        <span class="card__text">RECUPERADOS</span>
      </div>
    </div>

    <div class="card card--deaths">
      <div class="card__body">
        <span class="card__title">${format(deaths)}</span>
        <span class="card__text">MORTES</span>
      </div>
    </div>
  </div>`;
    $countryContainer.appendChild($country);
  }

  function appendHeader() {
    const content = $headerTemplate.content.cloneNode(true);
    const [$confirmed, $recovered, $deaths] = content.querySelectorAll(".card .card__title");
    $confirmed.textContent = format(confirmed);
    $recovered.textContent = format(recovered);
    $deaths.textContent = format(deaths);
    $totalInfoHeader.append(content);
  }
})();
