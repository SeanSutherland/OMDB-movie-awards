const OMDB_API_KEY = "dfc32597"
const OMDB_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&s="
const OMDB_I_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&i="

function updateSearch() {

    let input = document.getElementById('searchBar').value

    input.replace(" ", "+")

    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var myArr = JSON.parse(this.responseText)
            if (myArr.Response == "True") {
                updateList(myArr)
            } else {
                document.getElementById("row1").innerHTML = ""
                document.getElementById("row2").innerHTML = ""
            }
        }
    };
    req.open("GET", OMDB_URL+input, true);
    req.send();

}

var originalUrl = (location.href.toString()).split("?")[0]

var readParameters = function()
{
    let currentURL = (new URL(location))
    document.getElementById("link").href = currentURL.toString();
    let params = currentURL.searchParams;
    
    let id = params.get("id0")
    let i = 0;

    while (id != null) {

        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            
                var myArr = JSON.parse(this.responseText)
                if (myArr.Response == "True") {
                    addNominee(myArr)
                }
            }

        };
        req.open("GET", OMDB_I_URL + id.toString(), true);
        req.send();

        id = params.get("id" + (++i))
    }

}

function addNominee(res) {
    var img = new Image()
    img.src = res.Poster
    if (res.Poster == "N/A") img.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"

    var title = document.createElement("h3");
    title.innerHTML = res.Title

    var li = document.createElement("th");

    li.appendChild(title)
    li.appendChild(img)
    
    li.id = res.imdbID
    

    li.children[1].style.height = "200px"
    li.onclick = function() {this.remove()
    updateLink()};
    document.getElementById("nominations").appendChild(li)
    updateLink();
}

function updateList(omdb_response) {
    var res = omdb_response.Search
    var r1 = document.getElementById("row1")
    var r2 = document.getElementById("row2")
    r1.innerHTML=""
    r2.innerHTML=""
    for (var i = 0 ; i < res.length ; i++) {
        var img = new Image()
        img.src = res[i].Poster
        if (res[i].Poster == "N/A") img.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
    
        var title = document.createElement("h3");
        title.innerHTML = res[i].Title

        var li = document.createElement("th");

        li.onclick = function(){
            if (document.getElementById("nominations").children.length < 5) {
                          
                var newChild = this.cloneNode(true)
                newChild.children[1].style.height = "200px"
                newChild.onclick = function() {
                    this.remove()
                    updateLink()
                };
                document.getElementById("nominations").appendChild(newChild)
                updateLink();
            }
        };

        li.appendChild(title)
        li.appendChild(img)
        li.id = res[i].imdbID

        if (i < 5) {
            r1.appendChild(li)
        } else {
            r2.appendChild(li)
        }

    }
}

function updateLink() {
    let newLink = originalUrl;
    let childs = document.getElementById("nominations").getElementsByTagName("th");

    let first = true;

    for (var i = 0 ; i < childs.length ; i++) {
        if (first) {
            newLink = newLink.concat("?id" + i + "=")
            first = false;
        } else {
            newLink = newLink.concat("&id" + i + "=")
        }
        newLink = newLink.concat(childs[i].id)
    }
    
    
    document.getElementById("link").href = newLink;

}