$.fn.wipe = function(opts) {
    var $container = this;
    var $slides = $container.children();
    var currentSlide = 0;
    var interval;
    var defaultOpts = {
        transitionSpeed: 1000,
        pauseTime: 2000,
        after: function() {},
        before: function() {}
    };

    (function init() {
        opts = $.extend(defaultOpts, opts);
        $slides.hide();
        $($slides[currentSlide]).show();
        start();
    })();

    function start() {
        interval = setTimeout(function() {
            next();
        }, opts.pauseTime + opts.transitionSpeed);
    }

    function pause() {
        clearInterval(interval);
    }

    function next() {
        var $currentSlide = $($slides[currentSlide]);
        var $nextSlide;

        if (currentSlide + 1 > $slides.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide = currentSlide + 1;
        }

        $nextSlide = $($slides[currentSlide]);
        transitionTwoSlides($currentSlide, $nextSlide);
    }

    function prev() {
        var $currentSlide = $($slides[currentSlide]);
        var $nextSlide;

        if (currentSlide - 1 < 0) {
            currentSlide = $slides.length - 1;
        } else {
            currentSlide = currentSlide - 1;
        }

        $nextSlide = $($slides[currentSlide]);
        transitionTwoSlides($currentSlide, $nextSlide, 'r2l');
    }

    function transitionTwoSlides($current, $next, direction) {
        $slides.hide();
        $next.show();
        $current.show();
        resetClipping($next);
        resetClipping($current);
        $next.css({'z-index': 1});
        $current.css({'z-index': 2});
        if (direction === "r2l") {
            fadeRightClipping($current);
        } else {
            fadeLeftClipping($current);
        }

        pause();
        start();
    }

    function resetClipping($slide) {
        $slide.css({
            //top, left, bottom, right
            '-o-transition': '',
            '-moz-transition': '',
            '-webkit-transition': '',
            transition: '',
            clip: 'rect(0px,' + $slide.width() + 'px, ' + $slide.height() + 'px, 0px)'
        });
    }

    function fadeLeftClipping($slide) {
        $slide.css({
            //top, left, bottom, right
            '-o-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            '-moz-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            '-webkit-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            transition: 'clip ' + opts.transitionSpeed / 1000 + 's',
            clip: 'rect(0px, 0px, ' + $slide.height() + 'px, 0px)'
        });
    }

    function fadeRightClipping($slide) {
        $slide.css({
            //top, left, bottom, right
            '-o-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            '-moz-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            '-webkit-transition': 'clip ' + opts.transitionSpeed / 1000 + 's',
            transition: 'clip ' + opts.transitionSpeed / 1000 + 's',
            clip: 'rect(0px,' + $slide.width() + 'px, ' + $slide.height() + 'px, ' + $slide.width() + 'px)'
        });
    }

    return {
        next: next,
        pause: pause,
        prev: prev,
        start: start
    }

};
