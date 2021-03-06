const config = require('../../src/config');
const engine = process.env.SLOKI_SERVER_ENGINE||'tcpbinary';
const endpoint = require('../endpoints')[engine];

let Client;

if (process.env.NODE_ENV === 'dev') {
    Client = require('../../../sloki-node-client');
} else {
    Client = require('sloki-node-client');
}

const MAX_CLIENTS = config.getMaxClients(engine);

require('./client')(__filename, (test, client, end) => {

    let tmpMaxClient = 1;
    if (client.protocol.match(/dinary/)) {
        // dinary use a two-way protocol, so 2 sockets per clients
        tmpMaxClient = 2;
    }

    test.test('client1: getMaxClients', subtest  => {
        client.maxClients((err, result) => {
            subtest.deepEqual(err, undefined, 'method should not return an error');
            subtest.equal(result, MAX_CLIENTS, 'client1: maxClients should return '+MAX_CLIENTS);
            subtest.end();
        });
    });

    test.test('client1: setMaxClients', subtest  => {
        client.maxClients({ value:'a' }, (err) => {
            const expectedError = { code: -32602, message: 'method "maxClients": property "value" should be a number, found string' };
            subtest.deepEqual(err, expectedError, 'method should an return error');
            subtest.end();
        });
    });

    test.test('client1: setMaxClients', subtest  => {
        client.maxClients({ value:tmpMaxClient }, (err, result) => {
            subtest.deepEqual(err, undefined, 'method should not return an error');
            subtest.equal(result, tmpMaxClient, `client1: maxClients should be set to ${tmpMaxClient}`);
            subtest.end();
        });
    });

    test.test('client1: getMaxClients', subtest  => {
        client.maxClients((err, result) => {
            subtest.deepEqual(err, undefined, 'method should not return an error');
            subtest.equal(result, tmpMaxClient, `client1: maxClients should be ${tmpMaxClient}`);
            subtest.end();
        });
    });

    test.test('client2: hit maxClients', subtest => {
        const client2 = new Client(endpoint, { engine });
        client2
            .connect()
            .then(() => {
                subtest.notOk('connect succeed, should not');
            })
            .catch((err) => {
                const expectedErr = { code: -32000, message: 'Max Clients Reached' };
                subtest.deepEqual(err, expectedErr, 'client2: should return '+JSON.stringify(expectedErr));
                client2.close();
                setTimeout(subtest.end, 500);
            });
    });

    test.test('client1: restore maxClients', subtest  => {
        client.maxClients({ value:MAX_CLIENTS }, (err, result) => {
            subtest.deepEqual(err, undefined, 'method should not return an error');
            subtest.equal(result, MAX_CLIENTS, 'client1: maxClients should be set to '+MAX_CLIENTS);
            subtest.end();
            end();
        });
    });

});
