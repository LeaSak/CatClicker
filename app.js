//"use strict";
// Model
var Cat = function(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.counter = 0;
    this.catLinkID = this.name + 'Link';
    this.imageID = this.name + 'Image';
    this.counterId = this.name + "Counter";
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
    //currentCat: null,
    cats: [fluffy, ginger]
};

/* ======= Octopus ======= */

var octopus = {
    getCats: function() {
        return model.cats;
    },
    // getCurrentCat: function(){
    //     return model.currentCat;
    // },
    // setCurrentCat: function(cat){
    //     model.currentCat = cat;
    // },
    capitalizeFirstLetter: function(cat) {
        var lowercaseString = cat.name.slice(1);
        var firstLetter = cat.name.charAt(0).toUpperCase();
        cat.title = firstLetter + lowercaseString;
        return cat.title;
    },
    incrementCounter: function(cat) {
        cat.counter++;
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
                    //octopus.setCurrentCat(cat);
                    catProfileView.renderTitle(cat);
                    catProfileView.renderImage(cat);
                    catProfileView.renderClicks(cat);
                    catAdminView.renderAdminButton(cat);
                    //console.log(cat.name + " inside Loop ");
                }
            }
            //console.log(model.currentCat);
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

            renderTitle: function(cat) {
                octopus.capitalizeFirstLetter(cat);
                this.catTitle.textContent = 'Meet ' + cat.title;
            },
            renderImage: function(cat) {
                this.catImage.id = cat.imageID;
                this.catImage.src = cat.sprite;
            },
            renderClicks: function(cat) {
                this.catCounter.id = cat.counterId;
                this.catCounter.textContent = "Clicks: " + cat.counter;
            },
            // Update Total Clicks for cat if ID matches
            incrementCounterOnClick: function() {
                this.catBox.addEventListener('click', function(e) {
                    for (var i = 0; i < catListView.cats.length; i++) {
                        var cat = catListView.cats[i];
                        if (cat.imageID === e.target.id) {
                            octopus.incrementCounter(cat);
                             document.getElementById(cat.counterId).textContent = "Clicks: " + cat.counter;
                             catAdminView.catClicks.value = cat.counter;
                        }
                    }
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
                this.catAdminBtn.id = cat.catBtnId;
                this.catAdminBtn.style.display= 'block';
            },
            hideCatForm: function(){
                this.catForm.style.display = 'none';
            },
            showCatForm: function(e){
                for (var i = 0; i < catListView.cats.length; i++){
                    var cat = catListView.cats[i];
                    if(cat.catBtnId === e.target.id){
                        octopus.capitalizeFirstLetter(cat);
                        this.catNameFormElem.value = cat.title;
                        this.catURLFormElem.value = cat.sprite;
                        this.catClicks.value = cat.counter;
                        this.saveBtn.id = cat.saveBtnId;
                        this.catForm.style.display = 'block';
                    }
                }
                e.preventDefault();
            },
            updateProfile: function(e){
                for (var i = 0; i < catListView.cats.length; i++){
                    var cat = catListView.cats[i];
                    if(cat.saveBtnId === e.target.id){
                        //get form values
                        cat.name = this.catNameFormElem.value.toLowerCase();
                        cat.sprite = this.catURLFormElem.value;
                        cat.counter = this.catClicks.value;
                        // redefine cat properties
                        cat.catLinkID = cat.name + 'Link';
                        cat.imageID = cat.name + 'Image';
                        cat.counterId = cat.name + "Counter";
                        cat.catBtnId = cat.name + "Btn";
                        cat.saveBtnId = cat.name + "SaveBtn";
                        // update cat links
                        catListView.renderList();
                        // update cat title
                        catProfileView.catTitle.textContent = 'Meet ' + cat.title;
                        // update cat image and image id.
                        // catProfileView.renderImage();
                        catProfileView.catImage.id = cat.imageID;
                        catProfileView.catImage.src = cat.sprite;
                        //update counter and counter id
                        catProfileView.catCounter.id = cat.counterId;
                        document.getElementById(cat.counterId).textContent = "Clicks: " + cat.counter;
                        // update admin buttons and their ids.
                        this.saveBtn.id = cat.saveBtnId;
                        this.catAdminBtn.id = cat.catBtnId;
                        this.hideCatForm();
                    }
                }
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
