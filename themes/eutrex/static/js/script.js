jQuery(document).ready(function($) {

    /**
     * navigation menu
     */
    ( function() {
        var container, button, menu, links, i, len, masthead;

        container = document.getElementById( 'site-navigation' );
        if ( ! container ) {
            return;
        }
        masthead = document.getElementById('masthead');

        button = container.getElementsByTagName( 'button' )[0];
        if ( 'undefined' === typeof button ) {
            return;
        }

        menu = container.getElementsByTagName( 'ul' )[0];

        // Hide menu toggle button if menu is empty and return early.
        if ( 'undefined' === typeof menu ) {
            button.style.display = 'none';
            return;
        }

        menu.setAttribute( 'aria-expanded', 'false' );
        if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
            menu.className += ' nav-menu';
        }

        button.onclick = function() {
            if ( -1 !== container.className.indexOf( 'toggled' ) ) {
                container.className = container.className.replace( ' toggled', '' );
                masthead.className = masthead.className.replace( ' mobile', '' );
                button.setAttribute( 'aria-expanded', 'false' );
                menu.setAttribute( 'aria-expanded', 'false' );
            } else {
                container.className += ' toggled';
                masthead.className += ' mobile';
                button.setAttribute( 'aria-expanded', 'true' );
                menu.setAttribute( 'aria-expanded', 'true' );
            }
        };

        // Get all the link elements within the menu.
        links    = menu.getElementsByTagName( 'a' );

        // Each time a menu link is focused or blurred, toggle focus.
        for ( i = 0, len = links.length; i < len; i++ ) {
            links[i].addEventListener( 'focus', toggleFocus, true );
            links[i].addEventListener( 'blur', toggleFocus, true );
        }

        /**
         * Sets or removes .focus class on an element.
         */
        function toggleFocus() {
            var self = this;

            // Move up through the ancestors of the current link until we hit .nav-menu.
            while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

                // On li elements toggle the class .focus.
                if ( 'li' === self.tagName.toLowerCase() ) {
                    if ( -1 !== self.className.indexOf( 'focus' ) ) {
                        self.className = self.className.replace( ' focus', '' );
                    } else {
                        self.className += ' focus';
                    }
                }

                self = self.parentElement;
            }
        }

        ( function( container ) {
            var touchStartFn, i,
                parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

            if ( 'ontouchstart' in window ) {
                touchStartFn = function( e ) {
                    var menuItem = this.parentNode, i;

                    if ( ! menuItem.classList.contains( 'focus' ) ) {
                        e.preventDefault();
                        for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
                            if ( menuItem === menuItem.parentNode.children[i] ) {
                                continue;
                            }
                            menuItem.parentNode.children[i].classList.remove( 'focus' );
                        }
                        menuItem.classList.add( 'focus' );
                    } else {
                        menuItem.classList.remove( 'focus' );
                    }
                };

                for ( i = 0; i < parentLink.length; ++i ) {
                    parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
                }
            }
        }( container ) );
    } )();


    /**
     * List styling
     */
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("country-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
             create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                 and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
             and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
         except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
     then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);


    /**
     * overlay function
     */
    /* general overlay */
    function openOverlay(id) {
        var overlay = $(id);
        var shade = $('#overlay_shade');

        shade.fadeTo(200, 0.8, function() {
            var props = {
                overlayWidth    : overlay.width(),
                scrTop          : $(window).scrollTop(),
                viewPortWidth   : $(window).width()
            };
            var leftPos = ((props.viewPortWidth - props.overlayWidth) / 2) - 30;
            overlay.css({
                display : 'block',
                opacity : 0,
                top : '-=9999',
                left : leftPos+'px'
            }).animate({
                top : props.scrTop + 80,
                opacity : 1
            }, 800, function(){
                shade.addClass('hideable');
                overlay.addClass('hideable');
            });
        });
    }
    /*close overlay*/
    function closeOverlay() {
        var overlay= $('.overlay');
        var shade = $('#overlay_shade');
        //verifica che l'animazione si completa
        if (shade.hasClass('hideable') && overlay.hasClass('hideable')) {
            overlay.animate({
                top: '-=9999',
                opacity: 0
            }, 200, function () {
                shade.fadeOut(200);
                $(this).css('display', 'none');
            });
            overlay.removeClass('hideable');
            shade.removeClass('hideable');
        }
    }
    /*uso overlay*/
    $('#overlay_shade, .overlay a.close-btn').on('click', function(e) {
        e.preventDefault();
        closeOverlay();
    });


    /**
     * map preview data
     */

    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    }


    var previewData;

    $.getJSON("https://raw.githubusercontent.com/tracking-exposed/eu19/map/data/keywords-preview.json", function(data) {
        previewData = data;
    });

    var country = $('#member').find('path');
    country.click(function() {
        var code = $(this).attr('id'),
            overlay = $('#preview-info'),
            obj = getObjects(previewData, 'lang', code),

            countryData= obj[0]['country'],
            languageData = obj[0]['language'],
            contributorsData = obj[0]['total'],
            totalKeywordsData = obj[0]['totalKeywords'],
            labelsData = obj[0]['labels'],
            formattedCountry = countryData.replace(/\s+/g, '-').toLowerCase();

        overlay.find('h3').html(countryData);
        overlay.find('b.language-data').html(languageData);
        overlay.find('b.contributors-data').html(contributorsData);
        overlay.find('b.keywords-sum').html(totalKeywordsData);
        overlay.find('ul.keywords-data').html(labelsData);
        $('a#country-link').attr('href', '/country/'+formattedCountry);

        openOverlay('#preview-info');
        console.log(obj);
    });


    /**
     * home form
     */
    var mainForm = $('#main-search');
    mainForm.submit(function(e){
        e.preventDefault();
        var lang = $('#country-select').val(),
            keyword = $('#keywords-input').val();
        window.location.href = '/language/' + lang + '/#' + keyword;
    });

    if( $('#search-page').length > 0 ) {
        var keyword = window.location.hash.substring(1);
        //todo use this for json search into country page
        $('.keyword').html(keyword)
    }

});
