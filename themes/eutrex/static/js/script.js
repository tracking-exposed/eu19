jQuery(document).ready(function($) {

    var mainForm = $('#main-search'),
        singleForm = $('#single-search'),
        searchPage = $('#search-page'),
        previewData = [],
        overlay = $('#preview-info'),
        country = $('#member').find('path'),
        keywords = $('#most-used-keywords'),
        preloaderKey = $('.preloader-key'),
        countrySelect = $('#country-select'),
        keywordInput = $('#keywords-input'),
        results = $('#results'),
        preloader = $('.preloader'),
        mapContainer = $('#map-container');


    // PRIVATE FUNCTIONS
    /**
     * choose a single element into json array
     * @param obj
     * @param key
     * @param val
     * @returns {Array}
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
    /**
     * remove hash from url
     */
    function removeLocationHash(){
        var noHashURL = window.location.href.replace(/#.*$/, '');
        window.history.replaceState('', document.title, noHashURL)
    }
    /**
     * Do search function
     * @param keyword
     * @param lang
     */
    function doSearch( keyword, lang ){
        var url = 'https://something.com/' + lang + '/' + keyword,
            items = [];
        //todo: use "url" in place of sample data
        $.getJSON("https://gist.githubusercontent.com/vecna/7087664041e7f0a9c99c22ea7fd1d6b1/raw/38d0c72e4f17a86bef9bfb587b2809fc0395943c/it___Italia.json", function (data) {
            $.each(data, function (key, val) {

                var id = val['semantic']['_id'],
                    linkOutput,
                    author = val['post']['author'],
                    permalink = val['post']['permalink'],
                    dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'},
                    date = val['post']['publicationTime'],
                    time = new Date(date).toLocaleTimeString("en-US"),
                    formattedDate = new Date(date).toLocaleDateString("en-US", dateOptions),
                    type = val['post']['type'],
                    text = val['post']['fulltext'],
                    textSize = val['semantic']['textsize'],
                    relevantWord = val['semantic']['l'],
                    relevantWordString = relevantWord.toString(),
                    link = val['post']['links'];

                //remove link if null
                if(link == '') linkOutput = '';
                else linkOutput = "<small>External link contained: <a href='" + link[0]['link'] + "' target='_blank'>" + link[0]['linked'] + "</a></small><br/>";

                items.push(
                    "<li id='" + id + "' class='post'>" +
                    "<header>" +
                    "<a href='https://www.facebook.com" + permalink + "' target='_blank' class='permalink icon-extra-small'>Post link</a>" +
                    "<strong class='author icon-extra-small'>" + author + "</strong>" +
                    "<small>" + formattedDate + ". " + time + "</small><br />" +
                    "<small>Type: <b>" + type + "</b></small>, " +
                    "<small>words count: <b>" + textSize + "</b></small> " +
                    "</header>" +
                    "<p>" + text + "</p>" +
                    "<footer>" +
                    linkOutput +
                    "<small class='relevant-words'>Keywords: <i>" +  relevantWordString.replace(/,/g, '</i> <i>') + "</i></small>" +
                    "</footer>" +
                    "</li>"
                );
            });
            $("<ul/>", {
                html: items.join("")
            }).appendTo(results);

        }).fail( function() {
            preloader.hide();
            $('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>').appendTo(results);

        }).done( function( data ) {
            var ArrayLength = data.length;

            preloader.hide();
            results.before('<header class="center">' +
                '<p>' +
                '<span class="icon-extra-small rss">RSS link:</span> <a href="' + url + '" class="primary-color"><b>' + url + '</b></a>' +
                '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                '</p>' +
                '<h3 class="light-font top">' +
                '<b>' + ArrayLength + '</b> results for keyword: <i class="keyword-value">' + keyword + '</i><br />' +
                '<span class="paragraph">here are displayed only the XX% of the total results. <br /> To see all results, copy the RSS url above and paste it into a feed reader</span>' +
                '</h3>' +
                '</header>' +
                '<div class="row"></div> '
            );
            results.after('<footer class="center">' +
                '<h3 class="light-font top">' +
                'There are other <b>XXX</b> results<br />' +
                '<span class="paragraph">To see them all use the:</span>' +
                '</h3>' +
                '<p>' +
                '<span class="icon-extra-small rss">RSS link:</span> <a href="' + url + '" class=" primary-color"><b>' + url + '</b></a>' +
                '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                '</p>' +
                '</footer>'
            );
        });
    } //end doSearch function


    //PUBLIC FUNCTIONS
    /**
     * map preview data
     */
    if( mapContainer.length > 0 )
    {
        //the same json for every request
        $.getJSON("https://raw.githubusercontent.com/lrnzctld/eu19/master/data/keywords-preview.json", function(data) {
            previewData = data;
        }).fail( function() {
            previewData = null;
        });
        //trigger on country map click
        country.click(function() {
            if ( !previewData ) {
                overlay.append('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>');
                overlay.find('ul.preview-data').empty();
                overlay.find('div.center').empty();
            } else {
                var code = $(this).attr('id'),
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
            }
            openOverlay('#preview-info');
        });
    }

    /**
     *  most used keywords data
     */
    if( searchPage.length > 0 )
    {
        var items = [],
            slug = searchPage.attr('data-lang'),
            url = 'https://something.com/lang/' + slug.toLowerCase();

        //todo: use "slug" in place of sample data
        $.getJSON("https://gist.githubusercontent.com/vecna/b3aed1224d8873e58f80f1c4705ce94c/raw/cb4bea12b4de951ccd2403cc8b74608e864ba1fa/topk-IT.json", function (data) {
            $.each(data, function (key, val) {
                items.push("<li id='" + key + "' class='keyword-element' data-value='" + val['label'] + "'><a href='/country/{{ urlize .Title }}/#" + val['label'] + "'>" + val['label'] + "</a> " + "(" + val['count'] + ")</li>");
            });
            $("<ul/>", {
                html: items.join("")
            }).appendTo(keywords);
        }).fail( function() {
            preloaderKey.hide();
            $('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>').appendTo(keywords);
        }).done( function() {
            preloaderKey.hide();
        });

        // reload page if click on keyword
        $(document).on('click',".keyword-element",function (e) {
            var ref = $(this).attr('data-value');
            e.preventDefault();
            removeLocationHash();
            window.location.href += '#'+ref.replace(/\s+/g, '-').toLowerCase();
            location.reload();
        });
    }

    //TRIGGERS

    /**
     * home and single form trigger
     */
    mainForm.submit( function(e) {
        e.preventDefault();
        var lang = countrySelect.val(),
            keyword = keywordInput.val();
        if( keyword == '' || keyword == null ) {
            $('.error').remove();
            return  $('<p class="error"><span>Please, type a keyword</span></p>').appendTo(mainForm);
        }
        window.location.href = '/language/' + lang + '/#' + keyword;
    });
    singleForm.submit( function(e) {
        e.preventDefault();
        var keyword = keywordInput.val();
        if( keyword == '' || keyword == null ) {
            $('.error').remove();
            return  $('<p class="error"><span>Please, type a keyword</span></p>').appendTo(singleForm);
        }
        removeLocationHash();
        window.location.href += '#'+keyword.replace(/\s+/g, '-').toLowerCase();
        location.reload();
    });
    /**
     * Main trigger doSearch just loading the page
     */
    if( searchPage.length > 0 ) {
        var keyword = window.location.hash.substring(1),
            lang = searchPage.attr('data-lang').toLowerCase();
        keywordInput.val(keyword);
        doSearch(keyword, lang);
    }


    //UI
    /**
     * overlay function
     */
    /* general overlay */
    function openOverlay (id) {
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
    /*trigger close*/
    $('#overlay_shade, .overlay a.close-btn').on('click', function(e) {
        e.preventDefault();
        closeOverlay();
    });

});
