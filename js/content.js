
const searchButton = document.getElementById('searchButton');
const resultsList = document.getElementById('results');
const content = document.getElementById('content');
const searchName = document.getElementById('searchString');
const searchTitle = document.getElementById('contentTitle');
const navMenu = document.getElementById('navigation');

//Hide the content until the user searches
content.setAttribute('class', 'hidden');

//Event listener for page load, to check if localy stored data is availaible
window.addEventListener('load', function() {
    if(localStorage.getItem('userData')){
        let localData = localStorage.getItem('userData');
        content.removeAttribute('class');
        searchTitle.innerHTML = 'Last Search';
        processData(JSON.parse(localData));
    }
});

//Enable Enter key to submit form.
searchName.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        searchButton.click();
        event.preventDefault();
    }
});

//Event listeners for submitting the form, clearing the input field and the content, if present.
navMenu.addEventListener('click', OpenNav);

searchButton.addEventListener('click', ClearContent);
searchButton.addEventListener('click', GetMarvelData);
searchName.addEventListener('click', ClearInputField);


function GetMarvelData() {

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
    let promise = fetch(url);
    console.log(promise);
    promise.then(function (response) {
        return response.json();
    }).then(storeLocal).then(processData).catch(function (error) {
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

        for (var i = 0; i < resultsArray.length; i++) {

            //Get information from API results
            imagePath = resultsArray[i].thumbnail.path;
            imageExtension = resultsArray[i].thumbnail.extension;
            comicLink = resultsArray[i].urls[0].url;
            comicTitle = resultsArray[i].title;

            //Generate child nodes of the results list
            let liNode = document.createElement('li');
            let aNode = document.createElement('a');
            let imgNode = document.createElement('img');
            let textNode = document.createTextNode(comicTitle);

            aNode.appendChild(imgNode);
            aNode.appendChild(textNode);
            liNode.appendChild(aNode);
            resultsList.appendChild(liNode);

            //Add href and target attributes to anchor tags
            resultsList.getElementsByTagName('li')[i].getElementsByTagName('a')[0].setAttribute('href', comicLink);
            resultsList.getElementsByTagName('li')[i].getElementsByTagName('a')[0].setAttribute('target', '_blank');

            //Add src attribute for each link
            resultsList.getElementsByTagName('li')[i].getElementsByTagName('img')[0].setAttribute('src', BuildImagePath(imagePath, imageExtension));
            //Add alt attribute for each link
            resultsList.getElementsByTagName('li')[i].getElementsByTagName('img')[0].setAttribute('alt', comicTitle);

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

    var fullImagePath = path + '/portrait_xlarge.' + ext;
    return fullImagePath;

}

//Clear the input field.
function ClearInputField() {
    searchName.value = '';
}

//clears the current content of the page.
function ClearContent() {
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
}

function OpenNav(){
    if(window.innerWidth <= 760) {
        console.log('clicked nav button');
        navMenu.firstChild.className = 'open';

    }
}

// text-indent: 0;
// li {
//     width: 150px;
//     height: 100px;
//     background-color: #800020;
//     padding: 5px 5px 5px 5px;
//     border: 1px solid white;
//     text-align: left;
//     position: relative;
//     right: 100px;
//     top: 50px;
// }









