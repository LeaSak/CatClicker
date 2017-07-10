var catLinks = document.getElementById('cat-list');
var catBox = document.getElementById('cat-box');

var Cat = function(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.counter = 0;
}

Cat.prototype.renderName = function() {
    this.linkID = this.name + "Link";
    this.capitalizeFirstLetter();
    this.catLink = document.createElement('li');
    this.catLink.innerHTML = '<a href="" class="profile-link" id="' + this.linkID + '">' + this.title + '</a>';
    catLinks.appendChild(this.catLink);
}

Cat.prototype.capitalizeFirstLetter = function() {
    var lowercaseString = this.name.slice(1);
    var firstLetter = this.name.charAt(0).toUpperCase();
    return this.title = firstLetter + lowercaseString;
}

Cat.prototype.renderTitle = function() {
    this.capitalizeFirstLetter();
    var catTitle = document.createElement('h2');
    catTitle.className = 'title';
    catTitle.innerHTML = 'Meet ' + this.title;
    catBox.appendChild(catTitle);
}

Cat.prototype.renderImage = function() {
    this.imageID = this.name + 'Image';
    var catImage = document.createElement('img');
    catImage.setAttribute('alt', 'cat');
    catImage.className = 'cat';
    catImage.id = this.imageID;
    catImage.src = this.sprite;
    catBox.appendChild(catImage);
}

Cat.prototype.renderClicks = function() {
    this.counterId = this.name + "Counter";
    var catCounter = document.createElement('p');
    catCounter.className = 'tally';
    catCounter.innerHTML = 'Clicks: ' + '<span id="' + this.counterId + '">' + this.counter + '</span>'
    catBox.appendChild(catCounter);
}

Cat.prototype.renderCatProfile = function() {
    this.renderTitle();
    this.renderImage();
    this.renderClicks();
}

Cat.prototype.updateClicks = function() {
    this.counter++;
    this.counterData = document.getElementById(this.counterId);
    this.counterData.innerHTML = this.counter;
}

// Create cat objects
// Photo by Miguel Angel Ruíz Sánchez on Unsplash
var fluffy = new Cat('fluffy', 'images/cat.jpg');
// Photo by 西爾維亞 on Unsplash
var ginger = new Cat('ginger', 'images/ginger.jpg');

// Create cat array
var allCats = [fluffy, ginger];
//var selectedCat = 0;



for (var i = 0; i < allCats.length; i++) {
    var cat = allCats[i];
    cat.renderName();
    // cat.catLink.addEventListener('click', (function(catCopy, x){
    //     return function(e){
    //         e.preventDefault();
    //         catBox.innerHTML = '';
    //         catCopy.renderCatProfile();
    //         selectedCat = x;
    //         console.log(allCats[x].name);
    //     };
    // })(cat,i));
    // catBox.addEventListener('click', function(e){
    //     //allCats[selectedCat].updateClicks();
    //     e.preventDefault();
    //     allCats[selectedCat].counter++;
    //     console.log(allCats[selectedCat].counter);
    // })
}

// event.target = 'a'
// event.currentTarget = catLinks/ the ul
catLinks.addEventListener('click', function(e) {
    console.log(e.target.id);
    //show profile of cat with the id matching the target
    allCats.forEach(function(cat){
        if(cat.linkID === e.target.id){
            catBox.innerHTML = '';
            cat.renderCatProfile();
        }
    })
    e.preventDefault();
});

catBox.addEventListener('click', function(e){
    if(e.target.nodeName === 'IMG'){
        allCats.forEach(function(cat){
        if(cat.imageID === e.target.id){
            cat.updateClicks();
        }
    })

    }
    e.preventDefault();
})

