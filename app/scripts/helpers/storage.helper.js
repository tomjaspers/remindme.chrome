'use strict';

var RemindmeStorageService = function() {
  var lsName = 'remindmes';
  var data = localStorage.getItem(lsName) ? JSON.parse(localStorage.getItem(lsName)) : [];

  return {

    get: function() {
      return data;
    },

    add: function(item) {
      this.remove(item.value);
      data.push(item);
      this.save();
    },

    remove: function(value) {
      var idx = null;
      for(var i = 0; i < data.length; i++) {
        if(data[i].value === value) {
          idx = i;
          break;
        }
      }

      if(idx !== null) {
        data.splice(idx, 1);
        this.save();
      }
    },

    save: function() {
      localStorage.setItem(lsName, JSON.stringify(data));
    },

    count: function() {
      return data.length;
    }

  };
};