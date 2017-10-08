
const searchButton = document.getElementById('searchButton');
const resultsList = document.getElementById('results');
const content = document.getElementById('content');
const searchName = document.getElementById('searchString');
const searchTitle = document.getElementById('contentTitle');
const nav = document.getElementById('navigation');
const menu =  nav.getElementsByTagName('ul')[0];
const header = document.getElementsByTagName('header')[0];

console.log(menu);


//Hide the content until the user searches
content.setAttribute('class', 'hidden');

//Event listener for page load, to check if localy stored data is availaible
window.addEventListener('load', () => {
    if(localStorage.getItem('userData')){
        let localData = localStorage.getItem('userData');
        content.removeAttribute('class');
        searchTitle.innerHTML = 'Last Search';
        processData(JSON.parse(localData));
    }
});

//Enable Enter key to submit form.
searchName.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        searchButton.click();
        event.preventDefault();
    }
});

//Event listeners for submitting the form, clearing the input field and the content, if present.
nav.addEventListener('click', openNav);
searchButton.addEventListener('click', clearContent);
searchButton.addEventListener('click', getMarvelData);
searchName.addEventListener('click', clearInputField);


function getMarvelData() {

    //Get value of text input 
    searchTitle.innerHTML = searchName.value;

    //show the content;
    content.removeAttribute('class');

    //Marvel API keys, time stamp, and Endpoint
    const publKey = '174f830ad07308789d121895fea7f314';
    const endPoint = 'https://gateway.marvel.com/v1/public/';

    //Create URL for searching MARVEL API  
    const url = endPoint + 'comics?format=comic&title=' + searchName.value + '&limit=21&apikey=' + publKey;

    console.log(url);

    //Create Fetch request
    fetch(url).then( (response) => {
        return response.json();
    }).then(storeLocal).then(processData).catch( (error) => {
        console.log(error);
        let notFoundText = document.createTextNode("Marvel API response error");
        let liNode = document.createElement('li');
        liNode.appendChild(notFoundText);
        resultsList.appendChild(liNode);
    });

}

//store search locally.
function storeLocal(data){
    localStorage.setItem('userData', JSON.stringify(data));
    return data;
}

function processData(data) {

    //Parse data
    let comicData = data;

    //Store data locally.

    console.log("recieved data");

    //Do something with the data
    let imagePath = "";
    let imageExtension = "";
    let comicLink = "";
    let comicTitle = "";
    let resultsArray = comicData.data.results;

    if (resultsArray.length > 0) {

        for (let i = 0; i < resultsArray.length; i++) {

            //Get information from API results
            imagePath = resultsArray[i].thumbnail.path;
            imageExtension = resultsArray[i].thumbnail.extension;
            comicLink = resultsArray[i].urls[0].url;
            comicTitle = resultsArray[i].title;

            //Generate child nodes of the results list
            let liNode = document.createElement('li');
            let aNodeImg = document.createElement('a');
            let aNodeTxt = document.createElement('a');
            let imgNode = document.createElement('img');
            let textNode = document.createTextNode(comicTitle);

            //Add href and target attributes to anchor tags
            aNodeTxt.setAttribute('href', comicLink);
            aNodeTxt.setAttribute('target', '_blank');

            aNodeImg.setAttribute('href', comicLink);
            aNodeImg.setAttribute('target', '_blank');
            aNodeImg.setAttribute('class', 'anchorImage');

            //Add src and alt attributes for each link
            imgNode.setAttribute('src', BuildImagePath(imagePath, imageExtension));
            imgNode.setAttribute('alt', comicTitle);

            // aNode.appendChild(imgNode);
            aNodeImg.appendChild(imgNode);
            aNodeTxt.appendChild(textNode);
            liNode.appendChild(aNodeImg);
            liNode.appendChild(aNodeTxt);
            resultsList.appendChild(liNode);

        }
    } else {
        //populate content with an error notification that the comic could not be found.
        let notFoundText = document.createTextNode("no comics found");
        let liNode = document.createElement('li');

        liNode.appendChild(notFoundText);
        resultsList.appendChild(liNode);
    }


};


//Build the image path using the path and extension.
function BuildImagePath(path, ext) {

    let fullImagePath = path + '/portrait_xlarge.' + ext;
    return fullImagePath;

}

//Clear the input field.
function clearInputField() {
    searchName.value = '';
}

//clears the current content of the page.
function clearContent() {
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
}

function openNav(){
    window.addEventListener('resize', function(){
        if(window.innerWidth > 740 && menu.hasAttribute('class')){
            menu.removeAttribute('class');
            header.removeAttribute('class');
        }
    });

    if(window.innerWidth <= 760 && !menu.hasAttribute('class')) {
        menu.setAttribute('class', 'openMenu');
        header.setAttribute('class', 'headerOpenMenu');

    }else if(window.innerWidth <= 760 && menu.hasAttribute('class')) {
        menu.removeAttribute('class');
        header.removeAttribute('class');

    }

}









