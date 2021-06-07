(function (App, View) {
  'use strict'

  const
    Checkbox = App.Views.Checkbox,
    Slider = App.Views.Slider,
    RGB = App.Views.RGB

  App.Views.DetailMainGroup = View.extend({
    className: 'main-detail-block',

    initialize (options) {
      const $this = this

      $this.groupName = options.groupName
      $this.functions = options.functions
    },
    render () {
      const $this = this

      $this.functions.forEach(function (modelFunction) {

        $this.$el
          .addClass($this.getClassNameForBlock())

        if (modelFunction.get('write_enable')) {

          if (!$this.$el.find('.main-detail-block__title').length) {
            $this.$el
              .append('<div class="main-detail-block__title">' + $this.groupName + '</div>')
          }

          /*if (modelFunction.get('val_min') === 0 && modelFunction.get('val_max') === 1) {

            const checkbox = new Checkbox({
              model: modelFunction
            })

            setTimeout(() => {
              $this.$el.append(checkbox.render().el)
              checkbox.switchery()
            }, 100)

          } else {

            const slider = new Slider({
              model: modelFunction
            })

            $this.$el.append(slider.render().el)

          }*/

          switch ($this.getViewType(modelFunction.get('measure'))) {
            case 'slider':
              const slider = new Slider({
                model: modelFunction
              })

              $this.$el.append(slider.render().el)
              break

            case 'rgb':

              const rgb = new RGB({
                model: modelFunction
              })

              $this.$el.append(rgb.render().el)
              break
          }


        }
      })


      return $this
    },
    getClassNameForBlock () {

      switch (this.groupName) {

        case 'Освещение':
          return 'orange-red'
          break
        case 'Отопление':
          return 'blue-red'
          break
        case 'Оборудование':
          return 'oborod'
          break
        case 'Безопасность':
          return 'bezop'
          break
        case 'Вентиляция':
          return 'ventil'
          break
        case 'Открыть/закрыть':
          return 'open'
          break
      }

    },
    getViewType (measure) {

      if (measure === 'цвет') {
        return 'rgb'
      }
      else {
        return 'slider'
      }

    }
  })

}(App, Backbone.View))