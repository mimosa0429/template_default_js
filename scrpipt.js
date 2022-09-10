jQuery(function($){

/*=================================================
ドロワーメニューの動き
===================================================*/
    //ハンバーガーメニュー
  $('.hamburger').on('click', function () {
    if ($('#header').hasClass('open')) {
      $('#header').removeClass('open');
    } else {
      $('#header').addClass('open');
    }
  });
  
  // #maskのエリアをクリックした時にメニューを閉じる
  $('#mask').on('click', function () {
    $('#header').removeClass('open');
  });
  
  // リンクをクリックした時にメニューを閉じる
  $('#navi a').on('click', function () {
    $('#header').removeClass('open');
  });

/*=================================================
スムーススクロール
===================================================*/
$('a[href^="#"]').on('click', function () {

    var header = jQuery('header').innerHeight();
    var id = $(this).attr('href');
    var position = 0;
    if (id != '#') {
      var position = $(id).offset().top - header;
    }
    // console.log(id);
    // console.log(position);
    $('html,body').animate({
      scrollTop: position
    },
      300);

    return false;

  });
/*=================================================
トップへ戻るボタンの表示
===================================================*/
    let pagetop = $('#to-top');
    // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
    pagetop.hide();

    // スクロールイベント（スクロールされた際に実行）
    $(window).scroll(function() {
    // スクロール位置が700pxを超えた場合
    if ($(this).scrollTop() > 700) {
        // トップに戻るボタンを表示する
        pagetop.fadeIn();

    // スクロール位置が700px未満の場合
    } else {
        // トップに戻るボタンを非表示にする
        pagetop.fadeOut();
    }
    });

    // クリックイベント（ボタンがクリックされた際に実行）
    pagetop.click(function() {
    // 0.5秒かけてページトップへ移動
    $('body,html').animate({scrollTop: 0}, 500);

    // イベントが親要素へ伝播しないための記述
    // ※詳しく知りたい方は「イベント　バブリング」または「jQuery バブリング」で調べてみてください
    return false;
    });


/*=================================================
Q&Aアコーディオン
===================================================*/
$(".career-head-area").on("click", function () {
    $(this).next().slideToggle();
    $(this).children(".career-btn").toggleClass("toggle-on");
});

/*=================================================
プライバシーポリシー　モーダル
===================================================*/
jQuery('.js-close-button').on('click', function(e) {
    e.preventDefault();

    var target = jQuery(this).data('target');
    jQuery(target).hide();
} );

jQuery('.js-open-button').on('click', function(e) {
    e.preventDefault();

    var target = jQuery(this).data('target');
    jQuery(target).show();

} );


/*=================================================
Google Form
===================================================*/
    let $form = $('#js-form')
    $form.submit(function(e) { 
        $.ajax({ 
        url: $form.attr('action'), 
        data: $form.serialize(), 
        type: "POST", 
        dataType: "xml", 
        statusCode: { 
            0: function() { 
            //送信に成功したときのメッセージ表示
            $form.slideUp()
            $('#js-success').slideDown()
            }, 
            200: function() { 
            //送信に失敗したときのメッセージ表示
            $form.slideUp()
            $('#js-error').slideDown()
            }
        } 
        });
        return false; 
    });
    // フォームの入力確認
    let $submit =  $('#js-submit')
    $( '#js-form input, #js-form textarea').on('change', function() {
        if(
        $('#js-form input[type="text]').val() !== ""  && //インプット項目がからではなくかつ
        $('#js-form input[type="email]').val() !== ""  && //インプット項目がからではなくかつ
        $('#js-form input[name="entry.1621059975"]').prop('checked') === true  //名前とそれに付随するプライバシーのチェック
        ) {
        //すべて入力されたとき
    $submit.prop('disabled', false) //送信できないプロパティはずす
    $submit.addClass('-active') //アクティブクラスを付与

        }else{//入力させていないとき
        $submit.prop('disabled', true) //送信できないプロパティつける
    $submit.addClass('-active') //アクティブクラスをはずす

        }
    });
    })

    //Formの送付その２（MimosaCode)
    $('#form').submit(function (event) {
        var formData = $('#form').serialize();
        $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfN9ZshuBIWzbjH-P7RJNrtquLZ9rfQm3aaDiBQhWp8foIjjw/formResponse",
        data: formData,
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
            $(".end-message").slideDown();
            $(".contact-text").fadeOut();
            $("#form").fadeOut();
              //window.location.href = "thanks.html";
            },
            200: function () {
            $(".false-message").slideDown();
            }
        }
        });
        event.preventDefault();
    });
    
/*=================================================
    Current Position表示
===================================================*/
$(function () {
    var set = 200;//ウインドウ上部からどれぐらいの位置で変化させるか
    var boxTop = new Array;
    var current = -1;
    //各要素の位置
    //position-nowは場所を取得したい対象の要素に付ける
    $('.position-now').each(function (i) {
    boxTop[i] = $(this).offset().top;
    });
    //最初の要素にclass="positiion-now"をつける
    changeBox(0);
    //スクロールした時の処理
    $(window).scroll(function () {
    scrollPosition = $(window).scrollTop();
    for (var i = boxTop.length - 1; i >= 0; i--) {
        if ($(window).scrollTop() > boxTop[i] - set) {
        changeBox(i);
        break;
        }
    };
    });
    //ナビの処理
    function changeBox(secNum) {
    if (secNum != current) {
        current = secNum;
        secNum2 = secNum + 1;//以下にクラス付与したい要素名と付与したいクラス名
        $('.nav-menu li a').removeClass('link-current');

        //位置によって個別に処理をしたい場合　
        if (current == 0) {
        $('#about_link_js').addClass('link-current');
          // 現在地がsection1の場合の処理
        } else if (current == 1) {
        $('#service_link_js').addClass('link-current');
          // 現在地がsection2の場合の処理
        } else if (current == 2) {
          // 現在地がsection3の場合の処理
        $('#works_link_js').addClass('link-current');
        }
        else if (current == 3) {
          // 現在地がsection4の場合の処理
        $('#contact_link_js').addClass('link-current');
        }

    }
    };
});

    /*=================================================
    Orderまでたどり着いた時、バナーを表示
    ===================================================*/
    // 画面下から#orderまでの距離を取得
    let order_position = jQuery('#order').offset().top - jQuery(window).height();

    // スクロール位置が#Orderを超えた場合
    if (scroll > order_position) {
      // バナーをfadeInで表示する
        jQuery('#banner').fadeIn(500);
      // スクロール位置が#order未満の場合
    } else {
      // バナーを非表示にする
        jQuery('#banner').fadeOut(500);
    }

    /*=================================================
    Menuの背景画像を表示
    ===================================================*/
    // 画面下から#contactまでの距離を取得
    let menu_position = jQuery('#menu').offset().top - jQuery(window).height();

    // #menuが表示された場合
    if (scroll > menu_position) {
      // #orderが表示されるまでの間は、背景画像をfadeInで表示する
    if (scroll < order_position) {
        jQuery('.bg').fadeIn(500);
    } else {
        jQuery('.bg').fadeOut(500);
    }
      // #menuが表示される前の場合
    } else {
      // 背景画像を表示しない
        jQuery('.bg').fadeOut(500);
    }

    /*=================================================
    バナーを1500pxで表示
    ===================================================*/
    let banner = jQuery('#banner');
    // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
    banner.hide();

    // スクロールイベント（スクロールされた際に実行）
    jQuery(window).scroll(function() {
      // スクロール位置が700pxを超えた場合
    if (jQuery(this).scrollTop() > 3000) {
        // トップに戻るボタンを表示する
        banner.fadeIn();

      // スクロール位置が700px未満の場合
    } else {
        // トップに戻るボタンを非表示にする
        banner.fadeOut();
    }
    });


/*=================================================
WOW発動（ファイル：wow.min.jsとcnimiation .cssが必要）
===================================================*/
        new WOW().init();


/*=================================================
フェード表示　Inview（ファイル：inview.min.jsが必要）
===================================================*/
        jQuery(".inview").on("inview", function (event, isInView) {
        if (isInView) {
        // 要素（inviewクラス）が表示されたらshowクラスを追加する
            jQuery(this).stop().addClass("show");
        }
        });
/*=================================================
    Productsスライダー　自動再生
===================================================*/
    $('.product-list').slick({ 
        autoplay: true,
        dots: true,

    });


/*=================================================
    Modaaal(ファイルmodaal.mim.js/ modaal.min.cssが必要）
===================================================*/
  // Modaaal
$('.modal').modaal();

// Modaalギャラリー
$('.gallery').each(function (){
$(this).modaal({
    type: 'image'

});
});

/*=================================================
   //Texitillate(jquery.Telitilatteファイルが必要)
===================================================*/
$('.mv-text').textillate({
    loop: true,
    minDisplayTime: 3000,
    initialDelay: 1000,
    autoStart: true,

    in: {
    effect: 'fadeIn',
    delayScale: 1.5,
    delay: 50,
    sync: false,
    shuffle: false
    },

    out: {
    effect: 'fadeOut',
    delayScale: 1.5,
    delay: 50,
    sync: false,
    shuffle: false
    }
});
