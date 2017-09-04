

// Instantiate new instance of XHR object
// var request = new XMLHttpRequest();
// console.log('created XMLHttpRequest variable');

var searchButton = document.getElementById('searchButton');
var resultsList = document.getElementById('results');
var content = document.getElementById('content');
var searchName = document.getElementById('searchString');
var searchTitle = document.getElementById('contentTitle');

//Hide the content until the user searches
content.setAttribute('class','hidden');

//Clear out existing example html
resultsList.innerHTML = '';

searchButton.addEventListener('click', GetMarvelData);
searchName.addEventListener('click', ClearInputField);


function GetMarvelData() {

    //Get value of text input 
    searchTitle.innerHTML = searchName.value;

    //show the content;
    content.removeAttribute('class');


    //Marvel API keys, time stamp, and Endpoint
    var publKey = '174f830ad07308789d121895fea7f314';
    var endPoint = 'https://gateway.marvel.com/v1/public/';

    //Create URL for searching MARVEL API  
    var url = endPoint + 'comics?format=comic&title=' + searchName.value + '&limit=21&apikey=' + publKey;

    console.log(url);

    //Create Fetch request
    var promise = fetch(url);
    console.log(promise);

    promise.then(function(response) {
        return response.json();
    }).then(processData).catch(function(error){console.log(error);});


    function processData (data) {

        //Parse data
        var comicData = data;
        console.log("recieved data");

        //Do something with the data
        var imagePath = "";
        var imageExtension = "";
        var comicLink = "";
        var comicTitle = "";
        var resultsArray = comicData.data.results;

        for (var i = 0; i < resultsArray.length; i++) {

            //Get information from API results
            imagePath = resultsArray[i].thumbnail.path;
            imageExtension = resultsArray[i].thumbnail.extension;
            comicLink = resultsArray[i].urls[0].url;
            comicTitle = resultsArray[i].title;

            //Generate child nodes of the results list
            var liNode = document.createElement('li');

            var aNode = document.createElement('a');

            var imgNode = document.createElement('img');

            var textNode = document.createTextNode(comicTitle);

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

    };

}

function BuildImagePath(path, ext) {

    var fullImagePath = path + '/portrait_xlarge.' + ext;
    return fullImagePath;

};

function ClearInputField(){
    searchName.value = '';
};
