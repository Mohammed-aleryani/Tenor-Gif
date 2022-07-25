//My key=AIzaSyCELzY_JbYTvWb48Be7r6hIm6LpWUdCXaI

let holder = document.querySelector("#holder")

document.querySelector("#button-addon2").addEventListener("click", myFunction);




function myFunction() {
    let word = document.getElementById("inp").value;
    if (word != '') {

        holder.innerHTML = ''
        grab_data(word)
    }


}


function httpGetAsync(theUrl, callback) {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}


// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext) {
    // Parse the JSON response
    var response_objects = JSON.parse(responsetext);

    results = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (gif)


    for (let i = 0; i < 8; i++) {

        var img = document.createElement('img');
        img.setAttribute('class', 'g-col-6 m-3 ')
        img.style.width = '20%'
        img.src = results[i]["media_formats"]["nanogif"]["url"]
        holder.appendChild(img);
    }


    return;

}



function grab_data(wor) {
    // set the apikey and limit
    var apikey = "AIzaSyCELzY_JbYTvWb48Be7r6hIm6LpWUdCXaI";
    var clientkey = "my_test_app";
    var lmt = 8;
    // test search term
    var search_term = wor;
    // using default locale of en_US
    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
        apikey + "&client_key=" + clientkey + "&limit=" + lmt;

    httpGetAsync(search_url, tenorCallback_search);
    // data will be loaded by each call's callback
    return;
}

