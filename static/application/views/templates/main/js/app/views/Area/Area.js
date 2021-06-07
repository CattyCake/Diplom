(function (App, View) {
  'use strict'

  const AreaRoom = App.Views.AreaRoom

  App.Views.Area = View.extend({
    className: 'area',

    render (isMobile = false) {
      const $this = this

      $this.collection.each(function (modelRoom) {

        const areaRoom = new AreaRoom({
          model: modelRoom,
          page: $this.page
        })

        $this.$el.append(
          areaRoom.render(isMobile).el
        )

      })

      return $this
    }
  })

}(App, Backbone.View))