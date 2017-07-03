function getMarvelUrl() {
    var crypto = require('crypto');

    //Marvel API keys, time stamp, and Endpoint
    var privKey = 'ef1acf3513907eb6db0ef8e9fd7e80517875d1c2';
    var publKey = '174f830ad07308789d121895fea7f314';
    var ts = new Date().getTime();
    var endPoint = 'http://gateway.marvel.com/v1/public/';

    //Create string combination to generate hash code
    var dataKey = ts + privKey + publKey;

    //Use CryptoJS module to create hashcode
    var hash = crypto.createHash('md5').update(dataKey).digest('hex');
    console.log(hash);

    //Create URL for searching MARVEL API
    var characterID = '1009718';
    var url = endPoint + 'characters' + '/' + characterID + '?ts=' + ts + '&apikey=' + publKey + '&hash=' + hash;
//    var url = endPoint + 'characters' + '/' + characterID + '?' + '&apikey=' + publKey ;
    console.log(url);
}

