(function (App, Model) {
    "use strict";

    App.Models.Group = Model.extend({
        defaults: {
            id: 0,
            name: ''
        },

        parse (attrs) {
            return {
                id: attrs.ID,
                name: attrs.NAME
            }
        }
    });

} (App, Backbone.Model));