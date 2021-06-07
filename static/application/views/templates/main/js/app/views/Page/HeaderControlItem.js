(function (App, View) {
  'use strict'

  App.Views.HeaderControlItem = View.extend({
    tagName: 'button',
    className: 'controls__button',

    events: {
      'click' : 'clickOnButton',
    },
    render () {
      const $this = this

      $this.$el
        .addClass($this.model.command)
        .text($this.model.name)

      return $this
    },

    clickOnButton (e) {
      e.preventDefault()

      const { command } = this.model

      if (command in this && typeof this[ command ] === 'function') {
        this[ command ]()
      }
    },
    shine () {
      this.collection
        .offAll('shine')
    },
    electric () {
      this.collection
        .offAll('electric')
    },
    water () {
      this.collection
        .offAll('water')
    },
	scenes () {
      window.location = '/project/index.html';
    },
	adminPanel() {
		window.location = '/adminPanel/index.html';
	}
  })

}(App, Backbone.View))