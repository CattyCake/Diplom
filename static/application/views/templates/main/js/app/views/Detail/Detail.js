(function (App, View) {
  "use strict";

  const
    DetailHeader = App.Views.DetailHeader,
    DetailMain = App.Views.DetailMain

  App.Views.Detail = View.extend({
    className: 'detail',

    initialize (options) {
      const $this = this

      $this.$groups = options.groups
      $this.page = options.page

      $this.listenTo($this.collection, 'change:on_detail', (modelRoom) => {$this.render(modelRoom)})

    },
    render (modelRoom = null) {
      const
        $this = this,
        detailHeader = new DetailHeader({ model: modelRoom, page: $this.page }),
        detailMain = new DetailMain({ model: modelRoom, groups: $this.$groups })

      $this.$el
        .html('')
        .append(detailHeader.render().el)
        .append(detailMain.render().el)

      return $this
    }
  });

} (App, Backbone.View));