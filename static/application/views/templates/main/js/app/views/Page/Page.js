(function (App, View) {
  'use strict'

  const
    Header = App.Views.Header,
    Main = App.Views.Main,
    Detail = App.Views.Detail

  App.Views.Page = View.extend({
    className: 'page',

    initialize (options) {
      const $this = this;

      $this.$groups = options.groups

      $this.listenTo($this.collection, 'change:on_detail', (modelRoom) => { $this.toggleDetail(modelRoom) })
    },
    render (isMobile = false) {
      const $this = this

      const
        header = new Header({ collection: $this.collection }),
        main = new Main({ collection: $this.collection }),
        detail = new Detail({ collection: $this.collection, groups: $this.$groups, page: $this })

      $this.$el
        .html('')
        .append('<div class="page-overlay"></div>')
        .append(detail.render().el)
        .append(header.render().el)
        .append(main.render(isMobile).el)
        .append('<svg class="display-none" version="1.1" xmlns="http://www.w3.org/2000/svg"><filter id="blur"><feGaussianBlur stdDeviation="3"></feGaussianBlur></filter></svg>')

      if (isMobile) {
        $this.$el
          .addClass('mobile')

        $this.$el
          .swipe({
            swipeRight: function () {
              $this
                .openMenu()
            },
            swipeLeft: function () {
              $this
                .closeMenu()
            }
          })

        $this.$el
          .swipe('enable')

        $this.$el.find('.page-overlay').on('click', function () {
          $this
            .closeMenu()
        })
      }
      else {
        $this.$el
          .removeClass('mobile')

        $this.$el
          .swipe('disable')
      }

      return $this
    },
    toggleDetail (modelRoom) {
      if (modelRoom.get('on_detail')) {
        this.$el
          .addClass('detail-on')
      }
      else {
        this.$el
          .removeClass('detail-on')
      }
    },
    closeMenu () {
      this.$el
        .removeClass('menu-open')
    },
    openMenu() {
      this.$el
        .addClass('menu-open')
    }
  })

}(App, Backbone.View))