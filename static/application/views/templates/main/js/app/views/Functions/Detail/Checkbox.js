(function (App, View) {
  "use strict";

  App.Views.Checkbox = View.extend({
    className: 'room-functions-blocker',
    template: _.template(
      '<input type="checkbox" class="room-functions-blocker___checkbox" title="<%= name %>">'
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

      $this.$input = $this.$el.find('.room-functions-blocker___checkbox');

      return $this
    },
    setValue () {

      this.model
        .set('value', Number(this.$input.prop('checked')))
        .send();

    },

    switchery () {
      const checkbox = this.$input[0]

      if (Number(this.model.get('value')) !== 0) {
        checkbox.checked = true
      }

      return new Switchery(checkbox)
    }
  });

} (App, Backbone.View));