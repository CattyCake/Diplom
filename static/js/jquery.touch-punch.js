/*!
 * jQuery Touch Punch 0.1.1
 * based on: jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function ($) {

    // Detect touch support
    $.support.touch = 'ontouchend' in document;

    var touchHandled;

    /**
     * Simulate a mouse event based on a corresponding touch event
     * @param {Object} event A touch event
     * @param {String} simulatedType The corresponding mouse event
     */
    function simulateMouseEvent(event, simulatedType) {

        // Ignore multi-touch events
        if (event.originalEvent.touches.length > 1) {
            return;
        }

        event.preventDefault();

        var touch = event.originalEvent.changedTouches[0],
          simulatedEvent = document.createEvent('MouseEvents');

        // Initialize the simulated mouse event using the touch event's coordinates
        simulatedEvent.initMouseEvent(
          simulatedType,    // type
          true,             // bubbles
          true,             // cancelable
          window,           // view
          1,                // detail
          touch.screenX,    // screenX
          touch.screenY,    // screenY
          touch.clientX,    // clientX
          touch.clientY,    // clientY
          false,            // ctrlKey
          false,            // altKey
          false,            // shiftKey
          false,            // metaKey
          0,                // button
          null              // relatedTarget
        );

        // Dispatch the simulated event to the target element
        event.target.dispatchEvent(simulatedEvent);
    }

    $.fn.extend({
        punch: function (target) {

            // Ignore browsers without touch support
            if (!$.support.touch) {
                return;
            }

            /**
             * Handle the touchstart events
             * @param {Object} event The widget element's touchstart event
             */
            this.on('touchstart', target, function (event) {

                var self = this;

                // Ignore the event if another widget is already being handled
                if (touchHandled) {
                    return;
                }

                // Set the flag to prevent other widgets from inheriting the touch event
                touchHandled = true;

                // Track movement to determine if interaction was a click
                self._touchMoved = false;

                // Simulate the mouseover event
                simulateMouseEvent(event, 'mouseover');

                // Simulate the mousemove event
                simulateMouseEvent(event, 'mousemove');

                // Simulate the mousedown event
                simulateMouseEvent(event, 'mousedown');
            });

            /**
             * Handle the touchmove events
             * @param {Object} event The document's touchmove event
             */
            this.on('touchmove', target, function (event) {

                // Ignore event if not handled
                if (!touchHandled) {
                    return;
                }

                // Interaction was not a click
                this._touchMoved = true;

                // Simulate the mousemove event
                simulateMouseEvent(event, 'mousemove');
            });

            /**
             * Handle the touchend events
             * @param {Object} event The document's touchend event
             */
            this.on('touchend', target, function (event) {

                // Ignore event if not handled
                if (!touchHandled) {
                    return;
                }

                // Simulate the mouseup event
                simulateMouseEvent(event, 'mouseup');

                // Simulate the mouseout event
                simulateMouseEvent(event, 'mouseout');

                // If the touch interaction did not move, it should trigger a click
                if (!this._touchMoved) {

                    // Simulate the click event
                    simulateMouseEvent(event, 'click');
                }

                // Unset the flag to allow other widgets to inherit the touch event
                touchHandled = false;
            });
        }
    });

    $(document).ready(function () {
        $(this).punch('.ui-draggable');
    });

})(jQuery);