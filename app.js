// Model
var Cat = function(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.counter = 0;
    this.catLinkID = this.name + 'Link';
    this.imageID = this.name + 'Image';
    this.counterId = this.name + "Counter";
}

// Create cat objects
// Photo by Miguel Angel Ruíz Sánchez on Unsplash
var fluffy = new Cat('fluffy', 'images/cat.jpg');
// Photo by 西爾維亞 on Unsplash
var ginger = new Cat('ginger', 'images/ginger.jpg');

/* ======= Model ======= */

var model = {
    cats: [fluffy, ginger]
};

/* ======= Octopus ======= */

var octopus = {
    getCats: function() {
        return model.cats;
    },
    capitalizeFirstLetter: function(cat) {
        var lowercaseString = cat.name.slice(1);
        var firstLetter = cat.name.charAt(0).toUpperCase();
        return cat.title = firstLetter + lowercaseString;
    },
    incrementCounter: function(cat) {
        cat.counter++;
    },
    init: function() {
        catListView.init();
        catProfileView.init();
    }
}

/* ======= Render ======= */
//Render Cat Name
//Render Cat Profile and Click Counter
//TODO: 0ctopus function is repeated...how to fix?

var catListView = {
    init: function() {
        this.catLinks = document.getElementById('cat-list');
        this.cats = octopus.getCats();
        this.renderList();
        this.renderProfileOnClick();
    },
    renderList: function() {
        var cats, catListElem, catLink;
        //get cats
        cats = octopus.getCats();
        //create list item for each cat
        cats.forEach(function(cat) {
            octopus.capitalizeFirstLetter(cat);
            catListElem = document.createElement('li');
            catLink = document.createElement('a');
            catLink.href = '';
            catLink.id = cat.catLinkID;
            catLink.className = 'profile-link';
            catLink.textContent = cat.title;
            catListElem.appendChild(catLink);
            this.catLinks.appendChild(catListElem);
        }, catListView)

    },
    renderProfileOnClick: function() {
        var cats = octopus.getCats();
        this.catLinks.addEventListener('click', function(e) {
            for (var i = 0; i < cats.length; i++) {
                cat = cats[i];
                if (cat.catLinkID === e.target.id) {
                    catProfileView.clearProfile();
                    catProfileView.renderTitle();
                    catProfileView.renderImage();
                    catProfileView.renderClicks();
                }
            }
            e.preventDefault();
        })
    }

};


var catProfileView = {
    init: function() {
        this.catBox = document.getElementById('cat-box');
        this.incrementCounterOnClick();
    },
    clearProfile: function() {
        this.catBox.innerHTML = '';
    },
    renderTitle: function() {
        octopus.capitalizeFirstLetter(cat);
        var catTitle = document.createElement('h2');
        catTitle.className = 'title';
        catTitle.textContent = 'Meet ' + cat.title;
        this.catBox.append(catTitle);
    },
    renderImage: function() {
        var catImage = document.createElement('img');
        catImage.setAttribute('alt', 'cat');
        catImage.className = 'cat';
        catImage.id = cat.imageID;
        catImage.src = cat.sprite;
        this.catBox.appendChild(catImage);
    },
    renderClicks: function() {
        var catCounter = document.createElement('p');
        catCounter.className = 'tally';
        catCounter.textContent = 'Clicks: ';
        var counterDataElem = document.createElement('span');
        counterDataElem.id = cat.counterId;
        counterDataElem.textContent = cat.counter;
        catCounter.appendChild(counterDataElem);
        this.catBox.appendChild(catCounter);
    },
    incrementCounterOnClick: function() {
        var cats = octopus.getCats();
        this.catBox.addEventListener('click', function(e) {
            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                if (cat.imageID === e.target.id) {
                    octopus.incrementCounter(cat);
                    document.getElementById(cat.counterId).textContent = cat.counter;
                }
            }
            e.preventDefault();
        })
    }
};

octopus.init();
