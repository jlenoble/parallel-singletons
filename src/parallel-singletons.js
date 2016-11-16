import OneGo from 'one-go';
import {SingletonFactory} from 'singletons';

export const ParallelSingletonFactory = function (Type,
  defaultKeyfunc = obj => obj.toString()) {
  const ListType = OneGo(Type, {arrayInit: true});
  const BaseSingleton = SingletonFactory(Type, defaultKeyfunc);

  const ParallelSingleton = (function (ListType, BaseSingleton) {
    const Singleton = SingletonFactory(ListType, ['array']);

    return function (array) {
      return Singleton(array.map(args => BaseSingleton(...args)));
    };
  }(ListType, BaseSingleton));

  return ParallelSingleton;
};
