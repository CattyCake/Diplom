(function (App, View) {
  'use strict'

  App.Views.StaticGeneralFunctionWithoutImg = View.extend({
    className: 'room-static__item active',
    template: _.template(
      '&deg;C<br><%= value %>'
    ),

    render () {
      const $this = this

      let className = '';

      if ($this.model.get('code') === 'temperature') {
        className = 'temp';
      }

      if ($this.model.get('code') === 'temperature-water') {
        className = 'water';
      }

      $this.$el
        .addClass(className)
        .attr('title', $this.model.get('name'))

      $this.$el.html(
        $this.template(
          $this.model.toJSON()
        )
      );

      return $this
    }
  })

}(App, Backbone.View))