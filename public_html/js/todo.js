$(window).load(function(){

    if($("img.lazy").length!=0){   

        $("img.lazy").lazyload();

    }        

});

$(document).ready(function(){

  $('.kredit div').click(function(){
    window.open('https://my.pochtabank.ru/pos-credit-v2?operId=3b2d6e64-9140-4d5b-b509-8ccf30eb7b2f&productCode=EXP_DOM_PP&ttCode=0401001009823&toCode=040100100982&ttName=&amountCredit=&termCredit=84&firstPayment=1000000&fullName=&phone=&brokerAgentId=NON_BROKER&returnUrl=&order%5B0%5D%5Bcategory%5D=274&order%5B0%5D%5Bmark%5D=%D0%94%D0%BE%D0%BC&order%5B0%5D%5Bmodel%5D=%D0%9C%D0%B0%D0%BB%D0%BE%D1%8D%D1%82%D0%B0%D0%B6%D0%BD%D1%8B%D0%B9&order%5B0%5D%5Bquantity%5D=1&order%5B0%5D%5Bprice%5D=6000000', '_blank');
  });


  $('#nav').click(function(){

    $('nav#left > div').removeClass('clicked');  

    if($('nav#left').hasClass('open')){

      $('#tint').fadeOut(300, function(){

        $('#tint').remove();

        $('body').removeAttr('style');

      });

    } else{

      $('<div id="tint">&nsbp;</div>').fadeIn(300).appendTo('body');

    };

    $('nav#left').toggleClass('open');

    $('#nav div').toggleClass('open');

  });

  

  var kmget;

  $('.buyit').on('click', function(){

    var ids = $(this).data('id');

    var nams = $(this).data('name');

    kmget = $.get("/getkompl.php", { v: ids }, function(data){

        $('#id_type').html(data);

    });

    $('#myform h3').html('Заказать деревянный дом '+nams);

    $('#myform #ids').val(ids);

  });

  

  var jget;

  $('select#house').on('change', function(e){

    if(jget != null){ jget.abort(); };

    console.log($(this).val());

    jget = $.get("/getcat.php", { v: $(this).val() }, function(data){

        var obj = jQuery.parseJSON(data);

        $('select#floors').html(obj.floors);

        $('select#floors').trigger('change');

        $('select#size').html(obj.size);

        $('select#size').removeAttr('disabled');

        $('select#size').trigger('change');

    });  

  });

  var jsget;

  $('select#floors').on('change', function(e){

    if(jsget != null){ jget.abort(); };

    console.log($(this).val());

    jsget = $.get("/getcat.php", { s: $(this).val() }, function(data){

        var obj = jQuery.parseJSON(data);

        $('select#size').html(obj.size);

        $('select#size').removeAttr('disabled');

        $('select#size').trigger('change');

    });  

  });

  

  if($('#fle').length!=0){

    var aspmA = randomNumber(1,10);

    var aspmB = randomNumber(1,10);

    $.get("/kap.php", {a: aspmA, b: aspmB}, function(data){

        $('#fle').html(data);

    });

  }

  

  $('nav#left').on('click', function(e){

    if(e.target !== this) return true;

    $('nav#left div').removeClass('clicked');

  });

  $('nav#left > div').on('click', function(){

    $(this).toggleClass('clicked');    

  });

  $(document).on('click', '#tint', function(){

    $('#nav').trigger('click');    

  });

  $(document).on('scroll', function(){

    var ftop = $(window).scrollTop();

    var blok = 70 - ftop;

    /*if(ftop <= 1){

      $('.logo').removeAttr('style');

    } else{

      if(blok >= 39){

        $('.logo').css('padding-top',blok+'px');

      } else{

        $('.logo').css('padding-top','40px');

      }

    }*/

    $.each($('.catalog'), function(key, data){

      var ke = key+1;

      var btop = $(window).scrollTop() + $(window).height() - $('#list'+ke).offset().top + 30;

      var flist = $('#list'+ke).height();

      var fpacit = (btop/flist) * 1;

      if(fpacit > 1){ fpacit = 1; }

      if(fpacit < 0.3){ fpacit = 0.3; }

      //$('#list'+ke+' div span').css('opacity',fpacit);
      $('#list'+ke+' div span').css('opacity','1');

    });

    

  });

  $('.banner .button').on('click', function(){

    $([document.documentElement, document.body]).stop().animate({

      scrollTop: $("main h1").offset().top-140

    }, 1000);

  });

  

  $('.scrolla').on('click', function(){
    var tob = $(this).data('to').replace(/\D/g, "");;
    $('.tab-btn[data-target-id="'+tob+'"]').trigger('click');
    $([document.documentElement, document.body]).stop().animate({
        scrollTop: $(".tab-content").offset().top-40
    }, 1000);
  });

  $('.scrollar').on('click', function(){

    $([document.documentElement, document.body]).stop().animate({

        scrollTop: $("[id^=mykompl]:eq(0)").offset().top-40

    }, 1000);

  });

  

  $('#mprsdata1').on('click', function(){

    if($(this).is(':checked')){

      $(this).parent().find('input[type=submit]').removeAttr('disabled');

    } else{

      $(this).parent().find('input[type=submit]').attr('disabled','disabled');

    };

  });

  if($('.slider').length!=0){

    var s = 3;

    var p = 0;

    var slidr = new Array();

    $('.slider img').each(function(){

      slidr.push($(this).attr('src'));

    });

    var sl = slidr.length;

    setInterval(function(){

      $('<img src="'+ slidr[s] +'" alt="" />').fadeIn(1000).appendTo('.slider div:eq('+p+')');

      setTimeout(function(){

        $('.slider div:eq('+p+') img:eq(0)').remove();

        p++; if(p >= 3){ p = 0; }

        s++; if(s >= sl){ s = 0; } 

      }, 1000);

    },3500);

  };

  $('#sndmsg').on('click', function(){

    var nam = $(".sendform #nam").val();

    var eml = $(".sendform #eml").val();

    var tel = $(".sendform #tel").val();

    var msg = $(".sendform #msg").val();

    if(nam!="" && msg!=""){

      $.post("/sndmsg.php", { nam: nam, emla: eml, tlfs: tel, mesg: msg }, function(data){

        if(data == "ok"){ $(".sendform").html('<p>Сообщение успешно отправлено! Благодарим за обращение, скоро мы Вам ответим.</p>'); }

        else{ $(".sendform").html(data); }

      });

    } else{

      alert('Не все поля формы заполнены.');

    };

  });

  /*if($('.dizain-prices .pline').length > 0){
    $('.dizain-prices>div:nth-last-child(-n+2)>div.pline').each(function(){ $(this).remove(); });
  }*/
  if($('.tab-nav').length > 0){
        $('.tab-nav .tab-btn').eq(0).addClass('tab-btn-active');
        var targetId = $('.tab-nav .tab-btn').eq(0).data('target-id');
        $('.tab-content .tab-pane[data-id='+targetId+']').addClass('tab-pane-show');
        $('.tab-nav .tab-btn').each(function(index){
            if($(this).html().indexOf('без') != -1){
                if($(this).data('tab').indexOf('бруса') != -1){
                    $(this).html('без отделки');
                } else{
                    $(this).html('тёплый контур');
                }
            }
            else{ $(this).html('с отделкой'); }
            //if(index > 1){ $(this).remove(); }
        });
    }

  $('.prices_tabs span').on('click', function(){
    $('.prices_tabs span').removeClass('active');
    $(this).addClass('active');
    let tab = $(this).data('tab');
    let idx_tab = $(this).index();
    $('.dizain-prices .tab').removeClass('active');
    $('.dizain-prices .tab').eq(idx_tab).addClass('active');
    $('.tab-nav .tab-btn').addClass('hidden').removeClass('tab-btn-active');
    $('.tab-nav .tab-btn[data-tab="'+ tab +'"]').removeClass('hidden');
    $('.tab-nav .tab-btn[data-tab="'+ tab +'"]').eq(0).addClass('tab-btn-active');
    $('.tab-content .tab-pane').removeClass('tab-pane-show');
    $('.tab-content .tab-pane[data-tab="'+ tab +'"]').eq(0).addClass('tab-pane-show');
  });

  $('.trgr').on('click', function(){
    $('.prices_tabs span:not(.active)').trigger('click');
  });


  $('.tab-nav .tab-btn').on('click', function(){
    var targetId = $(this).data('target-id');
    $('.tab-nav .tab-btn').removeClass('tab-btn-active');
    $('.tab-content .tab-pane').removeClass('tab-pane-show');
    $(this).addClass('tab-btn-active');
    $('.tab-content .tab-pane[data-id='+targetId+']').addClass('tab-pane-show');
  });

});

function randomNumber(m,n){
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor( Math.random() * (n - m + 1) ) + m;
};
/*setTimeout(function(){
    [...document.querySelectorAll('.dizain-prices>div:nth-last-child(-n+2)>div.pline')].forEach(el=>el.classList.add('hidden'));
    [...document.querySelectorAll('.dizain-prices>div:nth-last-child(-n+2)>div.pline')].forEach(el=>el.remove());
    document.querySelector('#tab-1 .tab-btn').classList.add('tab-btn-active');
    document.querySelector('.tab-content .tab-pane').classList.add('tab-pane-show');
    [...document.querySelectorAll('.tab-pane>h2')].forEach(el=> el.innerHTML='');
    $('.tab-nav .tab-btn').each(function(){
        if($(this).html().indexOf('без') != -1){
            $(this).html('без отделки');
        } else{
            $(this).html('с отделкой');
        }
    });
    if(document.querySelectorAll('.tab-nav>li')[2]){
      document.querySelectorAll('.tab-nav>li')[2].classList.add('hidden');
      document.querySelectorAll('.tab-nav>li')[2].remove();

    }
}, 5);

const showTab = (elTabBtn) => {
  if(elTabBtn.classList.contains('tab-btn-active')){
    return;
  }
  const targetId = elTabBtn.dataset.targetId;
  const elTabPane = elTabBtn.querySelectorAll('.tab-pane[data-id="'+targetId+'"]');
  if(elTabPane){
    const elTabBtnActive = elTab.querySelectorAll('.tab-btn-active');
    elTabBtnActive.classList.remove('tab-btn-active');
    const elTabPaneShow = elTab.querySelectorAll('.tab-pane-show');
    elTabPaneShow.classList.remove('tab-pane-show');
    elTabBtn.classList.add('tab-btn-active');
    elTabPane.classList.add('tab-pane-show');
  }
}

document.addEventListener('click', (e) => {
  if (e.target && !e.target.closest('.tab-btn')){
    return;
  }
  const elTabBtn = e.target.closest('.tab-btn');
  showTab(elTabBtn);
});*/
