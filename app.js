//"use strict";
// Model
var Cat = function(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.counter = 0;
    this.catLinkID = this.name + 'Link';
    this.catBtnId = this.name + "Btn";
    this.saveBtnId = this.name + "SaveBtn";
};

// Create cat objects
// Photo by Miguel Angel Ruíz Sánchez on Unsplash
var fluffy = new Cat('fluffy', 'images/cat.jpg');
// Photo by 西爾維亞 on Unsplash
var ginger = new Cat('ginger', 'images/ginger.jpg');

/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [fluffy, ginger]
};

/* ======= Octopus ======= */

var octopus = {
    getCats: function() {
        return model.cats;
    },
    getCurrentCat: function(){
        return model.currentCat;
    },
    setCurrentCat: function(cat){
        model.currentCat = cat;
    },
    capitalizeFirstLetter: function(cat) {
        var lowercaseString = cat.name.slice(1);
        var firstLetter = cat.name.charAt(0).toUpperCase();
        cat.title = firstLetter + lowercaseString;
        return cat.title;
    },
    incrementCounter: function() {
        model.currentCat.counter++;
        catProfileView.render(model.currentCat);
    },
    init: function() {
        catListView.init();
        catProfileView.init();
        catAdminView.init();
    }
};

/* ======= Render ======= */
//Render Cat Name
var catListView = {
        init: function() {
            this.catLinks = document.getElementById('cat-list');
            this.cats = octopus.getCats();
            this.renderList();
            this.renderProfileOnClick();
        },
        renderList: function() {
            var catListElem, catLink;
            this.catLinks.innerHTML = '';
            //create list item for each cat
            this.cats.forEach(function(cat) {
                octopus.capitalizeFirstLetter(cat);
                catListElem = document.createElement('li');
                catLink = document.createElement('a');
                catLink.href = '';
                catLink.id = cat.catLinkID;
                catLink.className = 'profile-link';
                catLink.textContent = cat.title;
                catListElem.appendChild(catLink);
                this.catLinks.appendChild(catListElem);
            }, catListView);

        },

        renderProfileOnClick: function() {
            this.catLinks.addEventListener('click', this.showProfile.bind(this), false);
        },
        showProfile: function(e) {
            for (var i = 0; i < this.cats.length; i++) {
                var cat = this.cats[i];
                if (cat.catLinkID === e.target.id) {
                    octopus.setCurrentCat(cat);
                    catProfileView.render(cat);
                    catAdminView.renderAdminButton(cat);
                }
            }
            catAdminView.hideCatForm();
            e.preventDefault();
            }
        };

//Render Cat Profile and Click Counter
        var catProfileView = {
            init: function() {
                this.catBox = document.getElementById('cat-box');
                this.catTitle = document.getElementById('cat-intro');
                this.catImage = document.getElementById('cat-image');
                this.catCounter = document.getElementById('cat-counter');
                this.incrementCounterOnClick();
            },
            /*
             * Render Profile Functions
             * Title, Image and Total Clicks
             */
             render: function(cat){
                octopus.capitalizeFirstLetter(cat);
                this.catTitle.textContent = 'Meet ' + cat.title;
                this.catImage.src = cat.sprite;
                this.catCounter.textContent = "Clicks: " + cat.counter;
             },
            // Update Total Clicks for cat if ID matches
            incrementCounterOnClick: function() {
                this.catBox.addEventListener('click', function(e) {
                    octopus.getCurrentCat();
                    octopus.incrementCounter();
                    e.preventDefault();
                });
            }
        };

//Render Cat Admin Section
        var catAdminView = {
            init: function(){
                this.catAdminBox = document.getElementById('admin-box');
                this.catAdminBtn = document.getElementById('cat-btn');
                this.catForm = document.getElementById('cat-form');
                this.catNameFormElem = document.getElementById('cat-name');
                this.catURLFormElem = document.getElementById('cat-url');
                this.catClicks = document.getElementById('cat-clicks');
                this.cancelBtn = document.getElementById('cancel-btn');
                this.saveBtn = document.getElementById('save-btn');
                this.renderCatFormOnClick();
                this.saveForm();
                this.cancel();
            },
            renderAdminButton: function(cat){
                this.catAdminBtn.style.display= 'block';
            },
            hideCatForm: function(){
                this.catForm.style.display = 'none';
            },
            showCatForm: function(e){
                this.catNameFormElem.value = model.currentCat.title;
                this.catURLFormElem.value = model.currentCat.sprite;
                this.catClicks.value = model.currentCat.counter;
                this.catForm.style.display = 'block';
                e.preventDefault();
            },
            updateProfile: function(e){
                        //set cat properties to form values
                        model.currentCat.name = this.catNameFormElem.value.toLowerCase();
                        model.currentCat.sprite = this.catURLFormElem.value;
                        model.currentCat.counter = this.catClicks.value;
                        model.currentCat.catLinkID = model.currentCat.name + 'Link';
                        catListView.renderList();
                        catProfileView.render(model.currentCat);
                        this.hideCatForm();

                e.preventDefault();
            },

            // Form Event Listeners
            renderCatFormOnClick: function(){
                this.catAdminBtn.addEventListener('click', this.showCatForm.bind(this), false);
            },
            saveForm: function(){
                this.saveBtn.addEventListener('click', this.updateProfile.bind(this), false);
            },
            cancel: function(){
                this.cancelBtn.addEventListener('click', this.hideCatForm.bind(this), false);
            }
        };

        octopus.init();
