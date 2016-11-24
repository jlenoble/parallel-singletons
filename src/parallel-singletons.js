import OneGo from 'one-go';
import {SingletonFactory} from 'singletons';

const _ListType = Symbol();
const _BaseSingleton = Symbol();

export const ParallelSingletonFactory = function (Type,
  defaultKeyfunc = obj => obj.toString()) {
  const ListType = OneGo(Type, {arrayInit: true});
  const BaseSingleton = SingletonFactory(Type, defaultKeyfunc);

  Object.assign(ListType.prototype, {
    [_BaseSingleton]: BaseSingleton,

    get (...args) {
      let foundElt;
      this.elements.some(elt => {
        if (elt === this[_BaseSingleton].get(...args)) {
          foundElt = elt;
          return true;
        }
        return false;
      });
      return foundElt;
    },
  });

  const ParallelSingleton = (function (ListType, BaseSingleton) {
    const Singleton = SingletonFactory(ListType, ['array']);

    return function (array) {
      return Singleton(array.map(args => {
        if (Array.isArray(args)) {
          return BaseSingleton(...args);
        }
        return BaseSingleton(args);
      }));
    };
  }(ListType, BaseSingleton));

  Object.assign(ParallelSingleton, {
    [_ListType]: ListType,
    [_BaseSingleton]: BaseSingleton,

    get (...args) {
      return this[_BaseSingleton].get(...args);
    },
    getBaseSingleton () {
      return this[_BaseSingleton];
    },
  });

  return ParallelSingleton;
};
