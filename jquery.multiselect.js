/*
 * jQuery multiselect plugin
 *
 * Copyright (c) 2009 Jeremy Stephens
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
  function reorder(target) {
    options = $('option', target);
    sorted = options.sort(function(a,b) {
      return (a.innerHTML == b.innerHTML ? 0 : (a.innerHTML < b.innerHTML ? -1 : 1));
    })
    target.html(sorted);
  };

  function moveSelected(from, to) {
    to.append(from.children('option:selected').remove());
  };

  $.fn.multiselect = function(options) {
    var settings = $.extend({
      autoSize: false,
      autoSort: true,
      containerClass: 'multiselect-container'
    }, options);
    this.each(function(i) {
      var obj = $(this);
      var selects = obj.children('select:lt(2)');
      if (selects.length < 2) {
        //console.log('Not enough select boxes in '+this.id);
        return;
      }
      selects.attr('multiple', true);

      var container = $('<div></div>');
      container.addClass(settings.containerClass);
      selects.wrap(container);

      // add buttons
      var left = selects.eq(0);
      var right = selects.eq(1);

      var moveRight = function() {
        moveSelected(left, right);
        if (settings.autoSort) reorder(right);
      }
      var moveLeft = function() {
        moveSelected(right, left);
        if (settings.autoSort) reorder(left);
      }

      var left_button = $('<input type="button" value="Add &raquo;" />');
      left_button.click(moveRight); left.dblclick(moveRight);
      left.parent().append('<br/>');
      left.parent().append(left_button);
      if (settings.autoSort) reorder(left);

      var right_button = $('<input type="button" value="&laquo; Remove" />');
      right_button.click(moveLeft); right.dblclick(moveLeft);
      right.parent().append('<br/>');
      right.parent().append(right_button);
      if (settings.autoSort) reorder(right);

      if (settings.autoSize) {
        w = ((x = left.width())  > (y = right.width())  ? x : y);
        h = ((x = left.height()) > (y = right.height()) ? x : y);
        selects.width(w+10); selects.height(h+10);
      }
      obj.append('<br style="clear:both;"/>');
      obj.parent('form').submit(function() {
        $('option', right).attr('selected', true);
      })
    })
  };
})(jQuery);
