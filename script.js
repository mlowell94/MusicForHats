(function () {  // declaration of an anonymous function
    const gallery = {   // create an object the builds the gallery

        hover : false,

        init : function(){  // creates gallery functionality and inserts initial content on page load
            this.cacheDom();
            this.bindEvents();
            this.changeCurrent(this.artistList[0])
            this.galleryScroll();
            console.log('Code written by Micheal Lowell (@_yad0n)')
        },

        cacheDom : function() {
            this.headline = document.querySelector('.headline'); // selects the headline div
            this.artistList = document.querySelectorAll('.artist'); // selects all DOM elements with class .artist
            this.header = this.headline.querySelector('h1'); // selects the h1
            this.header.textContent = this.artistList[0].nextElementSibling.textContent; // sets the initial header text to be the first artist in the node list
            this.blurb = this.headline.querySelector('p'); // selects the blurb in the headliner
        },

        bindEvents : function() {
            for(let i = 0; i < this.artistList.length; i++)  { // For every element in the nodelist...
                this.artistList[i].addEventListener('mouseover', function(e) {  // Add a mouse over event listener...
                    gallery.changeCurrent(gallery.artistList[i]);   // Change the current focus of the gallery to be the hovered element.
                 })
            };

            this.headline.addEventListener('mouseover', function(e) {
                gallery.hover = true;
                clearInterval(gallery.interval);
                gallery.interval = null;
                
            });

            this.headline.addEventListener('mouseout', function(e) {
                gallery.galleryScroll();
            });
        },

        changeCurrent : function(artist){  
                this.headline.style.backgroundImage = "url('" + artist.src + "')"; // Change the headline background to the image of the artist currently hovered
                this.header.textContent = artist.nextElementSibling.textContent; // Update the header to reflect the artist name

                let temp = Number(artist.id);

                switch(temp){
                    case (0):
                        gallery.blurb.textContent = "Indie rock \n Columbia, South Carolina.";
                        gallery.headline.id = 0;
                        break;
                    case (1):
                        gallery.blurb.textContent = "Indie pop-rock \n Columbia, South Carolina";
                        gallery.headline.id = 1;
                        break;
                    case (2):
                        gallery.blurb.textContent = "Desert punk from \n Detroit.";
                        gallery.headline.id = 2;
                        break;
                    case (3):
                        gallery.blurb.textContent = "Indie rock from \n Columbia, South Carolina";
                        gallery.headline.id = 3;
                        break;
                    case (4):
                        gallery.blurb.textContent = "Chungcore from \n California";
                        gallery.headline.id = 4;
                        break;
                    default: 
                        console.log('An error has occured in the changeCurrent function and you should talk to Micheal');
                        break;
                }
                
        },

        galleryScroll : function() {
            gallery.counter = Number(gallery.headline.id);
            gallery.interval = setInterval(function() { 
                gallery.changeCurrent(gallery.artistList[gallery.counter])
                gallery.counter += 1;
                if(gallery.counter == 5) {
                    gallery.counter = 0;
                }
             }, 5000);
            return gallery.interval;
        }


    }

    const info = {

        init : function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom : function() {
            this.aboutText = document.querySelector('.about-text');
            this.nuclearText = document.querySelector('.nuclear-studios-text');
        },

        scrollAppear : function() {
            //The below variables must be overwritten each time a scroll event is called
            this.aboutPos = info.aboutText.getBoundingClientRect().top;
            this.nuclearPos = info.nuclearText.getBoundingClientRect().top;
            this.screenPos = window.innerHeight;
            if(this.aboutPos < this.screenPos) {
                info.aboutText.classList.add('about-appear');
            }
            if(this.nuclearPos < this.screenPos) {
                info.nuclearText.classList.add('nuclear-studios-appear')
            }
        },

        bindEvents : function() {
            window.addEventListener('scroll', this.scrollAppear);
        }
    }

    gallery.init(); // initiate gallery
    info.init(); // initiate info
})();
