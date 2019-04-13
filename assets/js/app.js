var App = function () {

    var winW, winH, docH;
    winH = $(window).height();
    winW = $(window).width();
    docH = $(document).height();


    var modals = function () {

    };

    var maskedInput = function () {
        if ($('input[name=phone]')) {
            $('input[name=phone]').each(function () {
                var maskVal = '+7 (999) 999-9999';

                $(this).inputmask(maskVal);
            });
        }
    };


    var goto = function () {
        $('a[href*="#"]').on('click', function (e) {
            e.preventDefault()
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 300)
        });
    };

    var sendMail = function () {
        $('.send_mail').on('click', function (e) {
            e.preventDefault();


            var $elemParent = $(this).parents('form');
            var phone = $elemParent.find('.formphone').val();
            var name = $elemParent.find('.formname').val();
            var email = $elemParent.find('.formemail').val();
            var source = $elemParent.find('input[name=source]').val();


            var send = true;
            var str;
            if (phone !== '') {
                str = phone.indexOf('_');
            } else {
                str = -1;
            }
            if ((!(str === -1)) || (phone === "")) {
                $($elemParent).find('.formphone').addClass('red');
                send = false;
                alert("Необходимо заполнить номер телефона");
            }

            if (send) {
                $.post("amo/send_mail.php", {name: name, phone: phone, email: email, source: source}, function (data) {
                    $('#modalWindow').modal('hide');
                    $("#modalThanks").modal();

                    $('.formphone').val('');
                    $('.formname').val('');
                    $('.formemail').val('');
                });
            }

            if (!send) {
                return false;
            }
        });

        $("input").on("keyup", function () {
            $(this).removeClass("red");
        });
    };


    var carousel = function () {
        var countItems = 7;
        var winW = $(window).width();
        if (winW < 1220) {
            countItems = 5;
        }
        if (winW < 992) {
            countItems = 3;
        }
        if (winW < 768) {
            countItems = 1;
        }
        var $carousel = $(".carousel__slider").eq(0)
        var carousel = $carousel.waterwheelCarousel({
            flankingItems: countItems,
            separation: 280,
            startingItem: 1,
            separationMultiplier: 0.5,
            horizonOffset: 0,
            horizonOffsetMultiplier: 1,
            sizeMultiplier: 0.85,
            opacityMultiplier: 1.0,
            horizon: 0,
            speed: 300,
            keyboardNav: true,
            imageNav: true,
            linkHandling: 1,
            clickedCenter: function (item) {
                // alert('1')

            }
        });
        $carousel.parents(".tabs").find(".js-next").on("click", function () {
            carousel.next();
        });
        $carousel.parents(".tabs").find(".js-prev").on("click", function () {
            carousel.prev();
        });

    };

    var magnific = function () {
        $('.mfp-image').magnificPopup({type: 'image'});
    };

    var tabs = function () {
        $(".tabs__capt").on("click", function () {
            var $this = $(this);
            if ($this.hasClass("_active")) return false;
            var $parent = $this.parents(".tabs");
            var num = $parent.find(".tabs__capt").index($this);
            $parent.find(".tabs__capt").removeClass("_active");
            $this.addClass("_active");
            $parent.find(".tabs__cont").removeClass("_active")
            $parent.find(".tabs__cont").eq(num).addClass("_active");
        });

        $(".js-create-slider").on("click", function () {
            var countItems = 7;
            var winW = $(window).width();
            if (winW < 1220) {
                countItems = 5;
            }
            if (winW < 992) {
                countItems = 3;
            }
            if (winW < 768) {
                countItems = 1;
            }
            var $this = $(this);
            var $parent = $this.parents(".tabs");
            var index = $parent.find(".tabs__capt").index($this);
            var $carousel = $(".carousel__slider").eq(index);
            var carousel =  $carousel.waterwheelCarousel({
                flankingItems: countItems,
                separation: 280,
                startingItem: 1,
                separationMultiplier: 0.5,
                horizonOffset: 0,
                horizonOffsetMultiplier: 1,
                sizeMultiplier: 0.85,
                opacityMultiplier: 1.0,
                horizon: 0,
                speed: 300,
                keyboardNav: true,
                imageNav: true,
                linkHandling: 1
            });
            $parent.find(".js-next").on("click", function () {
                carousel.next();
            });
            $parent.find(".js-prev").on("click", function () {
                carousel.prev();
            });
        });
    };

    var togglers = function () {
        /* togglers */
        $('.js-menu-toggler').on('click', function () {
            $('.js-menu').toggleClass('-active');
        });
        $('.js-menu a').on('click', function () {
            $('.js-menu-toggler').removeClass('-active');
            $('.js-menu').removeClass('-active');
        });

        $(".js-show-experts").on("click", function () {
           $(this).hide(0);
           $(".experts__block._hidden").removeClass("_hidden");
        });

        $(".js-show-reviews").on("click", function () {
           $(this).hide(0);
           $(".feedback__block._hidden").removeClass("_hidden");
        });

        $(".feedback__more").on("click", function() {
            var parent = $(this).parents(".feedback__block");
            var text = parent.find(".feedback__p");
            text.toggleClass("visible");
            $(this).toggleClass("visible");
            if (text.hasClass("visible")) {
                $(this).text("Свернуть");
            } else {
                $(this).text("Развернуть");
            }
        } );
    };

    var phone = function () {
        var $formPhone = $("form input[name=phone]");

        $formPhone.each(function () {
            var maskVal = '+9 (999) 999-9999';
            $(this).inputmask(maskVal);
        });
    };

    var nom = function () {
        $(".nom__icon").on("click", function (e) {
            e.stopPropagation();
            if ((!$("body").hasClass("-tooltiped1")) && (!$(this).hasClass("-active"))) {
                var $tooltip = $(this).find(".tooltip1");
                $tooltip.show(200);
                $("body").addClass("-tooltiped1");
                $(".nom__icon").removeClass("-active");
                $(this).addClass("-active");
            } else if (($("body").hasClass("-tooltiped1")) && (!$(this).hasClass("-active"))) {
                $(".tooltip1").fadeOut(200);
                $(".nom__icon").removeClass("-active");
                $(this).addClass("-active");
                var $tooltip = $(this).find(".tooltip1");
                $tooltip.show(200);
            } else {

            }
        });

        $(".experts__more").on("click", function (e) {
            e.stopPropagation();
            var $parent = $(this).parents(".experts__block");
            if ((!$("body").hasClass("-tooltiped2")) && (!$parent.hasClass("-active"))) {

                var $tooltip = $parent.find(".tooltip1");
                $tooltip.show(200);
                $("body").addClass("-tooltiped2");
                $(".experts__more").removeClass("-active");
                $(this).addClass("-active");
            } else if (($("body").hasClass("-tooltiped2")) && (!$(this).hasClass("-active"))) {
                $(".tooltip1").fadeOut(200);
                $(".experts__more").removeClass("-active");

                $parent.addClass("-active");
                var $tooltip = $parent.find(".tooltip1");
                $tooltip.show(200);
            } else {

            }
        });

        $(".tooltip1").on("click", function (e) {
            e.stopPropagation();
        });

        $(".tooltip1__button").on("click", function () {

        });

        $("body").on("click", function () {
            if (($("body").hasClass("-tooltiped1")) || ($("body").hasClass("-tooltiped2"))) {
                $(".tooltip1").fadeOut(200);
                $("body").removeClass("-tooltiped1");
                $("body").removeClass("-tooltiped2");

                $(".nom__icon").removeClass("-active");
                $(".experts__block").removeClass("-active");
            }
        });
    };

    var mfp = function () {
        $(".carousel__slider").each(function (index, elem) {
            $(this).find(".mfp-image").magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                zoom: {
                    enabled: true
                },
                gallery: {
                    enabled: true
                }
            });
        })
    };

    var wow1 = function () {
        var winW = $(window).width();
        if (winW < 769) {
            $(".wow").css({"visibility": "visible"});
        } else {
            new WOW().init();
        }

    };

    return {
        init: function () {
            carousel();
            magnific();
            tabs();
            goto();
            togglers();
            phone();
            nom();
            mfp();
            wow1();

        }
    }
}();

$(document).ready(function () {
    App.init();
});