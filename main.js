/////////////// whole js(content animations, funcionality) load after 1s setTimeout render() /////Main objective: to show loader,  minor: to load jquerys from https.
$(window).on('load', function () {
    function load(){

        // hide loader
        $('.loader').css("display","none");
        // set top website after refresh
        $(window).scrollTop(0);
        // do open animations on main section
        $('.about-content h1, .about-content p.txt1, .about-content .txt2').stop().css({"transform":"translate(0, 0)","opacity":"1"});
        $('section.about img').stop().css({"transform":"translate(-50%,-50%) scale(1)","filter": "blur(10px)", "opacity": ".1"});
        $('div.more').stop().css({"transform":"translate(-50%,0) scale(1)","opacity":"1"});
        $('.container-sidenav-content img, .container-sidenav-content .burger svg').stop().css("opacity","1");
        $('.container-sidenav-content span.scrollspy, .container-sidenav-content ul li').stop().css({"transform":"translate(0, 0)","opacity":"1"});
        ///reset form
        $('form input').val("");
        $('form textarea').val("");

        ///////////////  scroll to specific section on click li navbar
        $('.container-sidenav-content ul li:nth-child(1)').on("click", () => {
            let new_position = $('section.about').offset();
            $('html, body').stop().animate({ scrollTop: new_position.top }, 1200, 'easeInOutQuad');
        })
        $('.container-sidenav-content ul li:nth-child(2)').on("click", () => {
            let new_position = $('section.projects').offset();
            $('html, body').stop().animate({ scrollTop: new_position.top }, 1200, 'easeInOutQuad');
        })
        $('.container-sidenav-content ul li:nth-child(3)').on("click", () => {
            let new_position = $('section.contact').offset();
            $('html, body').stop().animate({ scrollTop: new_position.top }, 1200, 'easeInOutQuad');
        })

        /////////////// burger menu on click expand ul
        $('.burger').on("click", () => {
            $('.container-sidenav-content ul').slideToggle(700, "easeOutQuad");

            $(window).resize(function(){ 
                if ($(window).width() > 800){
                    $('.container-sidenav-content ul').removeAttr('style');
                }
            });
        })

        /////////////// expand div more discription
        $('div.more').on("click", (e) => {
            $('.about-content p.txt3').slideToggle(700, "easeOutQuad");
            $(e.target).text() == "MORE" ? $(e.target).text('LESS') : $(e.target).text('MORE')
        })

        /////////////// contact button click / check if input and textarea is not empty
        $('form button').on("click", (e) => {
            if ( $('form input').val().length == 0 || $('form textarea').val().length == 0 ) {
                e.preventDefault();
            }
        })

        /////////////// do 2 function on scroll
        $(window).scroll(function(){ 
            right_menu_on_scroll();
            content_on_scroll()
        });

        /////////////// scrollSpy right nav menu effects
        function right_menu_on_scroll(){

            let s1 = $('section.about').height();
            let s2 = $('section.projects').height();

            const dotScroll = $('.container-sidenav-content span.scrollspy');
            const liMenu1 = $('.container-sidenav-content ul li:nth-child(1)');
            const liMenu2 = $('.container-sidenav-content ul li:nth-child(2)');
            const liMenu3 = $('.container-sidenav-content ul li:nth-child(3)');
            
            if ($(window).scrollTop() < (s1 / 2)){
                dotScroll.css({"top":"84px"});
                liMenu1.addClass('active');
                liMenu2.add(liMenu3).removeClass('active');
            } else  if ($(window).scrollTop() > (s1 / 2) && $(window).scrollTop() < s1 + (s2/2)){
                dotScroll.css({"top":"124px"});
                liMenu2.addClass('active');
                liMenu1.add(liMenu3).removeClass('active');
            } else  if ($(window).scrollTop() > (s1 / 2)){
                dotScroll.css({"top":"164px"});
                liMenu3.addClass('active');
                liMenu1.add(liMenu2).removeClass('active');
            }
        }

        /////////////// scrollSpy on main content do animations on elements in sections depending on scroll position
        function content_on_scroll(){
            let s1 = $('section.about').height();
            let s2 = $('section.projects').height();

            if ( $(window).scrollTop() < s1 / 2   ) {
                ///add
                $('.about-content h1, .about-content p.txt1, .about-content p.txt2').stop().css({"transform":"translate(0px, 0)","opacity":"1"});
                $('div.more').stop().css({"transform":"translate(-50%,0) scale(1)","opacity":"1"});
                ///remove
                $('.project-grid').removeAttr('style');
            } else if ( $(window).scrollTop() > s1 / 2 && $(window).scrollTop() <  ((s1 + s2) - (s2 / 3)) )  {
                ///add
                $('.project-grid').stop().css({"transform":"translate(0px, 0)","opacity":"1"});
                 ///remove
                $('.about-content h1, .about-content p.txt1, .about-content p.txt2, .about-content p.txt3, div.more').removeAttr('style');
                $('section.contact form h1, section.contact form p.txt1, section.contact form p.txt2, section.contact form input, section.contact form textarea, section.contact form button').removeAttr('style');
            } else if ($(window).scrollTop() > ((s1 + s2) - (s2 / 3)) ) {
                ///add
                $('section.contact form h1, section.contact form p.txt1, section.contact form p.txt2').stop().css({"transform":"translate(0px, 0)","opacity":"1"});
                $('section.contact form input,section.contact form textarea, section.contact form button').stop().css({"transform":"scale(1)","opacity":"1"});
                $('section.contact img').stop().css({"transform":"translate(-50%,-50%) scale(1)","filter": "blur(10px)", "opacity": ".1"});
                ///remove
                $('.project-grid').removeAttr('style');
            }
        }
    }

setTimeout(load, 1000);
});