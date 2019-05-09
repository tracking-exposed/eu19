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
     * Check if property exist in nested Json array
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
     * Return 0 for undefined val in Json array
     *
     * @param val
     * @returns {val}
     */
    function preventUndefined( val ) {
        return ( val == 'undefined' || val == '' || !val ) ? 0 : val;
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
        if( countryCode == 'cs' ) countryName = 'Czech-republic';
        if( countryCode == 'sk' ) countryName = 'Slovakia';
        if( countryCode == 'lu' ) countryName = 'Luxembourg';
        if( countryCode == 'pt' ) countryName = 'Portugal';
        if( countryCode == 'es' ) countryName = 'Spain';
        if( countryCode == 'pl' ) countryName = 'Poland';
        if( countryCode == 'gr' ) countryName = 'Greece';
        if( countryCode == 'fi' ) countryName = 'Finland';
        if( countryCode == 'de' ) countryName = 'Germany';
        if( countryCode == 'sv' ) countryName = 'Sweden';
        if( countryCode == 'cy' ) countryName = 'Cyprus';
        if( countryCode == 'ie' ) countryName = 'Ireland';
        if( countryCode == 'hu' ) countryName = 'Hungary';
        if( countryCode == 'lt' ) countryName = 'Lithuania';
        if( countryCode == 'lv' ) countryName = 'Latvia';
        if( countryCode == 'ro' ) countryName = 'Romania';
        if( countryCode == 'bg' ) countryName = 'Bulgaria';
        if( countryCode == 'et' ) countryName = 'Estonia';
        if( countryCode == 'fr' ) countryName = 'France';
        if( countryCode == 'nl' ) countryName = 'Netherlands';
        if( countryCode == 'mt' ) countryName = 'Malta';
        if( countryCode == 'hr' ) countryName = 'Croatia';
        if( countryCode == 'gb' ) countryName = 'Great-Britain';

        return countryName;
    }

    /**
     * get language code form language, country name or country code
     *
     * @param lang
     * @returns {*}
     */
    function getLangCode( lang ) {
        var langName = lang.toLowerCase(),
            langCode;

        if( langName == 'italian' || langName == 'italy' || langName == 'it' )          langCode = 'it';
        if( langName == 'bulgarian' || langName == 'bulgaria' || langName == 'bg' )     langCode = 'bg';
        if( langName == 'croatian' || langName == 'croatia' || langName == 'hr' )       langCode = 'hr';
        if( langName == 'czech' || langName == 'czech-republic' || langName == 'cs' )   langCode = 'cs';
        if( langName == 'danish' || langName == 'denmark' || langName == 'dk' )         langCode = 'da';
        if( langName == 'dutch' || langName == 'netherlands' || langName == 'nl' )      langCode = 'nl';
        if( langName == 'estonian' || langName == 'estonia' || langName == 'et' )       langCode = 'et';
        if( langName == 'finnish' || langName == 'finland' || langName == 'fi' )        langCode = 'fi';
        if( langName == 'french' || langName == 'france' || langName == 'fr' )          langCode = 'fr';
        if( langName == 'french' || langName == 'luxembourg ' || langName == 'lu' )     langCode = 'fr';
        if( langName == 'french' || langName == 'belgium' || langName == 'be' )         langCode = 'fr';
        if( langName == 'german' || langName == 'germany' || langName == 'de' )         langCode = 'de';
        if( langName == 'german' || langName == 'austria' || langName == 'at' )         langCode = 'de';
        if( langName == 'hungarian' || langName == 'hungary' || langName == 'hu' )      langCode = 'hu';
        if( langName == 'latvian' || langName == 'latvia' || langName == 'lv' )         langCode = 'lv';
        if( langName == 'lithuanian' || langName == 'lithuania' || langName == 'lt' )   langCode = 'lt';
        if( langName == 'polish' || langName == 'poland' || langName == 'pl' )          langCode = 'pl';
        if( langName == 'portuguese' || langName == 'portugal' || langName == 'pt' )    langCode = 'pt';
        if( langName == 'romanian' || langName == 'romania' || langName == 'ro' )       langCode = 'ro';
        if( langName == 'slovak' || langName == 'slovakia' || langName == 'sk' )        langCode = 'sk';
        if( langName == 'slovenian' || langName == 'slovenia' || langName == 'si' )     langCode = 'sl';
        if( langName == 'spanish' || langName == 'spain' || langName == 'es' )          langCode = 'es';
        if( langName == 'swedish' || langName == 'sweden' || langName == 'sv' )         langCode = 'sv';
        if( langName == 'greek' || langName == 'greece' || langName == 'gr' )           langCode = 'el';
        if( langName == 'greek' || langName == 'cyprus' || langName == 'cy' )           langCode = 'el';
        if( langName == 'english' || langName == 'ireland' || langName == 'ie' )        langCode = 'en';
        if( langName == 'english' || langName == 'great-britain' || langName == 'gb' )  langCode = 'en';
        if( langName == 'english' || langName == 'malta' || langName == 'mt' )          langCode = 'en';

        return langCode;
    }

    /**
     * Do search function
     *
     * @param keyword
     * @param lang
     * @return {html}
     */
    function doSearch( keyword, lang ){

        if(!keyword) {
            preloader.hide();
            $('<p class="error"><b>No keyword!</b> <span>Pick one from the <i>Most used keywords</i> box, located above or on the left</span></p>').appendTo(results);
            return;
        }

        var url = 'https://facebook.tracking.exposed/api/v2/' + getLangCode(lang) + '/noogle/' + keyword + '/39-0';
        var rssurl = `https://facebook.tracking.exposed/feeds/0/${getLangCode(lang)}/${encodeURIComponent(keyword)}`;
        var items = [];

        $.getJSON(url, function (data) {
            $.each(data, function (key, val) {

                var id = val['semanticId'],
                    author = val['summary']['source'],
                    permalink = val['summary']['permaLink'],
                    dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'},
                    date = val['summary']['publicationTime'],
                    time = date ? new Date(date).toLocaleTimeString("en-US") : "",
                    formattedDate = date ? new Date(date).toLocaleDateString("en-US", dateOptions) : "unknow publication time",
                    type = val['summary']['fblinktype'],
                    // nature = val['summary']['nature'],
                    text = val['summary']['texts'],
                    textSize = val['summary']['textsize'],
                    like = preventUndefined(val['summary']['LIKE']),
                    love = preventUndefined(val['summary']['LOVE']),
                    haha = preventUndefined(val['summary']['HAHA']),
                    angry = preventUndefined(val['summary']['ANGRY']),
                    sad = preventUndefined(val['summary']['SAD']),
                    wow = preventUndefined(val['summary']['WOW']),
                    linkOutput,
                    permalinkOutput;

                // make a selection of unique keyword related, and prepare the clickable button with their label
                var clickableKeywords = "";
                var uniqueKeywords = [];
                $.each(val['l'], function(i, el) {
                    if($.inArray(el, uniqueKeywords) === -1) {
                        uniqueKeywords.push(el);
                        clickableKeywords += `<small class='relevant-words'><i onclick="newkw('${encodeURIComponent(el)}')">${el}</i></small>`;
                    }
                });

                //Check for value in nested property
                if( checkNested(val, 'summary', 'opengraph', 'link') ) {
                    var link = val['summary']['opengraph']['link'],
                        anchorLinkText = val['summary']['opengraph']['title'];
                }

                //remove link if null
                if(!link || link == 'undefined') linkOutput = "";
                else linkOutput = "<small>External link contained: <a href='" + link + "' target='_blank'>" + anchorLinkText + "</a></small><br/>";

                //remove permalink if null
                if(!permalink) permalinkOutput = '';
                else permalinkOutput = "<a href='https://www.facebook.com" + permalink + "' target='_blank' class='permalink icon-extra-small'>Post link</a>";

                let reactions = "";
                reactions += like ? ("Like: <b>" + like + " </b>") : "";
                reactions += love ? ("Love: <b>" + love + " </b>") : "";
                reactions += haha ? ("Haha: <b>" + haha + " </b>") : "";
                reactions += wow ? ("Wow: <b>" + wow + " </b>") : "";
                reactions += sad ? ("Sad: <b>" + sad + " </b>") : "";
                reactions += angry ? ("Angry: <b>" + angry + " </b>") : "";

                if(reactions) var sep = ' | '; else sep = '';

                items.push(
                    "<li id='" + id + "' class='post'>" +
                    "<header>" +
                    permalinkOutput +
                    "<strong class='author icon-extra-small'>" + author + "</strong>" +
                    "<small>" + formattedDate + ". " + time + "</small>" + " | " +
                    "<small>Text length: <b>" + textSize + "</b></small>" + sep +
                    "<small>" + reactions + "</small>" + 
                    "</header>" +
                    "<p>" + text + "</p>" +
                    "<footer>" +
                    linkOutput +
                    clickableKeywords +
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
                    '<span class="icon-extra-small rss">RSS link:</span> <code class="break">' + rssurl + '</code>' +
                    '<small><a href="/page/rss/" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '<h3 class="light-font top break">' +
                    '<b>' + ArrayLength + '</b> results for keyword: <i class="keyword-value">' + keyword + '</i><br />' +
                    '<span class="paragraph no-break">Try search for a new keyword</span>' +
                    '</h3>' +
                    '</header>' +
                    '<div class="row"></div> '
                );
            } else {
                results.before('<header class="center">' +
                    '<p>' +
                    '<span class="icon-extra-small rss">RSS:</span> <code class="break">' + rssurl + '</code>' +
                    '<small><a href="/page/rss/" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '<h3 class="light-font top break">' +
                    '<b>' + ArrayLength + '</b> appearances of: <i class="keyword-value">' + keyword + '</i><br />' +
                    '<span class="paragraph no-break">By watching the <a href="/page/rss">events horizontally</a> you can pop your bubble, and with some limit, control your algorithm!<br /> <small>To get all results, subscribe to the RSS with a feed reader</small></span>' +
                    '</h3>' +
                    '</header>' +
                    '<div class="row"></div> '
                );
                results.after('<footer class="center">' +
                    '<p>' +
                    '<span class="icon-extra-small rss">RSS:</span> <code class="break">' + rssurl + '</code>' +
                    '<small><a href="#" class="icon-extra-small help">How to use RSS</a></small>' +
                    '</p>' +
                    '</footer>'
                );
            }
        });
    }

    /**
     * Get info summary from language
     *
     * @param lang
     * @return {html}
     */
    function getSummary( lang ) {

        var langCode = getLangCode( lang ),
            url = 'https://facebook.tracking.exposed/api/v2/' + langCode + '/langinfo';

        //console.log(lang+', '+langCode+', '+url);

        $.getJSON(url, function( data ) {
            var i,
                labelsArray = data['content']['most'],
                timeWindow = data['content']['consideredHoursWindow'],
                contributors = data['content']['contributors'],
                totalLabels = data['content']['labelsCount'],
                countryData= getCountryName( lang ),
                languageData = langCode;

            overlay.find('h3').html(countryData);
            overlay.find('b.language-data').html(languageData);
            overlay.find('b.contributors-data').html(contributors);
            overlay.find('b.keywords-sum').html(totalLabels);
            for ( i = 0; i < labelsArray.length; i++) {
                label = labelsArray[i];
                var labelRow = "<li id='" + label + "' class='keyword-element' data-value='" + label + "'><a href='/country/"  + getCountryName( lang).toLowerCase() + "/#" +  label  + "'>" + label + "</a></li>";
                overlay.find('ul.keywords-data').append(labelRow);
            }
            $('a#country-link').attr( 'href', '/country/' + getCountryName( lang).toLowerCase() );

        }).fail( function() {
            overlay.find('ul.preview-data').empty();
            overlay.find('div.center').empty();
            overlay.find('p.error').remove();
            overlay.append('<p class="error"><b>Oops!</b> <span>Something goes wrong, please try later!</span></p>');

        });
        openOverlay('#preview-info');
    }

    /**
     * Get most used keyswords
     *
     *  @param slug
     *  @return {html}
     */
    function getMostUsedKeys( slug ) {
        var i,
            label,
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
    }

    /**
     * todo: map Trackers
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
     * home form trigger
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

    /**
     * single page form trigger
     */
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
     * Map info trigger
     */
    country.click(function() {
        overlay.find('ul.keywords-data').empty();
        var slug = $(this).attr('id');
        getSummary( slug );
    });

    //search page triggers
    if( searchPage.length > 0 ) {

        /**
         *  Most used keywords data
         */
        var slug = searchPage.attr('data-lang');
        getMostUsedKeys( slug );

        /**
         * Reload page if click on most used keyword
         */
        $(document).on('click',".keyword-element",function (e) {
            var ref = $(this).attr('data-value');
            e.preventDefault();
            removeLocationHash();
            window.location.href += '#'+ref;
            location.reload();
        });
        
        /**
         * Main trigger doSearch just loading the page
         */
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

/**
 * Replace the URL with the one of the clicked keyword
 *
 * @param event
 * @return null (side effect window reload)
 */
function newkw(kw) {
    window.location.assign('#' + kw);
    location.reload();
}

