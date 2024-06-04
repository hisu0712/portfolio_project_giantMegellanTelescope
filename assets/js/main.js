(function(){ // 전역 변수 사용을 피하기 위해
    // 스크롤
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    
    gsap.ticker.add((time)=>{
      lenis.raf(time * 600)
    })
    
    gsap.ticker.lagSmoothing(0)

    // 시작
    var HeaderHeight = "52px";

    function startAni(){
        const timeline = gsap.timeline({
            onComplete: function(){
                $("body").removeClass("hidden");
                $(".body_bg").remove();
            }
        });
        timeline.to(".body_bg .col-mid", {transform: "scaleY(0)", duration:1})
                .to(".body_bg .col-left, .body_bg .col-right", {transform: "scaleX(0)", ease: "easeInOut", duration:0.5})
                .to(".header_bg", {height: HeaderHeight, ease: "easeInOut", duration:0.5})
                .to(".sc-visual .title-area span.one .char", { yPercent: 0, delay:0.1, stagger: {each: 0.06} }, "char")
                .to(".sc-visual .title-area span.two .char", { yPercent: 0, delay:0.1, stagger: {each: 0.06} }, "char")
                .to(".sc-visual .title-area span.three .char", { yPercent: 0, delay:0.1, stagger: {each: 0.06} }, "char");
    }

    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.display = 'none';
        startAni();
    });

    new SplitType(".sc-visual .title-area span", {type: "chars"});
    gsap.set(".sc-visual .title-area span .char", {yPercent: -100});

    // header
    $("#header .add-area .lang-box.en").on("click", function(){
        $("#header .lang-wrap .btn-open").toggleClass("on");
        $("#header .lang-wrap .lang-box.es").toggleClass("on");
    })

    var subMenuHeight = 0;
    $("#header .nav-area.pc .main-menu > li").hover(
        function(){
            subMenuHeight = $(this).find(".sub-menu").height() + 15;
            $(".header_bg").css("--subMenuHeight", subMenuHeight + "px");
            $(this).find(".sub-menu").addClass("on");
        }, function(){
            $("#header .nav-area .sub-menu").removeClass("on");
            $(".header_bg").css("--subMenuHeight", 0);
        }
    )
    if ($(window).width() > 768) {
        $("#header .nav-area.moblie .main-menu > li").hover(
            function(){
                $(this).find(".sub-menu").addClass("on");
                $(this).siblings().css("opacity", "0.5");
                $(this).css("opacity", "1");
            }, function(){
                $("#header .nav-area .sub-menu").removeClass("on");
            }
        )
        $("#header .nav-area.moblie .main-menu").hover(
            null,
            function(){
                $(this).find("li").css("opacity", "1");
            }
        )
    } else {
        $("#header .nav-area.moblie .main-menu").hover(
            null
        )
        $("#header .nav-area.moblie .main-menu > li > a").on("click", function(e){
            e.preventDefault()
            $("#header .nav-area.moblie .sub-menu").removeClass("on");
            $(this).parent().find(".sub-menu").toggleClass("on");
        })
    }

    $("#header .moblie-menu ").on("click", function(){
        $("#header .moblie-menu .labels .menu").toggleClass("hide");
        $("#header .moblie-menu .icons").toggleClass("close");
        $("#header .moblie-menu .icon").toggleClass("close");
        $("#header .header_bg").toggleClass("on");
        $("#header .nav-area.moblie .main-menu-wrap").toggleClass("on");
        $("body").toggleClass("hidden");
    })

    // sc-visual
    imgList = ``;
    for (let i = 0; i < 297; i++) {
        firstClass = (i === 0)?"on":"";
        imgList += `<img class="${firstClass}" src="./assets/images/visual/visual_${i + 1}.jpg" alt>`
    }
    $(".sticky-content").html(imgList);

    ScrollTrigger.create({
        trigger: ".sc-visual",
        start: "0% 0%",
        end: "100% 50%",

        onUpdate: function(self){
            totalCnt = $(".sticky-content img").length;

            imgIndex = Math.round(self.progress*(totalCnt - 1));

            imgIndex = imgIndex < 1 ? 1 : imgIndex;

            currentImage = $(".sticky-content img.on");
            newImage = $(".sticky-content img").eq(imgIndex);

            if (currentImage) {
                currentImage.removeClass("on");
            }
            if (newImage) {
                newImage.addClass("on");
            }
        }
    })

    gsap.to(".sc-visual .title-area", {
        opacity: 0.5,
        transform: "scale(0.7)",
        scrollTrigger: {
            trigger: ".sc-visual .title-area",
            start: "0% 0%",
            end: "50% 0%",
            scrub: true,
        }
    })

    $(".sc-visual .text-area p").each(function(idx, el){
        gsap.from(el, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "10% 80%",
                end: "90% 65%",
                scrub: true,
            }
        })
    })

    gsap.to(".sc-visual .scroll-wrap", {
        y: 150,
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-tech .headline",
            start: "bottom 80%",
            end: "bottom 40%",
            scrub: true,
        }
    })

    $(".sc-visual .popup-open").on("click", function(){
        $(".sc-visual .popup-view").addClass("on");
    })
    $(".sc-visual .popup-view .popup-close").on("click", function(){
        $(".sc-visual .popup-view").removeClass("on");
    })

    // sc-tech
    var ContentGmtSize = 0;
    var ContentGmtX = 0;
    var ContentGmtY = 0;

    function updateContentGmtVars(size, x, y) {
        ContentGmtSize = size;
        ContentGmtX = x;
        ContentGmtY = y;
    }

    $(window).resize(function() {
        updateContentGmtVars();
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1780px)", () => {
        updateContentGmtVars("scale(3)", window.innerHeight / 4 + 200, -window.innerHeight - 90);
    })

    mm.add("(min-width: 1581px) and (max-width: 1780px)", () => {
        updateContentGmtVars("scale(2.8)", window.innerHeight / 4 + 180, -window.innerHeight - 100);
    });
    
    mm.add("(min-width: 1371px) and (max-width: 1580px)", () => {
        updateContentGmtVars("scale(2.5)", window.innerHeight / 4 + 160, -window.innerHeight - 150);
    });
    
    mm.add("(min-width: 1281px) and (max-width: 1370px)", () => {
        updateContentGmtVars("scale(2.2)", window.innerHeight / 4 + 150, -window.innerHeight - 150);
    });
    
    mm.add("(min-width: 1041px) and (max-width: 1280px)", () => {
        updateContentGmtVars("scale(2.1)", window.innerHeight / 4 + 100, -window.innerHeight - 150);
    });
    
    mm.add("(max-width: 1040px)", () => {
        updateContentGmtVars("scale(1.9)", window.innerHeight / 4 + 80, -window.innerHeight - 200);
    });

    mm.add("(min-width: 767px)", ()=> {
        let sizeTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".sc-tech",
                start: "90% 95%",
                end: "100% 95%",
                scrub: true,
            }
        });
        
        sizeTimeline.from(".sc-tech .tech_bg", {
            opacity: 0,
        })
        sizeTimeline.from(".sc-size .chart-content.content-gmt img", {
            opacity: 0,
        })

        sizeTimeline.from(".sc-size .chart-content.content-gmt img", {
            transform: ContentGmtSize,
            x: function(){
                return ContentGmtX;
            },
            y: function(){
                return ContentGmtY;
            },
            scrollTrigger: {
                trigger: ".sc-size",
                start: "0% 70%",
                end: "0% 30%",
                scrub: true,
                invalidateOnRefresh:true,
            }
        })
    });

    // sc-global
    gsap.fromTo(".sc-global .img-area .inner", 
        {
            opacity: 0,
            y: 150,
            transform: "scale(1.3)"
        }, 
        {
            opacity: 1,
            y: 0,
            transform: "scale(1)",
            ease: "none",
            scrollTrigger: {
                trigger: ".sc-global .img-area",
                start: "top bottom",
                end: "40% 70%",
                scrub: true,
            }
        }   
    );
    gsap.fromTo(".sc-global .text-area .headline", 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".sc-global .text-area .headline",
                start: "top 85%",
                end: "bottom 70%",
                scrub: true,
            }
        }
    );
    gsap.fromTo(".sc-global .text-area .desc", 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".sc-global .text-area .desc",
                start: "top bottom",
                end: "+=80 60%",
                scrub: true,
            }
        }
    );

    document.querySelectorAll(".sc-global .text-area .link").forEach(link => {
        gsap.fromTo(link, 
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: link,
                    start: "top bottom",
                    end: "100% 90%",
                    scrub: true,
                }
            }
        );
    });


})();


