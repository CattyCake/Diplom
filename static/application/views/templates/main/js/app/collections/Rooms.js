(function (App, Collection) {
  'use strict'

  App.Collections.Rooms = Collection.extend({
    model: App.Models.Room,
    url: '/index.php/rooms/',

    offAll (type) {
      this.getFilteredModels(type).forEach(function (model) {
        if (model.get('value') !== 0 && model.get('show_general')) {
          model
            .set('value', 0)
            .send();
        }
      })
    },
    getFilteredModels (code) {
      const $this = this

      let arModels = []

      $this.each(function (modelRoom) {
        const arr = modelRoom.get('functions').where({
          code: code
        })

        if (arr.length) {
          arr.forEach(function (item) {
            arModels[arModels.length] = item
          })
        }

      })

      return arModels
    }
  })

}(App, Backbone.Collection))