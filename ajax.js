
function getCookieVal(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  
  // Return null if not found
  return null;
  }

initDragElement();

$('#cmd').css('top',parseInt($('#cmd').innerHeight())/4);

$('#cmd').css('left',parseInt($('#cmd').innerWidth())/3);

$('#cmdinput').focus();







setTimeout(function(){$("#cmdlist").append(  '<div>Type help to get more info</div>')}, 700);  
$("#cmdinput").on("keydown",function search(e) {
  if(e.keyCode == 13) {
   
    if($('#cmdinput').val().toLowerCase() == 'cv'){
       $.get("cv.html", function(data){
        $('body').append(data);
        initDragElement();
        $('#cv').css('top',parseInt($('#cv').innerHeight())/4);
        $('#cv').css('left',parseInt($('#cv').innerWidth())/3);
        $('#cv').css('z-index',getCookieVal('currentzindex')+1);
        maximize('#cv');
        
    });

    }
   
    if($('#cmdinput').val().toLowerCase() == 'cv-download'){
      
    $.get('./CV_2022.pdf', function(retData) {

       
        
     
            blob = new Blob([retData], {type: 'application/pdf'});
        const url=window.URL.createObjectURL(blob);
        window.open(url,"_blank");
      }); 
  
  
  }
      if($('#cmdinput').val().toLowerCase() == 'help'){
        setTimeout(function(){$("#cmdlist").append(  '<div>cv - view cv in new window</div>')}, 250);  
        //setTimeout(function(){$("#cmdlist").append(  '<div>cv-download - download cv in pdf file</div>')}, 550);  

      }
      
     
      $("#cmdlist").append('<div>guest@szojox.github.io# '+$(this).val()+'</div>');
      $(this).val('');
  }
});

function initDragElement(off = null) {

var pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;
var popups = document.getElementsByClassName("window");

var elmnt = null;

var def = 100;

var currentZIndex = getCookieVal('currentzindex'); //TODO reset z index when a threshold is passed
Cookies.set('curentzindex', def);
if(currentZIndex > 200){
    Cookies.set('currentzindex', 100);
}

for (var i = 0; i < popups.length; i++) {
  var popup = popups[i];
  var header = getHeader(popup);

  popup.onmousedown = function() {
    this.style.zIndex = "" + ++currentZIndex;
    Cookies.set('currentzindex', currentZIndex);
  };
  
  
  if (header){
    header.parentPopup = popup;
    header.onmousedown = dragMouseDown;
  }
}

function dragMouseDown(e) {
  
  elmnt = this.parentPopup;
  elmnt.style.zIndex = "" + ++currentZIndex;
 

  e = e || window.event;
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
}

function elementDrag(e) {
  if (!elmnt) {
    return;
  }

  e = e || window.event;
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  elmnt.style.top = elmnt.offsetTop - pos2 + "px";
  elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
}

function closeDragElement() {
  /* stop moving when mouse button is released:*/
  document.onmouseup = null;
  document.onmousemove = null;
}

function getHeader(element) {
  var headerItems = element.getElementsByClassName("title-bar");

  if (headerItems.length === 1) {
    return headerItems[0];
  }

  return null;
}
}


$(document).ready(function() {

   
   //$('.binder').on('click', (event) =>
//{
//const button = $(event.currentTarget);
// … do with the button what you want… 
//})
   
   /* rozwiązanie
   $(".button").click(function () {
        buttonClick($(this).val());
    });
        function buttonClick(x) {
        $.ajax({
     type: "POST",
     url: "index.php",
     data: "direction=" + x,
     success: function(response){
          alert('Success!' + ' Response: ' + response);
            }
        });
        }*/
  /*$("#showadd").click(function(event){
      event.preventDefault();
    $.post( "func.php", {"showadd": 1},function(return_data,status){
        $("#okienko").empty();
      $("#okienko").html(return_data);
      $("#okienko").show();
    });  
    
    });*/
    
$("#addbtn").click(function(event){initDragElement();
    event.preventDefault();
    $.post( "func.php", $( "#add" ).serialize(),function(return_data,status){
         $("#okienko").empty();
          $("#okienko").hide();
          
           $("#open").empty();
      $("#open").html(return_data);
      
    });    
        
   
    })

    $("#notkasendbtn").click(function(event){initDragElement();
    event.preventDefault();
    console.log($( ".notkasendform" ).serialize());
    //$.post( "postck1.php", {"t1":$('#t1').val(),"t2":$('#t2').val()},function(return_data,status){
    $.post( "viewtab.php", $( "#notkasendform" ).serialize(),function(return_data,status){
         $("#open").empty();
      $("#open").html(return_data);
    });   
    })
    
    
    
    $("#form3btn").click(function(event){initDragElement();
    event.preventDefault();
    console.log($( "#form3" ).serialize());
    //$.post( "postck1.php", {"t1":$('#t1').val(),"t2":$('#t2').val()},function(return_data,status){
    $.post( "func.php", $( "#form3" ).serialize(),function(return_data,status){
        
         $("#open").empty();
      $("#open").html(return_data);
    });   
    })
    
    

    
    

    /*$("#form").click(function(event){
    event.preventDefault();
    //$.post( "postck1.php", {"t1":$('#t1').val(),"t2":$('#t2').val()},function(return_data,status){
    $.post( "viewtab.php", $( "button" ).serialize(),function(return_data,status){
      $("#open").html(return_data);
    });     
    });*/

    function notkasend(rowid){initDragElement();
console.log(rowid)
$.post( "viewtab.php", $( "#notkasend" ).serialize(),function(return_data,status){
     $("#open").empty();
      $("#open").html(return_data);
});}	


})



        function selectRow(rowid){initDragElement();
console.log(rowid)
$('#div_'+rowid).toggle();
$('#div_'+rowid).empty();
$('#div_'+rowid).load('control.php', {id: rowid});
}
function edit(rowid){initDragElement();
console.log(rowid)
$.post( "viewtab.php", {edit: rowid},function(return_data,status){
    $('#div_'+rowid).empty();
      $("#div_"+rowid).html(return_data);
});};
function del(rowid){initDragElement();
console.log(rowid+'del')
$.post( "func.php", {del: rowid},function(return_data,status){
     $("#open").empty();
      $("#open").html(return_data);
});}


function notkaedit(rowid){initDragElement();
console.log(rowid)
$.post( "viewtab.php", {notkaid: rowid},function(return_data,status){
    $('#div_'+rowid).empty();
      $("#div_"+rowid).html(return_data);
});}

function error(error,okienko = 'okienko',link = ''){

$.post( link+"login.php", {err:error, window:okienko, path:link},function(return_data,status){
$("#"+okienko).empty();
 $("#"+okienko).html(return_data);
});}


function maximize(div){



    if(getCookieVal(div+'set') == 1)
    {
        $(div).css( "height",getCookieVal(div+'height')+'px' );
        $(div).css( "width",getCookieVal(div+'width')+'px' );
        $(div).css( "top",getCookieVal(div+'top')+'px' );
        $(div).css( "left",getCookieVal(div+'left')+'px' );
        $(div).css( "right",getCookieVal(div+'right')+'px' );
                        

        Cookies.set(div+'set', 0);
    }else{
    Cookies.set(div+'set', 1);
    Cookies.set(div+'height', parseInt($(div).css( "height" )));
    Cookies.set(div+'width', parseInt($(div).css( "width")));
    Cookies.set(div+'position', $(div).css("position"));
    Cookies.set(div+'left', parseInt($(div).css("left")));
    Cookies.set(div+'top', parseInt($(div).css("top")));
    Cookies.set(div+'right', parseInt($(div).css("right")));
        $(div).css( "height","98%" );
        $(div).css( "width","99vw" );
        $(div).css("position", "absolute" );
                    $(div).css("left", "0" );
                        $(div).css("right", "0" );
                        $(div).css("top", "0" );
                            $(div).css("text-align", "center" );
                            $(div).css("z-index",getCookieVal('currentzindex')+1);

    }


    console.log(div);
}

    function loadphp(path,vars = null){//receptury
        $.post( path, {vars},function(return_data,status){
            
            $('body').append(return_data);
            
        });
    }
function zamknij(div,dontempty){

    $(div).css( "height","" );
    $(div).css( "width","" );
    if(dontempty != 1)
    {$(div).empty();}
    if(dontempty == 2)
    {$(div).remove();}				
    
    $(div).hide();
    console.log(div);
}


function minimize(div){
    
    
    if($(div).height() < 50)
    {
        var px = getCookieVal(div);
        console.log(px);
        $(div).height(px);
    }else{
        Cookies.set(div, parseInt($(div).height()));
    $(div).height(0);}
}

function openedmess(id_machine,user,done){
    if(done == 3){
        var note = $("#text"+id_machine).val();

        
        $.post( "func.php", {machine_id: id_machine ,opened_by_user: user, check : done, chcek_note : note},function(return_data,status){
            
            getfilelist($('#container').empty(),0);
            zamknij('#check_form_'+id_machine,1);
        
       });

    }
if(done == 1){

    $.post( "form2.php", {id: id_machine ,username: user},function(return_data,status){
        
        $("body").append(return_data);

        $('#check_form_'+id_machine).css( "display",'block' );
   $('#check_form_'+id_machine).css( "position",'absolute' );
   $('#check_form_'+id_machine).css( "right",'60px' );
   $('#check_form_'+id_machine).css( "width",'250px' );
   $('#check_form_'+id_machine).css( "height",'250px' );
   $('#check_form_'+id_machine).css( "z-index",getCookieVal('currentzindex')+1 );
   initDragElement();
   $('#check_form_'+id_machine).show();
  })


}else{
    


    $.post( "form.php", {id: id_machine ,username: user},function(return_data,status){
        
         $("body").append(return_data);

         $('#check_form_'+id_machine).css( "display",'block' );
    $('#check_form_'+id_machine).css( "position",'absolute' );
    $('#check_form_'+id_machine).css( "right",'60px' );
    $('#check_form_'+id_machine).css( "width",'250px' );
    $('#check_form_'+id_machine).css( "height",'250px' );
    $('#check_form_'+id_machine).css( "z-index",getCookieVal('currentzindex')+1 );
    initDragElement();
    $('#check_form_'+id_machine).show();
   })
}



}




function edit_okienko(rowid){initDragElement();
console.log(rowid)
$.post( "func.php", {edit: rowid},function(return_data,status){
    $('#okienko').empty();
    $( '#okienko' ).css('z-index', getCookieVal('currentzindex'));
    $('#okienko').toggle();
      $('#okienko').html(return_data);
});}


function login(okienko = 'okienko', link = ''){

$.post( link+'login.php',{path : link, window: okienko},function(return_data,status){initDragElement();
    let zindex = getCookieVal('currentzindex');
    zindex = zindex+=2;
            $('body').append('<div style="z-index: '+zindex+';position: absolute;top: 10vw;left: 40vw;display: block;" class="window" id="'+okienko+'"></div>');
            
            $('#'+okienko).css('z-index', getCookieVal('currentzindex'));
          $('#'+okienko).html(return_data);
          
        });   

}


function openpdf(id,plik){
let iddivrand = Date.now().valueOf();

$.post( 'func.php',{iddiv: iddivrand, machine_id : id, file : plik},function(return_data,status){

$('body').append(return_data);
            
         
            $('#'+iddivrand).css( "height",'600px' );
            $('#'+iddivrand).css( "width",'600px' );
            $( '#'+iddivrand).css('z-index', getCookieVal('currentzindex'));
         
            initDragElement();
        });   

}








function loginsend(okienko = 'okienko',link = ''){
initDragElement();

$.post( link+"login.php",{login: $('#login').val(), pass: $('#pass').val(), window: okienko, path: link},function(return_data,status){
    
$('#'+okienko).html(return_data);

});   
}

function history(){
$.post( "<?php  echo $folder; ?>history.php",null,function(return_data,status){

$('body').append(return_data);
initDragElement();
});  
}

