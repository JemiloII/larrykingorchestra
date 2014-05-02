function setSliderMaxHeightToWindowHeight() {
    var windowHeight = $(window).height();
    var navbarHeight = $('.navbar').height();

    var newSliderHeight = windowHeight;
    var newImgHeight = windowHeight - 2;

    $('#slider').css('max-height', newSliderHeight);
}

function setLogoHeightAndWidth() {
    var navbarHeight = $('.navbar').height();
    var adjusted = navbarHeight / 2;

    $('.navbar-brand img').css('height', adjusted);
}

function centerMyContent() {
    var windowWidth = $(window).width();

    $('html').css('width', windowWidth);
    $('body').css('width', windowWidth);
    $('header').css('width', windowWidth);
    $('header > nav').css('width', windowWidth);
    $('section.about').css('width', windowWidth);
    $('section.gallery').css('width', windowWidth);
    $('section.videos').css('width', windowWidth);
    $('section.raves-reviews').css('width', windowWidth);
    $('parallax').css('width', windowWidth);
    $('#fap-wrapper').css('width', windowWidth);
    $('#video_results').css('width', windowWidth);

}

function resizeMusicianWidths() {
    // Resizes the width and height of the bio images
    // and descriptions so that the images stay a  
    // consistant round and not look chopped up and
    // the description text blocks are the same width
    // as the adjusted images.

    var containerWidth = $('.musician').width();

    var sizePercentage = containerWidth / 310;
    var newSize = sizePercentage * 300;

    $('div.musician > a > .image > img').width(newSize);
    $('div.musician > a > .description').width(newSize);

    $('div.musician > a > .image > img').css('max-width', '300px');
    $('div.musician > a > .description').css('max-width', '300px');

}

function resizeMusicianDescriptions() {
    var descriptionHeights = [];

    for (var i = 0; i < ($('div.musician > a > .description').length); i++) {
        descriptionHeights.push(jQuery('div.musician > a > .description:nth(' + i + ')').height());
    }
    var largestDescriptionHeight = Math.max.apply(Math, descriptionHeights);

    $('div.musician > a > .description').height(largestDescriptionHeight);
}

function gallerySelectCallback(page_index) {
    var num_entries = jQuery('section.gallery_thumbs:nth-of-type(1) > div a').length;
    var items_per_page = 8;
    var max_elem = Math.min((page_index + 1) * items_per_page, num_entries);
    var newcontent = '';

    //$('#gallery_results').empty();
    $('section.gallery section.gallery_thumbs:nth-of-type(1) > div a').hide();

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent = jQuery('section.gallery section.gallery_thumbs:nth-of-type(1) > div a:eq(' + i + ')').show();
        //$('#gallery_results').append(newcontent);  
    }
    return false;
}

function videoSelectCallback(page_index) {
    var num_entries = jQuery('section.video_thumbs:nth-of-type(1) > div a').length;
    var items_per_page = 3;
    var max_elem = Math.min((page_index + 1) * items_per_page, num_entries);
    var newcontent = '';

    //$('#gallery_results').empty();
    $('section.video_thumbs:nth-of-type(1) > div a').hide();

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent = jQuery('section.video_thumbs:nth-of-type(1) > div a:eq(' + i + ')').show();
        //$('#gallery_results').append(newcontent);  
    }
    return false;
}

/** 
 * Initialisation function for pagination
 */
function initPagination() {
    // count entries inside the hidden content
    var num_gallery_entries = jQuery('section.gallery section.gallery_thumbs:nth-of-type(1) > div a').length;
    var num_video_entries = jQuery('section.video_thumbs:nth-of-type(1) > div a').length;

    // Create content inside pagination element
    $("#Gallery-Pagination").pagination(num_gallery_entries, {
        callback: gallerySelectCallback,
        items_per_page: 8,
        num_display_entries: 5,
        num_edge_entries: 2,
        prev_text: "<",
        next_text: ">",
    });

    $("#Video-Pagination").pagination(num_video_entries, {
        callback: videoSelectCallback,
        items_per_page: 3,
        num_display_entries: 3,
        num_edge_entries: 1,
        prev_text: "<",
        next_text: ">",
    });
}



soundManager.url = '/swf/';
soundManager.flashVersion = 9;
soundManager.useHTML5Audio = true;
soundManager.debugMode = false;

jQuery.colorbox.settings.maxWidth = '90%';
jQuery.colorbox.settings.maxHeight = '90%';

// Resize Colorbox when resizing window or changing mobile device orientation
var resizeTimer;

function resizeColorBox() {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
        if (jQuery('#cboxOverlay').is(':visible')) {
            jQuery.colorbox.reload();
        }
    }, 300);
}

function resetAdressBarURL() {
    window.history.replaceState('Larry King Orchestra', 'Larry King Orchestra', '/');
}

function sendAjaxRequest() {
    $.get(linkHref,
        function(data) {
            $('#lkobody').html(data);
        }).done(
        function() {
            window.history.replaceState('Larry King Orchestra', linkHtml, linkHref);
            $('.navlink').off('click');
            window.scrollTo(0, 0);
        });
}

function resizeLogoInAbout() {
    var divHeight = $('section.about.row > article > section > div > div:nth-child(2)').height();
    $('section.about.row > article > section > div > div.col-lg-3.col-md-3.col-sm-3 > img').css('max-height', divHeight);
}

$(document).ready(function() {
    setSliderMaxHeightToWindowHeight();
    setLogoHeightAndWidth();
    resizeMusicianWidths();
    resizeMusicianDescriptions();
    resizeLogoInAbout();
    initPagination();

    $(document).on('click', '.navlink', function() {
        linkHref = $(this).attr('href');
        linkHtml = $(this).html();



        if (location.pathname.search('/raves-reviews/') > -1) {

            if (linkHref.search('/raves-reviews/') < 0 && linkHref !== '/#contact' && linkHref !== '/#links' && linkHref !== '/#raves-reviews') {
                $.get(linkHref,
                    function(data) {
                        $('#lkobody').html(data);
                    }).done(
                    function() {
                        resetAdressBarURL();
                        target = linkHref.replace('/', '');

                        linkHref = linkHref.replace('#', '');
                        if (linkHref === '/home') {
                            linkHref = '/';
                        }

                        window.history.replaceState('Larry King Orchestra', linkHtml, linkHref);

                        setLogoHeightAndWidth();
                        resizeMusicianWidths();
                        resizeMusicianDescriptions();
                        resizeLogoInAbout();
                        initPagination();
                        $(".gallery-link").colorbox({
                            rel: 'group2',
                            transition: "fade"
                        });
                        $(".youtube").colorbox({
                            iframe: true,
                            innerWidth: 640,
                            innerHeight: 390,
                            rel: 'video',
                            transition: "fade"
                        });
                        $(".biographies").colorbox({
                            rel: 'biographies',
                            top: "20px",
                            transition: "fade",
                            iframe: true,
                            width: "90%",
                            height: "80%"
                        });

                        $("body img").on("load", function() {
                            console.log(target);
                            window.scrollTo(0, (($(target).offset().top)));
                        });
                        //$('.navlink').off('click');



                    });


            } else if (linkHref === '/#contact' || linkHref === '/#links' || linkHref === '/#raves-reviews') {
                resetAdressBarURL();

                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
                if (linkHref === '/#raves-reviews') {
                    linkHref = $('#lkobody > section > article > div > header > div > div.table-cell.col-lg-4.col-md-4.col-sm-4.col-xs-12.text-center > span').html();
                    linkHref = linkHref.replace(/ /g, '-').toLowerCase();
                    linkHref = '/' + linkHref;
                }
                linkHref = linkHref.replace('#', '');
                linkHref = '/raves-reviews' + linkHref;
                window.history.replaceState('Larry King Orchestra', linkHtml, linkHref);

            } else {
                sendAjaxRequest();
            }

        } else {
            resetAdressBarURL();

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);

                target = target.length ? target : $('[name=' + this.hash + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                }
                linkHref = linkHref.replace('#', '');
                if (linkHref === '/home') {
                    linkHref = '/';
                }
                window.history.replaceState('Larry King Orchestra', linkHtml, linkHref);
            } else {
                sendAjaxRequest();
            }
        }
        return false;
    });


    //put your own soundcloud key here
    $('#fap').fullwidthAudioPlayer({
        autoPlay: true
    });
    $(".gallery-link").colorbox({
        rel: 'group2',
        transition: "fade"
    });
    $(".youtube").colorbox({
        iframe: true,
        innerWidth: 640,
        innerHeight: 390,
        rel: 'video',
        transition: "fade"
    });
    $(".raves-and-reviews-link").colorbox({
        rel: 'group3',
        transition: "fade"
    });

    $(".3-pager").colorbox({
        rel: '3-pager',
        transition: "fade",
        top: "20px",
        width: "90%",
        height: "80%"
    });

    $(".biographies").colorbox({
        rel: 'biographies',
        top: "20px",
        transition: "fade",
        iframe: true,
        width: "90%",
        height: "80%"
    });
    $(".lko-press-cbox").colorbox({
        rel: 'lko-press',
        top: "20px",
        transition: "fade"
    });

    $('#fap').bind('onFapReady', function(evt) {
        $('.fap-cover-replace-small > span').html('<img src="http://i1.sndcdn.com/artworks-000070021631-te9lnj-large.jpg?435a760" style="border: 1px solid #e0e0e0;">');
        $('#fap-cover-replacement > span').html('<img src="http://i1.sndcdn.com/artworks-000070021631-te9lnj-large.jpg?435a760" class="img-responsive">');
    });

});

$(window).resize(function() {
    setSliderMaxHeightToWindowHeight();
    setLogoHeightAndWidth();
    resizeMusicianWidths();
    resizeMusicianDescriptions();
    resizeLogoInAbout();

    resizeColorBox();
    window.addEventListener("orientationchange", resizeColorBox, false);
});

console.log("Website Brought To You By WavaMedia, Dev: @jemiloii @mrcni COO: Schelle");