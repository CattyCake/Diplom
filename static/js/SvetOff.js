  function countRabbits() {
      var checkboxes = document.getElementsByClassName('checkbox');
  for (var index = 0; index < checkboxes.length; index++) {
   if (checkboxes[index].checked) {
        var name = $(checkboxes[index]).attr('name');
        if(name == 'shine') {
            $(checkboxes[index]).attr('checked', false);



        }
   }
     }
  }