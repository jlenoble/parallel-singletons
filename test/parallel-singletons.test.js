import Muter, {muted} from 'muter';
import {ogArgs} from 'one-go';
import {expect} from 'chai';
import {ParallelSingletonFactory} from '../src/parallel-singletons';

describe('Testing ParallelSingletons', function() {

  const muter = Muter(
    [console, 'log'],
    [console, 'error']
  );

  it(`Testing with loggers`, muted(muter, function() {
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

  it(`Testing with 3d-vectors`, muted(muter, function() {
    class Vector {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      plus(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
      }

      times(num) {
        this.x *= num;
        this.y *= num;
        this.z *= num;
      }

      product(vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
      }

      module() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
    }

    const Singleton = ParallelSingletonFactory(Vector,
      ['literal', 'literal', 'literal']);

    const s = Singleton([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);

    s.times(6);
    s.plus({x: 1, y: 1, z: 1});
    expect(s.product({x: 1, y: 1, z: 1})).to.eql([9, 9, 9]);
    s.plus({x: -1, y: -1, z: -1});
    expect(s.module()).to.eql([6, 6, 6]);
    s.plus(ogArgs(
      new Vector(-6, 0, 0),
      new Vector(0, -6, 0),
      new Vector(0, 0, -6)
    ));
    expect(s.module()).to.eql([0, 0, 0]);

    const t = Singleton([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
    expect(t.module()).to.eql([0, 0, 0]); // t **IS** s, which has changed
    expect(s).to.equal(t);
  }));

});
