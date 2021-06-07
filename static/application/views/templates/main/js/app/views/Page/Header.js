(function (App, View) {
  'use strict'

  const HeaderControl = App.Views.HeaderControl

  App.Views.Header = View.extend({
    tagName: 'header',
    className: 'header',

    render () {
      const $this = this

      const headerControl = new HeaderControl({
        collection: $this.collection
      })

      $this.$el
        .append('<div class="title"><b>Smart</b> Home</div>')
        .append(headerControl.render().el)

      return $this
    }
  })

}(App, Backbone.View))