(function (App, View) {
  'use strict'

  const Area = App.Views.Area

  App.Views.Main = View.extend({
    tagName: 'main',
    className: 'main',

    initialize (options) {

      this.page = options.page

    },
    render (isMobile = false) {
      const $this = this

      const area = new Area({
        collection: $this.collection
      })

      $this.$el
        .append('<div class="desc">Выберите необходимую комнату для управления</div>')
        .append(area.render(isMobile).el)

      return $this
    }
  })

}(App, Backbone.View))