/* globals jQuery */
/*

██╗   ██╗███████╗███████╗     █████╗ ██╗     ██╗         ███████╗██╗██╗   ██╗███████╗
██║   ██║██╔════╝██╔════╝    ██╔══██╗██║     ██║         ██╔════╝██║██║   ██║██╔════╝
██║   ██║███████╗█████╗      ███████║██║     ██║         █████╗  ██║██║   ██║█████╗
██║   ██║╚════██║██╔══╝      ██╔══██║██║     ██║         ██╔══╝  ██║╚██╗ ██╔╝██╔══╝
╚██████╔╝███████║███████╗    ██║  ██║███████╗███████╗    ██║     ██║ ╚████╔╝ ███████╗
 ╚═════╝ ╚══════╝╚══════╝    ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═══╝  ╚══════╝

Author: Jason Farrell & Zach Brown
Author URI: http://useallfive.com/

Description: A simple jQuery CSS Slideshow for wiping between frames.
Package URL: https://github.com/UseAllFive/wipe

*/
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
            onSlideAdd: function() {},
            onSlideRemove: function() {}
        };

        (function init() {
            var $currentSlide;
            opts = $.extend(defaultOpts, opts);
            $slides.each(function() {
                remove($(this));
            });
            $currentSlide = $($slides[currentSlide]);
            add($currentSlide);
            $currentSlide.addClass(opts.currentSlideSelector);
            $slides.bind('transitionend', function(e) {
                //-- Only handle transitions on this slide:
                if ($(e.target).is($(this))) {
                    remove($(this));
                    $(this).removeClass(opts.currentSlideSelector);
                }
            });
            start();
        })();

        function start() {
            pause();
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
                var $slide = $(this);
                if (
                    $slide.is($current) === false &&
                    $slide.is($next) === false
                ) {
                    remove($slide);
                    $slide.removeClass(opts.currentSlideSelector);
                }
            });

            add($next);
            resetClipping($next);
            resetClipping($current);
            $next.css({'z-index': 1});
            $current.css({'z-index': 2});
            $next.addClass(opts.currentSlideSelector);
            if (direction === 'r2l') {
                fadeRightClipping($current);
            } else {
                fadeLeftClipping($current);
            }

            if ('transition' in document.body.style === false) {
                $current.trigger('transitionend');
            }

            start();
        }

        function remove($slide) {
            $slide.hide();
            if (typeof opts.onSlideRemove === 'function') {
                opts.onSlideRemove($slide);
            }
        }

        function add($slide) {
            $slide.show();
            if (typeof opts.onSlideAdd === 'function') {
                opts.onSlideAdd($slide);
            }
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
        };

    };
}));
