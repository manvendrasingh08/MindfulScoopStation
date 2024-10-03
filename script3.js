const API_key = "7a123138918a20aae0054245f3c02212";
const URL = "https://gnews.io/api/v4/search?q=";

window.addEventListener('load', () => fetchnews("Share Market"));

async function fetchnews(input) {
    const response = await fetch(`${URL}${input}&lang=en&country=us&category=general&apikey=${API_key}`);
    const data = await response.json();
    
    
    if (data.articles && data.articles.length > 0) {
        console.log(data);
        bindData(data.articles); // Call the function to bind the articles data
    } else {
        console.log('No news articles found for this search.');
    }
}

// Function to bind articles data to the DOM
function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    // Clear previous articles
    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.image) return; // Skip articles without images

        const cardClone = newsCardTemplate.content.cloneNode(true); // Deep clone the template
        fillDataInCard(cardClone, article);

        cardContainer.appendChild(cardClone);
    });
}

// Function to fill data in each card
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source');
    const newsContent = cardClone.querySelector('#news-content');

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsContent.innerHTML = article.description;

    // Convert the publication date to a human-readable format
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSrc.innerHTML = `${article.source.name} || ${date}`;

    // Open the article in a new tab when the card is clicked
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

// Function to search for news based on navigation items or search bar input
function navItemsSearch(id) {
    fetchnews(id);
}

// Search bar functionality
const searchText = document.getElementById("searchbar-text");
const searchbtn = document.getElementById("searchbtn");

searchbtn.addEventListener('click', () => {
    const searchInput = searchText.value;
    if (!searchInput) return;
    fetchnews(searchInput);
});
