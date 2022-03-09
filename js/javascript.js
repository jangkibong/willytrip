//내비게이션
$(function(){
    const $menu = $('header>nav>ul.gnb>li>a')
    const $logo = $('.ci');
    let arrArticleTop = [];
    arrArticleTop[0] = $("article:nth-of-type(1)").offset().top;
    arrArticleTop[1] = $("article:nth-of-type(2)").offset().top;
    arrArticleTop[2] = $("article:nth-of-type(3)").offset().top;
    arrArticleTop[3] = $("article:nth-of-type(4)").offset().top;

    //메뉴클릭
    $menu.on('click', function(evt){
        evt.preventDefault();
        //현재 인덱스
        nowIdx = $menu.index(this);
        console.log(nowIdx);

        //스크롤이동
        $('html, body').stop().animate({
            scrollTop : arrArticleTop[nowIdx]-105
        });
    });

    //로고클릭
    $logo.on('click', function(evt){
        evt.preventDefault();
        $('html, body').stop().animate({
            scrollTop : 0
        },1500);
    });

    $('section>article>.pht>.play').on('click', function(evt){
        evt.preventDefault();
    });

    //다운버튼 클릭
    $('.down').on('click', function(evt){
        evt.preventDefault();
        $('html, body').stop().animate({
            scrollTop : arrArticleTop[0]-105
        },2000);
    });

    //다운스크롤 취소
    $('.donw').not('.down').on('click', function(){
        $('html, body').stop()
    });

    //스크롤
    $(window).on('scroll', function(){
        let scrollTop = $(window).scrollTop();
        // console.log(scrollTop);
        for(let i=0; i<4; i++){
            if(scrollTop > arrArticleTop[i]-500){
                $menu.eq(i).parent().addClass('on').siblings().removeClass('on');
            }else if(scrollTop < arrArticleTop[0]-400){
                $menu.parent().siblings().removeClass('on');
            }
        }

    });
});

//슬라이드 배너
$(function(){
    const $play_slide = $('header>.banner>.play');
    const $pause_slide = $('header>.banner>.pause');
    const $slide = $('header>.banner>.slide_container');
    const $indicator = $('.indicator>li>a');
    const $prev_banner = $('header>.banner>.prev')
    const $next_banner = $('header>.banner>.next')

    let nowIdx = 0;

    let intervalKey = null;

    const slide_animate = function(){
        clearInterval(intervalKey);
        $indicator.parent().eq(nowIdx).addClass('on').siblings().removeClass('on');
        $slide.stop().animate({
            left : -($slide.width() * nowIdx)
        });
        $play_slide.show();
        $pause_slide.hide();
    }

    const slide_auto = function(){
        clearInterval(intervalKey);
        intervalKey = setInterval(function(){
            if(nowIdx < 3){
                nowIdx ++;
            }else{
                nowIdx = 0;
            }
            $indicator.parent().eq(nowIdx).addClass('on').siblings().removeClass('on');
            $slide.stop().animate({
            left : -($slide.width() * nowIdx)
            });
        },3000);
    }

    $(window).on('load',function(){
        $play_slide.hide();
        $pause_slide.show();
        slide_auto();
    });

    //슬라이드 재생버튼 클릭 이벤트
    $play_slide.on('click', function(evt){
        evt.preventDefault();

        $play_slide.hide();
        $pause_slide.show();
        
        slide_auto();
    });
    //슬라이드 일시정지버튼 클릭 이벤트
    $pause_slide.on('click', function(evt){
        evt.preventDefault();

        $play_slide.show();
        $pause_slide.hide();

        clearInterval(intervalKey);
    });

    //인디케이터 클릭 이벤트
    $indicator.on('click', function(evt){
        evt.preventDefault();
        
        clearInterval(intervalKey);
        //슬라이드 이동
        nowIdx = $indicator.index(this);

        // console.log('old',oldIdx)
        // console.log('now',nowIdx)
        // console.log($slide.width()*nowIdx);

        slide_animate();
    });

    //슬라이드 이전, 다음 버튼 클릭이벤트
    $prev_banner.on('click', function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);

        if(nowIdx > 0){
            nowIdx--;            
        }else{nowIdx = 3;}

        console.log('슬라이드 nowIdx', nowIdx)
        slide_animate();
    });

    $next_banner.on('click', function(evt){
        evt.preventDefault();
        clearInterval(intervalKey);
        
        if(nowIdx < 3){
            nowIdx++;            
        }else{nowIdx = 0;}
        
        console.log('슬라이드 nowIdx', nowIdx)
        slide_animate();
    });
});

//페이드슬라이드
$(function(){
    const $thumb = $('section>article>.info_container>.thumb>li>a')
    const $fadeImg = $('section>article>.pht>.container>li')
    const $prev_fade = $('section>article>.pht>.prev>a')
    const $next_fade = $('section>article>.pht>.next>a')

    const $play_fade = $('section>article>.pht>.play>a');
    const $pause_fade = $('section>article>.pht>.pause>a');

    let nowIdx = [0, 4, 8, 12];
    let oldIdx = [0, 4, 8, 12];
    let thumbIdx = 0;
    let intervalKey=null;
    
    //페이지 로드이벤트
    
    //썸네일 클릭 이벤트
    $thumb.on('click', function(evt){
        evt.preventDefault();
        //썸네일 활성화
        $(this).parent().addClass('on').siblings().removeClass('on');
        
        //현재 클릭한 버튼의 아티클 인덱스 추출
        const articleIdx = ($(this).parents('article').index())-1;
        console.log("articleIdx",articleIdx);

    
        //클릭한 썸네일의 인덱스 번호와 이전 인덱스 번호 추출
        thumbIdx = $thumb.index(this);
        console.log(thumbIdx);

        if(thumbIdx <= 3){
            oldIdx[0] = nowIdx[0];
            nowIdx[0] = thumbIdx;
        }else if(thumbIdx <= 7){
            oldIdx[1] = nowIdx[1];
            nowIdx[1] = thumbIdx
        }else if(thumbIdx <= 11){
            oldIdx[2] = nowIdx[2];
            nowIdx[2] = thumbIdx
        }else if(thumbIdx <= 15){
            oldIdx[3] = nowIdx[3];
            nowIdx[3] = thumbIdx
        }

        console.log('oldidx', oldIdx);
        console.log('nowidx', nowIdx);
        
        //페이드 전환효과
        $fadeImg.eq(oldIdx[articleIdx]).fadeOut();
        $fadeImg.eq(nowIdx[articleIdx]).fadeIn();

        //재생 정지
        $('article').eq(articleIdx).find($play_fade).show();
        $('article').eq(articleIdx).find($pause_fade).hide();

    });

    //이전 버튼 클릭 이벤트
    $prev_fade.on('click', function(evt){
        evt.preventDefault();

        //현재 클릭한 버튼의 아티클 인덱스 추출
        const articleIdx = ($(this).parents('article').index())-1;
        console.log("articleIdx",articleIdx);
        
        //아티클 별 다음 인덱스 번호 추출
        if(articleIdx == 0){
            oldIdx[0] = nowIdx[0];
            nowIdx[0] --;
            if(nowIdx[0] < 0){nowIdx[0] = 3;}
        }else if(articleIdx == 1){
            oldIdx[1] = nowIdx[1];
            nowIdx[1] --;
            if(nowIdx[1] < 4){nowIdx[1] = 7;}
        }else if(articleIdx == 2){
            oldIdx[2] = nowIdx[2];
            nowIdx[2] --;
            if(nowIdx[2] < 8){nowIdx[2] = 11;}
        }else if(articleIdx == 3){
            oldIdx[3] = nowIdx[3];
            nowIdx[3] --;
            if(nowIdx[3] < 12){nowIdx[3] = 15;}
        }
        
        console.log(nowIdx)

        //이미지 페이드 전환
        $fadeImg.eq(oldIdx[articleIdx]).fadeOut();
        $fadeImg.eq(nowIdx[articleIdx]).fadeIn();

        //썸네일활성화
        $thumb.parent().eq(nowIdx[articleIdx]).addClass('on').siblings().removeClass('on');

        //재생 정지
        $('article').eq(articleIdx).find($play_fade).show();
        $('article').eq(articleIdx).find($pause_fade).hide();
    });

    // 다음 버튼 클릭 이벤트
    $next_fade.on('click', function(evt){
        evt.preventDefault();
      
        //현재 클릭한 버튼의 아티클 인덱스 추출
        const articleIdx = ($(this).parents('article').index())-1;
        console.log("articleIdx",articleIdx);
        
        //아티클 별 다음 인덱스 번호 추출
        if(articleIdx == 0){
            oldIdx[0] = nowIdx[0];
            nowIdx[0] ++;
            if(nowIdx[0] > 3){nowIdx[0] = 0;}
        }else if(articleIdx == 1){
            oldIdx[1] = nowIdx[1];
            nowIdx[1] ++;
            if(nowIdx[1] > 7){nowIdx[1] = 4;}
        }else if(articleIdx == 2){
            oldIdx[2] = nowIdx[2];
            nowIdx[2] ++;
            if(nowIdx[2] > 11){nowIdx[2] = 8;}
        }else if(articleIdx == 3){
            oldIdx[3] = nowIdx[3];
            nowIdx[3] ++;
            if(nowIdx[3] > 15){nowIdx[3] = 12;}
        }
        console.log('oldIdx',oldIdx)
        console.log('nowIdx',nowIdx)
        
        //이미지 페이드 전환
        $fadeImg.eq(oldIdx[articleIdx]).fadeOut();
        $fadeImg.eq(nowIdx[articleIdx]).fadeIn();

        //썸네일활성화
        $thumb.parent().eq(nowIdx[articleIdx]).addClass('on').siblings().removeClass('on');
        
        //재생 정지
        $('article').eq(articleIdx).find($play_fade).show();
        $('article').eq(articleIdx).find($pause_fade).hide();
    })

    //슬라이드 재생버튼 클릭 이벤트
    $play_fade.on('click', function(evt){
        evt.preventDefault();

        //현재 클릭한 버튼의 아티클 인덱스 추출
        const articleIdx = ($(this).parents('article').index())-1;
        console.log("articleIdx",articleIdx);

        clearInterval(intervalKey);
        
        intervalKey = setInterval(function(){
            //아티클 별 다음 인덱스 번호 추출
            if(articleIdx == 0){
                oldIdx[0] = nowIdx[0];
                nowIdx[0] ++;
                if(nowIdx[0] > 3){nowIdx[0] = 0;}
            }else if(articleIdx == 1){
                oldIdx[1] = nowIdx[1];
                nowIdx[1] ++;
                if(nowIdx[1] > 7){nowIdx[1] = 4;}
            }else if(articleIdx == 2){
                oldIdx[2] = nowIdx[2];
                nowIdx[2] ++;
                if(nowIdx[2] > 11){nowIdx[2] = 8;}
            }else if(articleIdx == 3){
                oldIdx[3] = nowIdx[3];
                nowIdx[3] ++;
                if(nowIdx[3] > 15){nowIdx[3] = 12;}
                
            }
            console.log('oldIdx',oldIdx)
            console.log('nowIdx',nowIdx)
            
            //이미지 페이드 전환
            $fadeImg.eq(oldIdx[articleIdx]).fadeOut();
            $fadeImg.eq(nowIdx[articleIdx]).fadeIn();

            //썸네일활성화
            $thumb.parent().eq(nowIdx[articleIdx]).addClass('on').siblings().removeClass('on');
        },3000);
        
        //재생
        $('article').eq(articleIdx).find($play_fade).hide();
        $('article').eq(articleIdx).siblings().find($play_fade).show();
        $('article').eq(articleIdx).find($pause_fade).show();
        $('article').eq(articleIdx).siblings().find($pause_fade).hide();
    });

    //슬라이드 일시정지버튼 클릭 이벤트
    $pause_fade.on('click', function(evt){
        evt.preventDefault();

        //현재 클릭한 버튼의 아티클 인덱스 추출
        const articleIdx = $(this).parents('article').index();

        clearInterval(intervalKey);

        //재생 정지
        $('article').eq(articleIdx).find($play_fade).show();
        $('article').eq(articleIdx).find($pause_fade).hide();
    });
});

