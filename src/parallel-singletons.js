import OneGo from 'one-go';
import {SingletonFactory} from 'singletons';

export const ParallelSingletonFactory = function (Type,
  defaultKeyfunc = obj => obj.toString()) {
  return (function (List, BaseSingleton) {
    const Singleton = SingletonFactory(List, ['array']);

    return function (array) {
      return Singleton(array.map(args => BaseSingleton(...args)));
    };
  }(OneGo(Type, {arrayInit: true}),
    SingletonFactory(Type, defaultKeyfunc)));
};
