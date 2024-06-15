const API_key = "29dac96a29d54e81bc5ebdff25e09349";
const URL = "https://newsapi.org/v2/everything?q="

window.addEventListener('load' , () => fetchnews("Indian Election"));

async function fetchnews(input){
    const response = await fetch(`${URL}${input}&apiKey=${API_key}`);
    const data = await response.json();
    console.log(data);
    bindData(data.articles);   // creating a function to bind the articles and we did articles as array of news from the server is in the "articles" ()
}

// here will make as many clones of the template as the articles we fetched from the server and bind the data present in articles section fetched from server using api
 function bindData(articles){ 
      const cardContainer = document.getElementById('card-container');
      const newsCardTemplate = document.getElementById('template-news-card');

      cardContainer.innerHTML=''; 
       // every time a new input is searched it will delete the cards of the previous searched element otherwise if not done the 100 news card template will placed below the previous one which is not desired & once emptied it then well did the for loop

       articles.forEach(article=> {
        if(!article.urlToImage) return;  // if image related to a article is not there we do not show the news
        const cardClone = newsCardTemplate.content.cloneNode(true);
        // here ".cloneNode(true)" means we are doing deep cloning i.e clone alll the divs in the newsCardTemplate not just one

        fillDataInCard(cardClone , article);
         
        cardContainer.appendChild(cardClone);
       });

       function fillDataInCard(cardClone , article){
        const newsImg = cardClone.querySelector('#news-img');
        const newsTitle = cardClone.querySelector('#news-title');
        const newsSrc = cardClone.querySelector('#news-source'); 
        const newsContent = cardClone.querySelector('#news-content');
        
        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsContent.innerHTML = article.description;

        const date  = new Date(article.publishedAt.toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
        }));  //as the time in api is not humnan readable 'Date' is libraru used to convert time in readable form
        newsSrc.innerHTML =`${article.source.name}  ||  ${date}`;

        cardClone.firstElementChild.addEventListener('click' , () => {
            window.open(article.url, "_blank");
         });
       } 
    }

    function navItemsSearch(id){
        fetchnews(id);
    }

    const searchText = document.getElementById("searchbar-text");
    const searchbtn = document.getElementById("searchbtn");

    searchbtn.addEventListener('click' ,() => {
        const searchInput = searchText.value;
        if(!searchInput) return;
        fetchnews(searchInput);
    });
  