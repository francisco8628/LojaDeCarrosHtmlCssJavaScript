$(function(){

    
     $('nav a').click(function(){
         var href = $(this).attr('href');
         var offSetTop = $(href).offset().top;

         $('html,body').animate({'scrollTop':offSetTop});
         
         return false  //para não atualizar a pagina
     })
})