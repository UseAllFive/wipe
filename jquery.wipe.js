/* globals jQuery */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    $.fn.wipe = function(opts) {
        var $container = this;
        var $slides = $container.children();
        var currentSlide = 0;
        var interval;
        var defaultOpts = {
            currentSlideSelector: 'wipeCurrentSlide',
            transitionSpeed: 1000,
            pauseTime: 2000,
            after: function() {},
            before: function() {}
        };

        (function init() {
            var $currentSlide;
            opts = $.extend(defaultOpts, opts);
            $slides.hide();
            $currentSlide = $($slides[currentSlide]);
            $currentSlide.show();
            $currentSlide.addClass(opts.currentSlideSelector);
            $slides.bind('transitionend', function(e) {
                //-- Only handle transitions on this slide:
                if ($(e.target).is($(this))) {
                    $(this).hide();
                    $(this).removeClass(opts.currentSlideSelector);
                }
            });
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
            //-- Hide the slides that aren't the current two:
            $slides.each(function() {
                $slide = $(this);
                if (
                    $slide.is($current) === false &&
                    $slide.is($next) === false
                ) {
                    $slide.hide();
                    $slide.removeClass(opts.currentSlideSelector);
                }
            })

            $next.show();
            $current.show();
            resetClipping($next);
            resetClipping($current);
            $next.css({'z-index': 1});
            $current.css({'z-index': 2});
            $next.addClass(opts.currentSlideSelector);
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

        function terminate() {
            pause();
            $slides.unbind();
        }

        return {
            next: next,
            pause: pause,
            prev: prev,
            start: start,
            terminate: terminate
        }

    };
}));
