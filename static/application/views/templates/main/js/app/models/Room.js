(function (App, Model) {
  'use strict'

  const Functions = App.Collections.Functions

  App.Models.Room = Model.extend({
    defaults: {
      id: 0,
      name: '',
      functions: null,
      on_detail: false
    },

    parse (attrs) {

      const functions = new Functions(attrs.FUNCTIONS, {
        parse: true
      })

      return {
        id: attrs.ID,
        name: attrs.NAME,
        functions,
        on_detail: false
      }
    },
    getFilteredFunctions () {

      return this.get('functions').where({
        name: 'свет кухня'
      })
    }
  })

}(App, Backbone.Model))