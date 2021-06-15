        function dosomething(element){
            var id = element.value
              $.ajax({
   url: '/roominfo',
   type: 'post',
   data: {id:id},
   beforeSend: function(){
    // Show image container
    $("#loader").show();
   },
       success: function(response){
    $('.response').empty();

    $('.response').append(response.htmlresponse1);

        $.ajax({
     url: '/button',
         type: 'post',
           success: function(response){
         $('.controls').empty();
          $('.controls').append(response.htmlresponse2);
                 },
                });

   },
   complete:function(data){
    // Hide image container
    $("#loader").hide();

   }
  });
        }



