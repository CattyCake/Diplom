(function (App, View) {
    "use strict";

    App.Views.FilterGroup = View.extend({

        tagName: 'a',
        className: 'filter__item js-filter__item',
        template: _.template(
            '<%= name %>'
        ),
        attributes: {
            href: '#'
        },
        events: {
            'click .js-filter__item': 'setFilter'
        },

        initialize() {
            this.render();

            return this
        },
        render () {
            const $this = this;

            $this.$el.append(
                $this.template(
                    $this.model.toJSON()
                )
            );

            return $this
        },

        setFilter () {
            // тут будет логика фильтра по списку функций
        }
    });

} (App, Backbone.View));