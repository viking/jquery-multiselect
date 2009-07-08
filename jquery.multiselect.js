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
    var settings = $.extend({ autoSort: true, autoSize: false }, options);
    this.each(function(i) {
      var obj = $(this);

      // grab selects
      var selects = obj.find('select');
      if (selects.length < 2) {
        //console.log(selects);
        //console.log('Not enough select boxes in '+this.id);
        return;
      }
      selects.attr('multiple', true);

      // grab buttons
      var buttons = obj.find('input:button');
      if (buttons.length < 2) {
        //console.log('Not enough buttons in '+this.id);
        return;
      }

      // hook stuff up
      var left         = selects.eq(0);
      var right        = selects.eq(1);
      var left_button  = buttons.eq(0);
      var right_button = buttons.eq(1);

      var moveRight = function() {
        moveSelected(left, right);
        if (settings.autoSort) reorder(right);
      }
      left_button.click(moveRight);
      left.dblclick(moveRight);

      var moveLeft = function() {
        moveSelected(right, left);
        if (settings.autoSort) reorder(left);
      }
      right_button.click(moveLeft);
      right.dblclick(moveLeft);

      if (settings.autoSize) {
        w = ((x = left.width())  > (y = right.width())  ? x : y);
        h = ((x = left.height()) > (y = right.height()) ? x : y);
        selects.width(w+10); selects.height(h+10);
      }
      obj.parent('form').submit(function() {
        $('option', right).attr('selected', true);
      })
    })
  };
})(jQuery);
