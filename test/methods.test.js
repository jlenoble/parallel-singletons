import Muter, {muted} from 'muter';
import {ogArgs} from 'one-go';
import {expect} from 'chai';
import {ParallelSingletonFactory} from '../src/parallel-singletons';

describe('Testing methods', function() {

  const muter = Muter(
    [console, 'log'],
    [console, 'error']
  );

  it(`Testing method 'get'`, muted(muter, function() {

    class BaseCustomer {
      constructor(info = {}) {
        this.firstName = info.firstName;
        this.lastName = info.lastName;
        this.email = info.email;
      }
    }

    const Customers = ParallelSingletonFactory(BaseCustomer, ['literal']);

    const customers = new Customers([
      [{
        firstName: 'Adam',
        lastName: 'Poe',
        email: 'adampoe@example.com'
      }],
      [{
        firstName: 'Eva',
        lastName: 'Clown',
        email: 'clowny@stuff.com'
      }],
      [{
        firstName: 'Chuck',
        lastName: 'Zyss',
        email: 'mzyss@lab.org'
      }]
    ]);

    expect(Customers.get({
      lastName: 'Poe',
      firstName: 'Adam',
      email: 'adampoe@example.com'
    })).to.equal(Customers.get({
      firstName: 'Adam',
      email: 'adampoe@example.com',
      lastName: 'Poe'
    }));

    expect(Customers.get({
      lastName: 'Poe',
      firstName: 'Adam',
      email: 'adampoe@example.com'
    })).to.eql({
      firstName: 'Adam',
      lastName: 'Poe',
      email: 'adampoe@example.com'
    });

    expect(customers.get({
      lastName: 'Poe',
      firstName: 'Adam',
      email: 'adampoe@example.com'
    })).to.equal(Customers.get({
      firstName: 'Adam',
      email: 'adampoe@example.com',
      lastName: 'Poe'
    }));

    expect(customers.get({
      lastName: 'Poe',
      firstName: 'Adam',
      email: 'adampoe@example.com'
    })).to.eql({
      firstName: 'Adam',
      lastName: 'Poe',
      email: 'adampoe@example.com'
    });

    expect(customers.get({
      lastName: 'Down',
      firstName: 'Adam',
      email: 'adamdown@example.com'
    })).to.be.undefined;

  }));

});
