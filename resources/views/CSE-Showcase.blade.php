

<head>
    <link rel="stylesheet" href="<?php echo asset('/css/cse-showcase.css')?>" type="text/css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo asset('/css/header.css')?>" type="text/css">
    <link rel="stylesheet" href="<?php echo asset('/css/footer.css')?>" type="text/css">
</head>


<body>
    <!-- HEADER !-->
    @include("header")
    <!-- END HEADER !-->

    <div class="top-banner" style="background-image: url({{asset('images/showcase-splash.jpg')}})">
        <!--<img id="banner-splash" src="{{asset('images/showcase-splash.jpg')}}"/>!-->
        <div class="top-banner-title">
            <div id="top-banner-title-h1">CS/CSE/IE Capstone Showcase</div>
        </div>
    </div>

    <!-- SHOWCASE COMPONENT !-->
    <div class="showcase-wrapper">
        <?php $i = 0?>
        <?php foreach($list as $listing): ++$i ?>
        <section class="showcase-single">
            <div class="showcase-single-wrapper <?=$i % 2 === 0 ? 'flex-right' : 'flex-left'?>">
                <div class="showcase-single-yt-wrapper individual-wrapper">
                    <!-- <a href="https://www.youtube.com/watch?v=ZAQwg4BtbYo"></a> *TODO: replace with youtube wrapper* !-->
                    <iframe id="yt_frame" src="{{$listing->VideoLink}}"></iframe>
                    <p class="showcase-single-yt-p">
                        Team Members are:   
                    </p>
                    <p class="showcase-single-yt-p">
                        {{$listing->MemberNames}}
                    </p>
                </div>
                <div class="showcase-single-description-wrapper individual-wrapper">
                    <h2 class="showcase-single-description-title <?=$i % 2 === 0 ? 'align-right' : 'align-left'?>">
                        {{$listing->ProjectTitle}}
                    </h2>
                    <p class="showcase-single-description-p">
                        {{$listing->ProjectDescription}}
                    </p>
                </div>
            </div>

        </section>
        <section class="divider-single ">
            <div class="divider individual-wrapper">
            </div>
        </section>
    
        <?php endforeach ?>
    </div>

    <!-- END SHOWCASE COMPONENT !-->

    <!--FOOTER!-->
    @include("footer")
    <!-- END FOOTER !-->
</body>

