const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const homedir = require('os').homedir();


let defaults = {

    // default database dir is in the home of the user
    DATABASES_DIRECTORY:path.resolve(homedir+'/.sloki/dbs'),
    DATABASES_AUTOSAVE_INTERVAL:1000,

    // TCP API enabled by default
    NET_TCP_PORT:6370,
    NET_TCP_HOST:'127.0.0.1',
    NET_TCP_DEBUG:true,
    NET_TCP_PROMPT:'> ',
    NET_TCP_EOF:'\r\n',
    NET_TCP_OUTPUT_FORMAT:'text',  // or json

    // limit number of simultaneously connected clients, for basic security reasons
    NET_TCP_MAX_CLIENTS:64,

    // HTTP API is disabled by default for moment (not implemented yet)
    NET_HTTP_PORT:null,
    NET_HTTP_HOST:'127.0.0.1'
}

let env = JSON.parse(JSON.stringify(defaults));

/*******************************************
 * command line help with default values
 *******************************************/

if (argv.help) {
    console.log();
    console.log('===============================================================');
    console.log('              Sloki - a NodeJS Server for LokyJS               ');
    console.log('===============================================================');
    console.log('   Environnement variable          Default')
    console.log('       SLOKI_TCP_PORT              '+env.NET_TCP_PORT);
    console.log('       SLOKI_TCP_IP                '+env.NET_TCP_IP);
    console.log('       SLOKI_TCP_MAX_CLIENTS       '+env.NET_TCP_MAX_CLIENTS);
    console.log('       SLOKI_TCP_DEBUG             '+env.NET_TCP_DEBUG);
    console.log('---------------------------------------------------------------');
    console.log('   Command Line Options            Default')
    console.log('       --dir                       '+env.DATABASES_DIRECTORY);
    console.log('       --tcp-port                  '+env.NET_TCP_PORT);
    console.log('       --tcp-host                  '+env.NET_TCP_HOST);
    console.log('       --tcp-max-clients           '+env.NET_TCP_MAX_CLIENTS);
    console.log('       --tcp-debug                 '+env.NET_TCP_DEBUG);
    console.log('---------------------------------------------------------------');
    console.log('Example');
    console.log('sloki --tcp-port=6370 --tcp-host=127.0.0.1');
    console.log();
    process.exit();
}

/***********************************
 * environnement variable override
 ***********************************/
 if (process.env.SLOKI_DIR) {
     env.DATABASES_DIRECTORY = path.resolve(process.env.SLOKI_DIR);
 }

 if (process.env.SLOKI_TCP_PORT) {
     env.NET_TCP_PORT = parseInt(process.env.SLOKI_TCP_PORT);
 }

 if (process.env.SLOKI_TCP_IP) {
     env.NET_TCP_IP = process.env.SLOKI_TCP_IP;
 }

 if (process.env.SLOKI_TCP_DEBUG) {
     if (process.env.SLOKI_TCP_DEBUG === "true") {
         env.NET_TCP_DEBUG = true;
     } else {
         env.NET_TCP_DEBUG = false;
     }
 }

 if (process.env.SLOKI_TCP_MAX_CLIENTS) {
     env.NET_TCP_MAX_CLIENTS = parseInt(process.env.SLOKI_TCP_MAX_CLIENTS);
 }


/********************************
 * command line options override
 ********************************/

if (argv['dir']) {
    env.DATABASES_DIRECTORY = path.resolve(argv.dir);
}

if (argv['tcp-port']) {
    env.NET_TCP_PORT = parseInt(argv['tcp-port']);
}

if (argv['tcp_host']) {
    env.NET_TCP_HOST = argv['tcp_host'];
}

if (argv['http-port']) {
    env.NET_HTTP_PORT = parseInt(argv['http-port']);
}

if (argv['http-host']) {
    env.NET_HTTP_HOST = parseInt(argv['http-host']);
}

/********************************
 * integrity checks
 ********************************/

let ERROR_BAD_NET_TCP_PORT = "tcp port variable must be > 1 and < 65535";
let ERROR_BAD_NET_TCP_MAX_CLIENTS = "max clients must ne > 1 and < 1024";
let ERROR_EXIT_CODE = 1;

if (env.NET_TCP_PORT) {
    if (env.NET_TCP_PORT<1||env.NET_TCP_PORT>65534) {
        throw new Error(ERROR_BAD_NET_TCP_PORT);
        process.exit(ERROR_EXIT_CODE);
    }

    if (!env.NET_TCP_MAX_CLIENTS) {
        throw new Error("LOKI_TCP_MAX_CLIENTS must be an integer");
        process.exit(ERROR_EXIT_CODE);
    }

    if (env.NET_TCP_MAX_CLIENTS<1||env.NET_TCP_MAX_CLIENTS>1024) {
        throw new Error(ERROR_BAD_NET_TCP_MAX_CLIENTS);
        process.exit(ERROR_EXIT_CODE);
    }
}

if (env.NET_HTTP_PORT) {

}

module.exports = env;
