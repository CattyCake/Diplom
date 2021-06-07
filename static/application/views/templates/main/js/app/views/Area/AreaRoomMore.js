(function (App, View) {
  "use strict";

  App.Views.AreaRoomMore = View.extend({
    tagName: 'button',
    className: 'room-more',

    events: {
      'click': 'showDetail'
    },
    render () {

      this.$el.text('ПОДРОБНЕЕ')

      return this
    },
    showDetail () {

      this.model
        .set('on_detail', true)

    }
  });

} (App, Backbone.View));