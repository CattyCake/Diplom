(function (App, View) {
  "use strict";

  App.Views.DetailHeader = View.extend({
    tagName: 'header',
    className: 'header-detail',

    initialize (options) {

      this.page = options.page
    },
    events: {
      'click': 'closeDetail'
    },
    render () {
      const $this = this;

      $this.$el
        .append('<div class="back">ВЕРНУТЬСЯ К ПЛАНИРОВКЕ</div>')

      return $this
    },
    closeDetail (e) {
      e.preventDefault();

      if (this.model) {
        this.model
          .set('on_detail', false)
      }

      this.page
        .closeMenu()
    }
  });

} (App, Backbone.View));