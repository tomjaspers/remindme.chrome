'use strict';

/* Modified 'jQuery TextChange Plugin' from http://www.zurb.com/playground/jquery-text-change-custom-event */
(function ($) {
  $.event.special.textchange = {

    setup: function (data, namespaces) {
      $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
      $(this).bind('keyup.textchange', $.event.special.textchange.handler);
      $(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
    },

    teardown: function (namespaces) {
      $(this).unbind('.textchange');
    },

    handler: function (event) {
      $.event.special.textchange.triggerIfChanged(event, $(this));
    },

    delayedHandler: function (event) {
      var element = $(this);
      setTimeout(function () {
        $.event.special.textchange.triggerIfChanged(event, element);
      }, 25);
    },

    triggerIfChanged: function (event, element) {
      var current = element[0].contentEditable === 'true' ? element.html() : element.val();
      if (current !== element.data('lastValue')) {
        element.trigger('textchange',  [event, element.data('lastValue')]);
        element.data('lastValue', current);
      }
    }
  };
})(jQuery);


$(document).ready(function() {
    var hashtagRegex = /#(\w+)[\t ]+(.*)/g;

    $('textarea').bind('textchange', function(e, trigger, previousText) {
      // Only process text when the textarea has cleared b/c of enter
      if(!trigger.shiftKey && trigger.keyCode == 13){
        processText(previousText);
      }
    });

    function processText(text){
      // Extract the (hashtag, value) pairs from given text
      var match = hashtagRegex.exec(text);
      while (match != null) {
          storeItem(match[1], match[2]);
          match = hashtagRegex.exec(text);
      }
    }

    function storeItem(hashtag, value) {
        chrome.extension.sendMessage({
              action : 'add',
              data: {
                tag: hashtag,
                value: value,
              }
        });
    }
});