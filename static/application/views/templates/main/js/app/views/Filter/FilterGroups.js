(function (App, View) {
    "use strict";

    const FilterGroup = App.Views.FilterGroup;

    App.Views.FilterGroups = View.extend({
        className: 'filter',

        render () {
            const $this = this;

            $this.collection.each(function (modelGroup) {

                const filterGroup = new FilterGroup({
                    model: modelGroup
                });

                $this.$el
                    .append(filterGroup.el)

            });

            return $this
        }
    });

} (App, Backbone.View));