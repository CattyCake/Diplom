(function (App, Collection) {
    "use strict";

    App.Collections.Groups = Collection.extend({
        model: App.Models.Group,
        url: '/index.php/groups/'
    });

} (App, Backbone.Collection));