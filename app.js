// var columnLeft = document.getElementById('left');
// var columnRight = document.getElementById('right');
// var felineTarget = document.getElementById('feline');
// var totalClicks = document.getElementById('clickCounter')
// var counter = 0;

// totalClicks.innerHTML = '<p>Clicks: ' + counter + '</p>';

// felineTarget.addEventListener("click", function(){
//     //console.log("You clicked.");
//     counter ++;
//     totalClicks.innerHTML = '<p>Clicks: ' + counter + '</p>'

// }, false);

var counter = 0;
// var counterString = '<p class="tally">Clicks: %data%</p>';

var Cat = function(name, sprite, column){
    this.name = name;
    this.sprite = sprite;
    this.column = column;
    this.counter = 0;
}

Cat.prototype.renderTitle = function(){
    var lowercaseString = this.name.slice(1);
    var firstLetter = this.name.charAt(0).toUpperCase();
    this.title = firstLetter + lowercaseString;
    $(this.column).append('<h2 class="title">' + this.title + '</h2>');
}

Cat.prototype.renderImage = function(){
    $(this.column).append('<img class="cat"' +' src="' + this.sprite + '"' + ' alt="cat">');
    $("img:last").attr("id", this.name);
}

Cat.prototype.renderClicks = function(){
    this.counterId = this.name + "Counter";
    $(this.column).append('<p class="tally">Clicks: ' + '<span class="click-counter">' + this.counter + '</span></p>');
    $('.click-counter:last').attr("id", this.counterId);
}

Cat.prototype.updateClicks = function(){
    this.counter ++;
    $('#' + this.counterId).html(this.counter);
}

var fluffy = new Cat('fluffy', 'images/cat.jpg', '#left');
// Photo by 西爾維亞 on Unsplash
var ginger = new Cat('ginger', 'images/ginger.jpg', '#right');

var allCats = [fluffy, ginger];

allCats.forEach(function(cat){
    cat.renderTitle();
    cat.renderImage();
    cat.renderClicks();
});


// assign click counter to individual cat image with id of cat name
$("#fluffy").click(function(){
    fluffy.updateClicks();
})

$("#ginger").click(function(){
    ginger.updateClicks();
})