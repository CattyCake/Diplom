(function (App, View) {
  'use strict'

  const ChangeGeneralFunction = App.Views.ChangeGeneralFunction

  App.Views.GeneralFunctionBlock = View.extend({
    className: 'room-functions',

    render () {
      const $this = this

      // fast-change functions
      $this.model.get('functions').each(function (modelFunction) {

        if (modelFunction.get('show_general')) {

          if (modelFunction.get('write_enable')) {
            const changeFunctionItem = new ChangeGeneralFunction({
              model: modelFunction
            })

            $this.$el.append(
              changeFunctionItem.render().el
            )
          }

        }

      })

      return $this
    }
  })

}(App, Backbone.View))