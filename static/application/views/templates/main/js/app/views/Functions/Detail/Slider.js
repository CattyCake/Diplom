(function (App, View) {
  "use strict";

  App.Views.Slider = View.extend({
    className: 'room-functions-blocker',
    template: _.template(
      '<div class="room-functions-blocker__desc"><div class="room-functions-blocker__img" style="background-image: url(<%= img %>)"></div>' +
      '<div class="room-functions-blocker__name"><%= name %>, <%= measure %></div></div>' +
      '<div class="room-functions-blocker__slider"></div>'
    ),

    events: {
      'change': 'setValue'
    },
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

      $this.$slider = $this.$el.find('.room-functions-blocker__slider').slider({
        value: $this.model.get('value'),
        min: $this.model.get('val_min'),
        max: $this.model.get('val_max'),
        step: $this.getStep($this.model.get('measure')),
        create: function (ui) {
          $(ui.target).find('.ui-slider-handle').text($this.model.get('value'));
        },
        change: function (event, ui) {
          $this.setValue(ui.value)
        },
        slide: function (event, ui) {
          $(ui.handle).text(ui.value);
        }
      });


      return $this
    },
    setValue (val) {

      this.model
        .set('value', Number(val))
        .send();

    },
    getStep (measure) {

      if (measure === 'град.') {
        return 0.5
      }

      return 1
    }
  });

} (App, Backbone.View));