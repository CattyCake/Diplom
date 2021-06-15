$(document).ready(function() {
    $(".slider").each(function() {
        // $this is a reference to .slider in current iteration of each
        $this = $(this);
          var value = $($this).attr('value')
          var id = $($this).attr('id')
        // find any .slider-range element WITHIN scope of $this
        $(".slider-range", $this).slider({
            value: value,
            min: 0,
            max: 40,


            slide: function( event, ui ) {
               // find any element with class .amount WITHIN scope of $this
                    $(this).siblings().text(ui.value);
            },

            stop: function(event, ui) {
              $('#checkid').val(id);
              $('#checkvalue').text(ui.value);
              document.querySelector('.CheckPush').click()
                $this.slider
                alert('Температура устройства ' + id + ' изменена');



            }

        });
    });
});