(function (App, Model) {
  'use strict'

  App.Models.Function = Model.extend({
    defaults: {
      dop_id: 0,
      name: '',
      func_id: 0,
      code: '',
      group_id: 0,
      type: '',
      value: 0,
      val_max: 0,
      val_min: 0,
      write_enable: false,
      measure: '',
      img: '',
      show_general: false
    },

    parse (attrs) {
      return {
        dop_id: attrs.ID,
        name: attrs.NAME,
        func_id: attrs.FUNC_ID,
        code: attrs.CODE,
        group_id: attrs.GROUP_ID,
        type: attrs.TYPE,
        value: attrs.VALUE || 0,
        val_max: attrs.VAL_MAX,
        val_min: attrs.VAL_MIN,
        write_enable: attrs.WRITE_ENABLE,
        measure: attrs.MEASURE,
        img: attrs.IMG,
        show_general: attrs.SHOW_GENERAL
      }
    },
    send () {
      $.ajax({
        type: 'POST',
        url: '/index.php/save/',
        data: {
          dop_id: this.get('dop_id'),
          func_id: this.get('func_id'),
          value: this.get('value')
        },
        success: function (data) {
          console.log(data)
        }
      })

      return this
    },
    setValue (value) {
      this
        .set('value', value)
        .send();
    }
  })

}(App, Backbone.Model))