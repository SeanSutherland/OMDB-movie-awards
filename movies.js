function updateSearch() {

    let input = document.getElementById('searchBar').value


    input.replace(" ", "+")
    
    const OMDB_API_KEY = "dfc32597"
    const OMDB_URL = "http://www.omdbapi.com/?apikey=" + OMDB_API_KEY + "&s="

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

        li.onmouseover = function(){
            
        };
        li.onmouseout = function(){
            
        };
        li.onclick = function(){
            if (document.getElementById("nominations").children.length < 5) {
                          
                var newChild = this.cloneNode(true)
                newChild.children[1].style.height = "200px"
                newChild.onclick = function() {this.remove()};
                document.getElementById("nominations").appendChild(newChild)
            }
        };

        li.appendChild(title)
        li.appendChild(img)

        if (i < 5) {
            r1.appendChild(li)
        } else {
            r2.appendChild(li)
        }

    }
}