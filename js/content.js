// Instantiate new instance of XHR object
var request = new XMLHttpRequest();
console.log('created XMLHttpRequest variable');

var searchButton = document.getElementById('searchButton');
var resultsList = document.getElementById('results');
//Clear out existing example html
resultsList.innerHTML = '';

searchButton.addEventListener('click', GetMarvelData);

function GetMarvelData() {

    //Get value of text input 
    var searchName = document.getElementById('searchString').value;
    var searchTitle = document.getElementById('contentTitle');
    searchTitle.innerHTML = searchName;

    //Marvel API keys, time stamp, and Endpoint
    var privKey = 'ef1acf3513907eb6db0ef8e9fd7e80517875d1c2';
    var publKey = '174f830ad07308789d121895fea7f314';
    var ts = new Date().getTime();
    var endPoint = 'https://gateway.marvel.com/v1/public/';

    //Create URL for searching MARVEL API  
    var url = endPoint + 'comics?format=comic&title=' + searchName + '&limit=20&apikey=' + publKey;
    console.log(url);

    //Open request, ASYNC
    request.open('GET', url, true);
    console.log('opened request');

    //Listen for onload event
    request.onload = function () {
        //Check for success status codes
        if (request.status >= 200 && request.status < 400) {
            console.log("response succeeded");

            //Parse data 
            var comicData = JSON.parse(request.responseText);
            console.log("recieved data");

            //Do something with the data
            //var imageTag = document.querySelectorAll('img');


            var imagePath = "";
            var imageExtension = "";
            var comicLink = "";
            var comicTitle = "";
            var resultsArray = comicData.data.results;
            //alert(resultsArray.length);

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
                resultsList.getElementsByTagName('li')[i].getElementsByTagName('img')[0].setAttribute('src', BuilImagePath(imagePath, imageExtension));

            }


        } else {
            //Catch response errors
            console.log('response error', request);
        }
    };

    //Listen for connection errors
    request.onerror = function () {
        //Code for connection errors
        console.log('connection errors');
    };

    //Send Request
    request.send();
}

function BuilImagePath(path, ext) {

    var fullImagePath = path + '/portrait_xlarge.' + ext;
    return fullImagePath;

}
