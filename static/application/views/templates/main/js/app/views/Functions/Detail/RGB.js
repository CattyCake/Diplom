(function (App, View) {
  "use strict";

  App.Views.RGB = View.extend({
    className: 'room-functions-blocker',
    template: _.template(
      '<div class="room-functions-blocker__desc"><div class="room-functions-blocker__img" style="background-image: url(<%= img %>)"></div>' +
      '<div class="room-functions-blocker__name"><%= name %>, <%= measure %></div></div>' +
      '<input type="text" class="room-functions-blocker___rgb" title="<%= name %>">'
    ),

    initialize () {
      //this.listenTo(this.model, 'change', () => this.render());
    },
    render () {
      const $this = this;

      $this.$el.html(
        $this.template(
          $this.model.toJSON()
        )
      );

      $this.$input = $this.$el.find('.room-functions-blocker___rgb')

      $this.$input.val(
        $this.getHexForRGB(
          $this.model.get('value')
        )
      );

      $this.$input
        .spectrum({
          preferredFormat: 'hex',
          showInput: true,
          chooseText: 'Выбрать',
          cancelText: 'Отмена',
          change: function (color) {
            $this.model
              .setValue(color.toHexString())
          }
        });

      return $this
    },
    getHexForRGB(value) {

      let
        countHex = 6,
        str = value.toString(16),
        lengthStr = parseInt(str.length)

      if (lengthStr < countHex) {
        let i
        for (i = lengthStr; i < countHex; i++) {
          str = '0' + str;
        }

      }

      return '#' + str;
    }
  });

} (App, Backbone.View));