(function ($, App) {
  'use strict'

  const
    Page = App.Views.Page,
    Rooms = App.Collections.Rooms,
    Groups = App.Collections.Groups

  $(document).ready(function () {

    const rooms = new Rooms()

    rooms.fetch()
      .then(function () {

        const groups = new Groups();

        groups.fetch()
          .then(function () {

            const
              BODY = $('body'),
              WINDOW = $(window),
              mobileWidth = 1024

            const page = new Page({
              collection: rooms,
              groups: groups
            })

            if (WINDOW.width() <= mobileWidth) {
              BODY.html(page.render(true).el)
            }
            else {
              BODY.html(page.render().el)
            }

            WINDOW.resize(function () {
              const
                width = $(this).width(),
                hasClass = page.$el.hasClass('mobile'),
                room = page.$el.find('.room')

              if (width > mobileWidth && hasClass) {
                page.render()
              }
              else if (width <= mobileWidth && !hasClass) {
                page.render(true)
              }
            })

            console.log(rooms.toArray(), groups.toArray())
          })

      })

  })

}(jQuery, App))
