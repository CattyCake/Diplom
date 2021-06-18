var matches;
(function(doc) {
   matches =
      doc.matchesSelector ||
      doc.webkitMatchesSelector ||
      doc.mozMatchesSelector ||
      doc.oMatchesSelector ||
      doc.msMatchesSelector;
})(document.documentElement);

document.addEventListener('click', function(e) {
   if ( matches.call( e.target, '[it="shest02"]:checked' ) ) {

       var id = $( e.target, '[it="shest02"]:checked' ).attr('id') || 'Перед нажатием на кнопку выделите checkbox!';
       var data = 1.0 || 'Перед нажатием на кнопку выделите checkbox!';
       var dop_addr = $( e.target, '[it="shest02"]:checked' ).attr('dop') || 'Перед нажатием на кнопку выделите checkbox!';

               $.ajax({
     url: '/ajaxcheckbox',
         type: 'post',
                   data: {id:id, data:data, dop_addr:dop_addr},
           success: function(response){
        alert('Устройство ' + id + ' включено');
                 },
                });

   }
   else if ( matches.call( e.target, '[it="shest02"]' ) )
   {
       var id = $( e.target, '[it="shest02"]:checked' ).attr('id') || 'Перед нажатием на кнопку выделите checkbox!';
       var data = "0" || 'Перед нажатием на кнопку выделите checkbox!';
       var dop_addr = $( e.target, '[it="shest02"]:checked' ).attr('dop') || 'Перед нажатием на кнопку выделите checkbox!';

               $.ajax({
     url: '/ajaxcheckbox',
         type: 'post',
                   data: {id:id, data:data, dop_addr:dop_addr},
           success: function(response){
        alert('Устройство ' + id + ' выключено');
                 },
                });
   }

}, false);