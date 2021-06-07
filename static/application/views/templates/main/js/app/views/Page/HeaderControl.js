(function (App, View) {
  'use strict'

  const HeaderControlItem = App.Views.HeaderControlItem

  App.Views.HeaderControl = View.extend({
    className: 'controls',

    render () {
      const
        $this = this,
        arControls = [
          {
            name: 'ВЫКЛЮЧИТЬ ВЕСЬ СВЕТ',
            command: 'shine'
          },
          {
            name: 'ВЫКЛЮЧИТЬ ВСЕ ЭЛЕКТРИЧЕСТВО',
            command: 'electric'
          },
          {
            name: 'ПЕРЕКРЫТЬ ВСЮ ВОДУ',
            command: 'water'
          },
		  {
			  name: 'МОДУЛЬ СЦЕНАРИЕВ',
			  command: 'scenes'
		  },
		  {
			  name: 'АДМИНИСТРАТИВНАЯ ПАНЕЛЬ',
			  command: 'adminPanel'
		  }
        ]

      arControls.forEach(function (item) {
        const headerControlItem = new HeaderControlItem({
          collection: $this.collection,
          model: item
        })

        $this.$el.append(headerControlItem.render().el)
      })

      return $this
    }
  })

}(App, Backbone.View))