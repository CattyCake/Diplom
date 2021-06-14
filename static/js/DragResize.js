 var positions = JSON.parse(localStorage.positions || "{}");
var size = JSON.parse(localStorage.size || "{}");
$(function() {
  var d = $("[id=draggable]").attr("id", function(i) {
    return "draggable_" + i
  })
  $.each(positions, function(id, pos) {
    $("#" + id).css(pos)
  })
  $.each(size, function(id, siz) {
    $("#" + id).css(siz)
  })

  d.draggable({
    containment: "#containment-wrapper",
    scroll: false,
    stop: function(event, ui) {
      positions[this.id] = ui.position
      localStorage.positions = JSON.stringify(positions)
    }
  });

  d.resizable({
    scroll: false,
    stop: function(event, ui) {
      size[this.id] = ui.size
      localStorage.size = JSON.stringify(size)
    }
  });
});