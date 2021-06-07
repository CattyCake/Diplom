(function (App, View) {
  "use strict";

  const DetailMainGroup = App.Views.DetailMainGroup;

  App.Views.DetailMain = View.extend({
    tagName: 'main',
    className: 'main-detail',

    initialize (options) {
      const $this = this

      $this.$groups = options.groups
    },
    render () {
      const $this = this;

      if ($this.model) {

        $this.$el
          .append('<div class="main-detail__title">' + $this.model.get('name') + '</div>')

        $this.$groups.each(function (modelGroup) {

          const arFunctions = $this.model.get('functions').where({group_id: modelGroup.get('id')});

          if (arFunctions.length) {

            const detailMainGroup = new DetailMainGroup({
              functions: arFunctions,
              groupName: modelGroup.get('name')
            });

            $this.$el
              .append(detailMainGroup.render().el)
          }


        })

      }


      return $this
    }
  });

} (App, Backbone.View));