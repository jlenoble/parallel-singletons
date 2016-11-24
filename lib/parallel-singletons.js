'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallelSingletonFactory = undefined;

var _oneGo = require('one-go');

var _oneGo2 = _interopRequireDefault(_oneGo);

var _singletons = require('singletons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ListType = Symbol();
var _BaseSingleton = Symbol();

var ParallelSingletonFactory = exports.ParallelSingletonFactory = function ParallelSingletonFactory(Type) {
  var _Object$assign, _Object$assign2;

  var defaultKeyfunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (obj) {
    return obj.toString();
  };

  var ListType = (0, _oneGo2.default)(Type, { arrayInit: true });
  var BaseSingleton = (0, _singletons.SingletonFactory)(Type, defaultKeyfunc);

  Object.assign(ListType.prototype, (_Object$assign = {}, _defineProperty(_Object$assign, _BaseSingleton, BaseSingleton), _defineProperty(_Object$assign, 'get', function get() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var foundElt = void 0;
    this.elements.some(function (elt) {
      var _BaseSingleton2;

      if (elt === (_BaseSingleton2 = _this[_BaseSingleton]).get.apply(_BaseSingleton2, args)) {
        foundElt = elt;
        return true;
      }
      return false;
    });
    return foundElt;
  }), _Object$assign));

  var ParallelSingleton = function (ListType, BaseSingleton) {
    var Singleton = (0, _singletons.SingletonFactory)(ListType, ['array']);

    return function (array) {
      return Singleton(array.map(function (args) {
        return BaseSingleton.apply(undefined, _toConsumableArray(args));
      }));
    };
  }(ListType, BaseSingleton);

  Object.assign(ParallelSingleton, (_Object$assign2 = {}, _defineProperty(_Object$assign2, _ListType, ListType), _defineProperty(_Object$assign2, _BaseSingleton, BaseSingleton), _defineProperty(_Object$assign2, 'get', function get() {
    var _BaseSingleton3;

    return (_BaseSingleton3 = this[_BaseSingleton]).get.apply(_BaseSingleton3, arguments);
  }), _defineProperty(_Object$assign2, 'getBaseSingleton', function getBaseSingleton() {
    return this[_BaseSingleton];
  }), _Object$assign2));

  return ParallelSingleton;
};