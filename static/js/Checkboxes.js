var matches;  // matchesSelector на момент написания статьи поддерживается только с префиксами
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

       var msg = $( e.target, '[it="shest02"]:checked' ).attr('name') || 'Перед нажатием на кнопку выделите checkbox!';

       alert('Устройство ' + msg + ' включено');


   }
   else if ( matches.call( e.target, '[it="shest02"]' ) )
   {
       var msg = $( e.target, '[it="shest02"]:checked' ).attr('name') || 'Перед нажатием на кнопку выделите checkbox!';

             alert('Устройство ' + msg + ' выключено');
   }

}, false);