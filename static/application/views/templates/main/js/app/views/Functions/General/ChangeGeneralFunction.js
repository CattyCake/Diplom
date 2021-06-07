(function (App, View) {
    "use strict";

    App.Views.ChangeGeneralFunction = View.extend({
        className: 'room-functions-block',
        template: _.template(
            '<input type="checkbox" class="room-functions-input">' +
            '<label class="room-functions-item fast-change <%= code %>" title="<%= name %>">' +
            '<img src="<%= img %>" class="room-functions-item__img">' +
            '</label>'
        ),

        events: {
            'change': 'setValue'
        },
        initialize () {
            this.listenTo(this.model, 'change', () => this.render());
        },
        render () {
            const $this = this;

            $this.$el.html(
                $this.template(
                    $this.model.toJSON()
                )
            );

            $this.$input = $this.$el.find('input');
            $this.$label = $this.$el.find('label');

            $this.$input.attr('id', $this.model.cid);
            $this.$label.attr('for', $this.model.cid);

            if (Number($this.model.get('value')) !== 0) {
                $this.$input.attr('checked', 'checked')
            }

            return $this
        },
        setValue () {

            this.model
                .set('value', Number(this.$input.prop('checked')))
                .send();

        }
    });

} (App, Backbone.View));