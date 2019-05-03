jQuery(document).ready(function($) {

    var mainForm = $('#main-search'),
        singleForm = $('#single-search'),
        searchPage = $('#search-page'),
        previewData = [],
        overlay = $('.overlay'),
        country = $('#member').find('path'),
        keywords = $('#most-used-keywords'),
        preloaderKey = $('.preloader-key'),
        countrySelect = $('#country-select'),
        keywordInput = $('#keywords-input'),
        results = $('#results'),
        preloader = $('.preloader'),
        mapContainer = $('#map-container'),
        mapTrackersContainer = $('#map-trackers-container');


    //////////////////////////////
    // PRIVATE FUNCTIONS
    //////////////////////////////

    /**
     * choose a single element into json array
     *
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
     * Check if property exist in Json array
     *
     * @param obj
     * @returns {boolean}
     */
    function checkNested(obj /*, level1, level2, ... levelN*/) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    /**
     * Return 0 for undefined val
     *
     * @param val
     * @returns {*}
     */
    function preventUndefined( val ) {
        var output;
        if( val == 'undefined' || val == '' || val == null || !val ) output = 0;
        else output = val;
        return output
    }

    /**
     * Format string to search: first lettere is Uppercase and no space allowed
     *
     * @param string
     * @returns {string}
     */
    function formatString(string)
    {
        var str = string.charAt(0).toUpperCase() + string.slice(1);
        return str.replace(/\s+/g, '-');
    }

    /**
     * Get full country name form country code
     *
     * @param country
     * @returns {*}
     */
    function getCountryName( country ) {
        var countryCode = country.toLowerCase(),
            countryName;

        if( countryCode == 'it' ) countryName = 'Italy';
        if( countryCode == 'si' ) countryName = 'Slovenia';
        if( countryCode == 'dk' ) countryName = 'Denmark';
        if( countryCode == 'be' ) countryName = 'Belgium';
        if( countryCode == 'at' ) countryName = 'Austria';
        if( countryCode == 'cz' ) countryName = 'Czechia';
        if( countryCode == 'sk' ) countryName = 'Slovakia';
        if( countryCode == 'lu' ) countryName = 'Luxembourg';
        if( countryCode == 'pt' ) countryName = 'Portugal';
        if( countryCode == 'es' ) countryName = 'Spain';
        if( countryCode == 'pl' ) countryName = 'Poland';
        if( countryCode == 'gr' ) countryName = 'Greece';
        if( countryCode == 'fi' ) countryName = 'Finland';
        if( countryCode == 'de' ) countryName = 'Germany';
        if( countryCode == 'se' ) countryName = 'Sweden';
        if( countryCode == 'cy' ) countryName = 'Cyprus';
        if( countryCode == 'ie' ) countryName = 'Ireland';
        if( countryCode == 'hu' ) countryName = 'Hungary';
        if( countryCode == 'lt' ) countryName = 'Lithuania';
        if( countryCode == 'lv' ) countryName = 'Latvia';
        if( countryCode == 'ro' ) countryName = 'Romania';
        if( countryCode == 'bg' ) countryName = 'Bulgaria';
        if( countryCode == 'ee' ) countryName = 'Estonia';
        if( countryCode == 'fr' ) countryName = 'France';
        if( countryCode == 'nl' ) countryName = 'Netherlands';
        if( countryCode == 'mt' ) countryName = 'Malta';
        if( countryCode == 'hr' ) countryName = 'Croatia';
        if( countryCode == 'gb' ) countryName = 'Great Britain';

        return countryName;
    }

    /**
     * get lang code form language or country
     *
     * @param lang
     * @returns {*}
     */
    function getLangCode( lang ) {
        var langName = lang.toLowerCase(),
            langCode;

        if( langName == 'italian' || langName == 'italy' )          langCode = 'it';
        if( langName == 'bulgarian' || langName == 'bulgaria' )     langCode = 'bg';
        if( langName == 'croatian' || langName == 'croatia' )       langCode = 'hr';
        if( langName == 'czech' || langName == 'czech-republic' )   langCode = 'cs';
        if( langName == 'danish' || langName == 'denmark' )         langCode = 'da';
        if( langName == 'dutch' || langName == 'netherlands' )      langCode = 'nl';
        if( langName == 'english' || langName == 'great-britain' )  langCode = 'en';
        if( langName == 'estonian' || langName == 'estonia' )       langCode = 'et';
        if( langName == 'finnish' || langName == 'finland' )        langCode = 'fi';
        if( langName == 'french' || langName == 'france' )          langCode = 'fr';
        if( langName == 'german' || langName == 'germany' )         langCode = 'de';
        if( langName == 'greek' || langName == 'greece' )           langCode = 'gr'; //missing
        if( langName == 'hungarian' || langName == 'hungary' )      langCode = 'hu';
        if( langName == 'latvian' || langName == 'latvia' )         langCode = 'lv';
        if( langName == 'lithuanian' || langName == 'lithuania' )   langCode = 'lt';
        if( langName == 'polish' || langName == 'poland' )          langCode = 'pl';
        if( langName == 'portuguese' || langName == 'portugal' )    langCode = 'pt';
        if( langName == 'romanian' || langName == 'romania' )       langCode = 'ro';
        if( langName == 'slovak' || langName == 'slovakia' )        langCode = 'sk';
        if( langName == 'slovenian' || langName == 'slovenia' )     langCode = 'sl';
        if( langName == 'spanish' || langName == 'spain' )          langCode = 'es';
        if( langName == 'swedish' || langName == 'sweden' )         langCode = 'se'; //missing

        return langCode;
    }

    /**
     * Do search function
     *
     * @param keyword
     * @param lang
     * @return push html into #results
     */
    function doSearch( keyword, lang ){

        if(!keyword) {
            preloader.hide();
            $('<p class="error"><b>No keyword!</b> <span>You need to search for a keyword, use the form above!</span></p>').appendTo(results);
            return;
        }

        var url = 'https://facebook.tracking.exposed/api/v2/' + getLangCode(lang) + '/noogle/' + keyword + '/100-0',
            items = [];

        console.log(lang+', '+url);

        $.getJSON(url, function (data) {
            $.each(data, function (key, val) {

                var id = val['semanticId'],
                    author = val['summary']['source'],
                    permalink = val['summary']['permaLink'],
                    dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'},
                    date = val['summary']['publicationTime'],
                    time = new Date(date).toLocaleTimeString("en-US"),
                    formattedDate = new Date(date).toLocaleDateString("en-US", dateOptions),
                    type = val['summary']['fblinktype'],
                    nature = val['summary']['nature'],
                    text = val['summary']['texts'],
                    textSize = val['summary']['textsize'],
                    relevantWord = val['l'],
                    relevantWordString = relevantWord.toString(),
                    like = val['summary']['LIKE'],
                    love = val['summary']['LOVE'],
                    haha = val['summary']['HAHA'],
                    angry = val['summary']['ANGRY'],
                    sad = val['summary']['SAD'],
                    wow = val['summary']['WOW'],
                    linkOutput,
                    permalinkOutput;

                //Check for value in nested property
                if( checkNested(val, 'summary', 'opengraph', 'link') ) {
                    var link = val['summary']['opengraph']['link'],
                        anchorLinkText = val['summary']['opengraph']['title'];
                }

                //remove link if null
                if(!link || link == 'undefined') linkOutput = '<small>No external link contained</small>';
                else linkOutput = "<small>External link contained: <a href='" + link + "' target='_blank'>" + anchorLinkText + "</a></small><br/>";

                //remove permalink if null
                if(!permalink) permalinkOutput = '';
                else permalinkOutput = "<a href='https://www.facebook.com" + permalink + "' target='_blank' class='permalink icon-extra-small'>Post link</a>";

                items.push(
                    "<li id='" + id + "' class='post'>" +
                    "<header>" +
                    permalinkOutput +
                    "<strong class='author icon-extra-small'>" + author + "</strong>" +
                    "<small>" + formattedDate + ". " + time + "</small><br />" +
                    "<small>Type: <b>" + type + " (" + nature + ")</b></small>, " +
                    "<small>words count: <b>" + textSize + "</b></small><br />" +
                    "<small>Like: <b>" + preventUndefined(like) + "</b>, Love: <b>" + preventUndefined(love) + "</b>, Haha: <b>" + preventUndefined(haha) + "</b>, Wow: <b>" + preventUndefined(wow) + "</b>, Sad: <b>" + preventUndefined(sad) + "</b>, Angry: <b>" + preventUndefined(angry) + "</b>, </small>" +
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
            if(ArrayLength == 0) {
                results.before('<header class="center">' +
                    '<p>' +
                    '<span class="icon-extra-small rss">RSS link:</span> <a href="' + url + '" class="primary-color break"><b>' + url + '</b></a>' +
                        //todo: insert proper link to documentation
                    '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '<h3 class="light-font top">' +
                    '<b>' + ArrayLength + '</b> results for keyword: <i class="keyword-value">' + keyword + '</i><br />' +
                    '<span class="paragraph">Try search for a new keyword</span>' +
                    '</h3>' +
                    '</header>' +
                    '<div class="row"></div> '
                );
            } else {
                results.before('<header class="center">' +
                    '<p>' +
                    '<span class="icon-extra-small rss">RSS link:</span> <a href="' + url + '" class="primary-color break"><b>' + url + '</b></a>' +
                        //todo: insert proper link to documentation
                    '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '<h3 class="light-font top">' +
                    '<b>' + ArrayLength + '</b> results for keyword: <i class="keyword-value">' + keyword + '</i><br />' +
                    '<span class="paragraph">here are displayed only a small amount of the total results. <br /> To see all results, copy the RSS url above and paste it into a feed reader</span>' +
                    '</h3>' +
                    '</header>' +
                    '<div class="row"></div> '
                );
                results.after('<footer class="center">' +
                    '<h3 class="light-font top">' +
                    'There are much more other results<br />' +
                    '<span class="paragraph">To see them all use the:</span>' +
                    '</h3>' +
                    '<p>' +
                    '<span class="icon-extra-small rss">RSS link:</span> <a href="' + url + '" class=" primary-color break"><b>' + url + '</b></a>' +
                    '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '</footer>'
                );
            }
        });
    } //end doSearch function



    //////////////////////////////
    // PUBLIC FUNCTIONS
    //////////////////////////////

    /**
     *  most used keywords data
     */
    if( searchPage.length > 0 )
    {
        var i,
            label,
            slug = searchPage.attr('data-lang'),
            lang_info = getLangCode(slug),
            url = 'https://facebook.tracking.exposed/api/v2/' + lang_info + '/langinfo';

        $.getJSON(url, function (data) {

            var labelsArray = data['content']['most'],
                timeWindow = data['content']['consideredHoursWindow'],
                contributors = data['content']['contributors'],
                totalLabels = data['content']['labelsCount'];

            $('b.contributors-data').html(contributors);
            $('b.time-window').html(timeWindow);
            $('b.total-key').html(totalLabels);

            for ( i = 0; i < labelsArray.length; i++) {
                label = labelsArray[i];
                var labelRow = "<li id='" + label + "' class='keyword-element' data-value='" + label + "'><a href='/" + label + "'>" + label + "</a></li>";
                $('ul#most-keyword').append(labelRow);
            }

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
            window.location.href += '#'+ref.replace(/\s+/g, '-');
            location.reload();
        });
    }










    /*
     todo: fix map api
     function getLoud( lang ) {

     //console.log(lang.toLowerCase());

     url = 'https://facebook.tracking.exposed/api/v2/' + lang.toLowerCase() + '/loud/10-1';

     $.getJSON(url, function( data ) {

     var countryData= getCountryName( lang ),
     languageData = lang,
     totalKeywordsData = 0;
     //contributorsData = obj[0]['total'],
     //totalKeywordsData = data['textsize'],
     //labelsData = '<li>' + obj[0]['l'] + '</li> ';

     $.each(data, function (key, val) {
     var
     contributorsData = val['contributors'],
     keywordsData = val['textsize'],
     totalKeywordsData = keywordsData,
     labelsData = val['l'];
     console.log(labelsData);
     console.log(keywordsData);
     });

     console.log('tot: ' + totalKeywordsData);
     //formattedCountry = countryData.replace(/\s+/g, '-').toLowerCase();

     overlay.find('h3').html(countryData);
     overlay.find('b.language-data').html(languageData);
     overlay.find('b.contributors-data').html(contributorsData);
     overlay.find('b.keywords-sum').html(totalKeywordsData);
     overlay.find('ul.keywords-data').html(labelsData);
     $('a#country-link').attr( 'href', '/country/' + lang );


     }).fail( function() {
     overlay.append('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>');
     overlay.find('ul.preview-data').empty();
     overlay.find('div.center').empty();
     });
     openOverlay('#preview-info');
     }

     country.click(function() {
     getLoud($(this).attr('id'));
     });

     */


    /**
     * map FaceBook data preview
     */
    if( mapContainer.length > 0 )
    {
        url = 'https://raw.githubusercontent.com/lrnzctld/eu19/master/data/keywords-preview.json';
        //the same json for every request
        $.getJSON(url, function(data) {
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
     * map Trackers
     */
    if( mapTrackersContainer.length > 0 )
    {
        //trigger on country map click
        country.click(function() {

            var code = $(this).attr('id'),
                url = '' + code;
                country =  getCountryName( code );

            //remove old content from overlay
            overlay.find('.news-sites').empty();
            //todo: use "url" in place of sample data
            $.getJSON("https://gist.githubusercontent.com/vecna/7cfbccfbea1e569ce121176117a541b9/raw/0ab7abc042548a26c839349b8e5d347393c06b5c/mock.json", function (data) {
                $.each(data, function (key, val) {

                    var i,
                        text = "",
                        sites = val['site'],
                        trackers = val['trackers'];
                    for ( i = 0; i < trackers.length; i++) {
                        if (i < trackers.length - 1) var sep = '-'; else sep = '';
                        text += trackers[i]['id'] + sep;
                    }

                    var    checkbox = '<label class="checkbox paragraph" for="' + sites + '">' +
                            '<input type="checkbox" value="' + text + '" id="' + sites + '" name="companies" />' +
                            '<span>' + sites + '</span>' +
                            '<small class="right"><b>' + trackers.length + '</b> trackers</small>' +
                            '</label>';

                    overlay.find('.news-sites').append(checkbox);
                    overlay.find('i.country-name').html(country);
                });

            }).fail( function() {
                overlay.find('h3').remove();
                overlay.find('.center').remove();
                overlay.append('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>').appendTo(keywords);
            });
            openOverlay('#trackers-info');
        });
    }



    //////////////////////////////
    // TRIGGERS
    //////////////////////////////

    /**
     * home and single form trigger
     */
    mainForm.submit( function(e) {
        e.preventDefault();
        var lang = countrySelect.val(),
            keyword = formatString(keywordInput.val());
        if( keyword == '' || keyword == null ) {
            $('.error').remove();
            return  $('<p class="error"><span>Please, type a keyword</span></p>').appendTo(mainForm);
        }
        window.location.href = '/language/' + lang + '/#' + keyword;
    });
    singleForm.submit( function(e) {
        e.preventDefault();
        var keyword = formatString(keywordInput.val());
        if( keyword == '' || keyword == null ) {
            $('.error').remove();
            return  $('<p class="error"><span>Please, type a keyword</span></p>').appendTo(singleForm);
        }
        removeLocationHash();
        window.location.href += '#'+keyword;
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


    //////////////////////////////
    // UI ELEMENTS
    //////////////////////////////

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
