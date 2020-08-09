<div class="home_page">
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="https://cdn.bootcss.com/typed.js/1.1.1/typed.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <div class="container">
        <div class="text__container">
        <div class="element blue"></div>
        </div>
        
        <a href="#" class="box" id="box1">Some samples of our work</a>
        <a href="#" class="box" id="box2">A little bit about our people</a>
        <a href="#" class="box" id="box3">Our approach to marketing</a>
        
    </div>
    </div>
    <style>
        @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
        ::selection {
        background: #fff !important;
        color: #17c9cd;
        }

        ::-moz-selection {
        background: #fff !important;
        color: #17c9cd;
        }

        .home_page {
        margin: 0;
        color: #fff;
        background-color: #17c9cd; 
        font-weight: 900;
        font-size: 65px;
        text-transform: uppercase;
        }

        .home_page .container {
        width: 200vw;
        height: 100vh;
        display: block;
        overflow: hidden;
        }
        .home_page .container .text__container {
        display: block;
        float: left;
        width: 100%;
        max-width: unset;
        margin: 0 auto 0 0;
        height: 60vh;
        /*padding-right: 30%;*/
        }
        .home_page .container .text__container .element {
        padding: 0.5em;
        width: calc( 100% - 1em);
        display: inline-block;
        }
        .home_page  .container .box {
        width: calc(100% / 3);
        font-size: 36px;
        padding: 2em;
        display: block;
        float: left;
        height: 40vh;
        margin-top: 40vh;
        text-decoration: none;
        color: white;
        transition: .25s all ease-in-out;
        }
        .home_page .container .box:hover {
        transform: translateY(-30px);
        }
        .home_page .container #box1 {
        background-color: #14b3b6;
        }
        .home_page .container #box2 {
        background-color: #129c9f;
        }
        .home_page .container #box3 {
        background-color: #0f8688;
        }

        .home_page .typed-cursor {
        opacity: 1;
        display: inline;
        -webkit-animation: blink 0.7s infinite;
        -moz-animation: blink 0.7s infinite;
        animation: blink 0.7s infinite;
        }

        @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
        }
        @-webkit-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
        }
        @-moz-keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
        }

    </style>

    <script>
    $(function Typed(callback) {

    $(".element").typed({
    strings: ["Hi there! ^500 <br> <br> Today is National Amaretto Day. How weird is that?!", "^500 What can we show you today?"],
    typeSpeed: -100,
    backSpeed: -350,
    showCursor: false,
    callback: function() {
        var duration = 250;

        $('#box1,#box2,#box3').each(function(i) {
        $(this).delay(i * (duration / 3)).animate({
            'margin-top': '0'
        }, duration);
        });
    }
    });
    }); 
    </script>

</div>