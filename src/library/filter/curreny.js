import Vue from 'vue'

Vue.filter('currencyDisplay', {
  // model -> view
  // 在更新 `<input>` 元素之前格式化值
  read: function(val) {
    return val ? val.toFixed(2) : '';
  },
  // view -> model
  // 在写回数据之前格式化值
  write: function(val, oldVal) {
    var number = +val.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  }
})