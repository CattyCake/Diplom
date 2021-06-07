(function (App, View, JSON) {
  'use strict'

  const
    GeneralFunctionBlock = App.Views.GeneralFunctionBlock,
    AreaRoomMore = App.Views.AreaRoomMore,
    StaticGeneralFunction = App.Views.StaticGeneralFunction

  App.Views.AreaRoom = View.extend({
    className: 'room',

    render (isMobile = false) {
      const
        $this = this,
        cookieName = 'room_' + $this.model.id,
        cookieData = ($.cookie(cookieName)) ? JSON.parse($.cookie(cookieName)) : {}

      const
        functionBlock = new GeneralFunctionBlock({ model: $this.model }),
        areaRoomMore = new AreaRoomMore({ model: $this.model }),
        staticGeneralFunction = new StaticGeneralFunction({ model: $this.model })

      let staticEl = staticGeneralFunction.render().$el;

      if (staticEl.html() !== '') {
      	$this.$el
        .append('<div class="room-name">' + $this.model.get('name') + '</div>')
        .append(functionBlock.render().el)
        .append(staticEl)
        .append(areaRoomMore.render().el)
      } else {
        $this.$el
        .append('<div class="room-name">' + $this.model.get('name') + '</div>')
        .append(functionBlock.render().el)
        .append(areaRoomMore.render().el)
      }

      /*$this.$el
        .append('<div class="room-name">' + $this.model.get('name') + '</div>')
        .append(functionBlock.render().el)
        .append(staticGeneralFunction.render().el)
        .append(areaRoomMore.render().el)*/

      if ($this.model.get('functions'))

      if (!isMobile) {
        $this.$el
          .draggable({
            create: function () {
              $(this).css({
                position: 'absolute'
              })

              if (cookieData) {
                $(this).css(cookieData)
              }
            },
            stop: function (event, ui) {
              $this.saveToCookie(cookieName, {
                left: ui.position.left,
                top: ui.position.top,
                width: $(this).css('width'),
                height: $(this).css('height')
              })
            }
          })
          .resizable({
            stop: function (event, ui) {
              $this.saveToCookie(cookieName, {
                left: ui.position.left,
                top: ui.position.top,
                width: ui.size.width,
                height: ui.size.height
              })
            }
          })
      }

      return $this
    },
    saveToCookie(cookieName, data) {
      $.cookie(cookieName, JSON.stringify(data), { expires: 365 }) // пишем на один год
    },
    goToDetail () {

      this.model
        .set('on_detail', true)

    }
  })

}(App, Backbone.View, JSON))