(function (App, View) {
  'use strict'

  const
    StaticGeneralFunctionWithImg = App.Views.StaticGeneralFunctionWithImg,
    StaticGeneralFunctionWithoutImg = App.Views.StaticGeneralFunctionWithoutImg

  App.Views.StaticGeneralFunction = View.extend({
    className: 'room-static',

    render () {
      const $this = this

      $this.model.get('functions').each(function (modelFunction) {

        if (modelFunction.get('show_general') && !modelFunction.get('write_enable')) {

          if (modelFunction.get('code') === 'temperature' || modelFunction.get('code') === 'temperature-water') {

            const staticGeneralFunctionWithoutImg = new StaticGeneralFunctionWithoutImg({
              model: modelFunction
            })

            $this.$el
              .append(staticGeneralFunctionWithoutImg.render().el)

          }
          else {

            const staticGeneralFunctionWithImg = new StaticGeneralFunctionWithImg({
              model: modelFunction
            })

            $this.$el
              .append(staticGeneralFunctionWithImg.render().el)

          }

        }

      })

      return $this
    }
  })

}(App, Backbone.View))