(function (App, View) {
  'use strict'

  App.Views.StaticGeneralFunctionWithImg = View.extend({
    className: 'room-static__item',
    template: _.template(
      '<img src="<%= img %>" title="<%= name %>">'
    ),

    render () {
      const $this = this

      $this.$el.html(
        $this.template(
          $this.model.toJSON()
        )
      );

      return $this
    }
  })

}(App, Backbone.View))