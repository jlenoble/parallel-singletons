import Muter, {muted} from 'muter';
import OneGo from 'one-go';
import {SingletonFactory} from 'singletons';
import {expect} from 'chai';
import {ParallelSingletonFactory} from '../src/parallel-singletons';

describe('Testing ParallelSingletons', function() {

  const muter = Muter(
    [console, 'log'],
    [console, 'error']
  );

  it(`ParallelSingletonFactory says 'Hello!'`, muted(muter, function() {
    class Class {
      constructor(logger, method) {
        this.logger = logger;
        this.method = method;
      }

      log(...args) {
        this.logger[this.method](...args);
      }
    }

    const Singleton = ParallelSingletonFactory(Class,
      ['object', 'literal']);

    const s = Singleton([
      [console, 'log'],
      [console, 'error']
    ]);

    s.log('Hello!');
    expect(muter.getLogs()).to.equal('Hello!\nHello!\n');
  }));

});
