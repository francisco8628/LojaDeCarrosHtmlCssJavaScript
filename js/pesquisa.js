$(function(){
  
    var correntValue =0;
    var isDrag =false;
    var precoMaximo = 70000;
    var precoAtual = 0;

    $('.pointer-barra').mousedown(function(){
     //console.log('precionado');
     isDrag = true;
    })
    
    $(document).mouseup(function(){
        isDrag = false;//quando soltar o mause
        enableTextSelection();

    })

    $('.barra-preco').mousemove(function(e){
       if(isDrag==true){
        disableTextSelection();
        //console.log("ta funcionando")
        var elBase = $(this);
        var mouseX = e.pageX - elBase.offset().left;   ;
        ///console.log(mouseX);
        if(mouseX < 0) //se for menor que 0
            mouseX =0  //carrega 0
        if(mouseX > elBase.width())  //se for maior que a largura do elemento
            mouseX = elBase.width(); //carrega com a largura     
            
            $('.pointer-barra').css('left',(mouseX -13) +'px')
            correntValue = (mouseX / elBase.width())*100
            //console.log(percent)
           $('.barra-preco-fill').css('width',correntValue+'%')
           
           //To Do: ajustar o formato do preço
           precoAtual = (correntValue/100) * precoMaximo
           $('.preco-pesquisa').html('R$'+precoAtual.toFixed(2).replace(".000",","));
        } 
    })

    function disableTextSelection(){
       $('.body').css("-webkit-user-select","none")
       $('.body').css("-moz-user-select","none")
       $('.body').css("-ms-user-select","none")
       $('.body').css("-o-user-select","none")
       $('.body').css("user-select","none")
    }
    function enableTextSelection(){
        $('.body').css("-webkit-user-select","auto")
        $('.body').css("-moz-user-select","auto")
        $('.body').css("-ms-user-select","auto")
        $('.body').css("-o-user-select","auto")
        $('.body').css("user-select","auto")
     }
     /*
     mini img wrapper => style="border: 8px solid rgb(210, 210, 210);"
     foto-destaque="background-image: url('images/bmw507.jpg');"
     */

     var imgShow = 3;
     var miniIndex = imgShow - 1;
     var maxIndex = Math.ceil($('.mini-img-wrapper').length/3)-1;
     var curIdex = 0;

     initSlide();
     navgatorSlide();
     clickSlider();

     function initSlide(){
        var amt = $('.mini-img-wrapper').length * 33.3;
        var elScroll = $('.nav-galeria-wrapper');  
        var elSingle = $('.mini-img-wrapper');
        elScroll.css('width',amt +'%');
        elSingle.css('width',33.3*(100/amt)+'%');
     }

     function navgatorSlide(){
       $('.arrow-rigth').click(function(){
           console.log("clicou")
         if(curIdex < maxIndex){
            curIdex++;
            var elOff = $('.mini-img-wrapper').eq(curIdex*3).offset().left - $('.nav-galeria-wrapper').offset().left
            $('.nav-galeria').animate({'scrollLeft':elOff+'px'})
        }else{
             console.log("chegamos ao fim")
         }
       })

       $('.arrow-left').click(function(){
        console.log("clicou")
      if(curIdex > 0){
         curIdex--;
         var elOff = $('.mini-img-wrapper').eq(curIdex*3).offset().left - $('.nav-galeria-wrapper').offset().left
         $('.nav-galeria').animate({'scrollLeft':elOff+'px'})
     }else{
          console.log("chegamos ao fim")
      }
    })
     }

     function clickSlider(){
       $('.mini-img-wrapper').click(function(){
          $('.mini-img-wrapper').css('background-color','transparent') 
          $(this).css('background-color','rgb(210,210,210)')
          var img = $(this).children().css('background-image')
          $('.foto-destaque').css('background-image',img)
        })

        $('.mini-img-wrapper').eq(0).click(); //faz a primeira imagem ser selecionadavvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
     }

     $('[goto=contato]').click(function(){
        console.log("ola click")
        $('html,body').animate({'scrollTop': $('#contato').offset().top})
        
        return false
     })

     /* Sitema de navegação nos depoimentos do index */
     var antDepoimento = $('.depoimento-single p').length
     var curIndex = 0
     iniciaDEpoimentos();
     navegarDepoimento()

     function iniciaDEpoimentos(){
       $('.depoimento-single p').hide()
       $('.depoimento-single p ').eq(0).show()     }

     function navegarDepoimento(){
       $('[next]').click(function(){
         //alert('next')
         curIdex++
         if(curIdex >= antDepoimento)
            curIdex=0

            $('.depoimento-single p').hide()
            $('.depoimento-single p ').eq(curIdex).show() 
         
       })

       $('[prev]').click(function(){
        //alert('prev')
        curIdex--
        if(curIdex < 0)
           curIdex=antDepoimento-1

           $('.depoimento-single p').hide()
           $('.depoimento-single p ').eq(curIdex).show() 
        
      })
     }
})