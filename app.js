const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));

// even listeners
window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search form submission
searchForm.addEventListener('submit', getInputValue);

// api key => 727054372039115
const fetchAllSuperHero = async (searchText) => {
    let url = `https://www.superheroapi.com/api.php/727054372039115/search/${searchText}`;
    try {
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success') {
            // console.log(allData);
            showSearchList(allData.results);
        }
    } catch (error) {
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if (searchForm.search.value.length > 1) {
        fetchAllSuperHero(searchForm.search.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    let searchID = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchID === singleData.id
    })
    showSuperHeroDetails(singleData)
    searchList.innerHTML = ""
})

const showSuperHeroDetails = (data) => {
    console.log(data)
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
        <img src = "${data[0].image.url}">
    `

    document.querySelector('.name').textContent = data[0].name
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>inteligência</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>força</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>velocidade</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>durabilidade</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>poder</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class="fa-solid fa-shield-halved"></i>
            <span>combate</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>nome completo</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alter-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>pseudônimos</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>local de nascimento</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>primeira aparição</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>editora</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `

    document.querySelector('.appearence').innerHTML = `
    <li>
        <span>
            <i class="fas fa-star"></i> gênero
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class="fas fa-star"></i> raça
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class="fas fa-star"></i> altura
        </span>
        <span>${data[0].appearance['height']}</span>
    </li>
    <li>
        <span>
            <i class="fas fa-star"></i> peso
        </span>
        <span>${data[0].appearance['weight']}</span>
    </li>
    <li>
        <span>
            <i class="fas fa-star"></i> cor dos olhos
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
            <i class="fas fa-star"></i> cor do cabelo
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `

    document.querySelector('.connections').innerHTML = `
    <li>
        <span>grupos/afiliações</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    <li>
        <span>relativos</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    `

}