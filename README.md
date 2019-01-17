# LokiJS-Server
A TCP/TLS/HTTP/HTTPS Server for [LokiJS](http://lokijs.org/) using [JSONRPC](https://www.jsonrpc.org/) ([Jayson](https://github.com/tedeh/jayson))

[![Join the chat at https://gitter.im/techfort/LokiJS](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LokiJS-Server/community)
[![alt CI-badge](https://travis-ci.org/franck34/LokiJS-Server.svg?branch=master)](https://travis-ci.org/franck34/LokiJS-Server)
[![npm version](https://badge.fury.io/js/lokijs-server.svg)](http://badge.fury.io/js/lokijs-server)
[![alt packagequality](http://npm.packagequality.com/shield/lokijs-server.svg)](http://packagequality.com/#?package=lokijs-server)
[![Known Vulnerabilities](https://snyk.io/test/github/franck34/LokiJS-Server/badge.svg?targetFile=package.json)](https://snyk.io/test/github/franck34/LokiJS-Server?targetFile=package.json)

**WORK IN PROGRESS**


## Overview

[LokiJS](http://lokijs.org/) is a document oriented database written in javascript, published under MIT License.
Its purpose is to store javascript objects as documents in a nosql fashion and retrieve them with a similar mechanism.

LokiJS-Server is a transport adapter using [JSONRPC](https://www.jsonrpc.org/) protocol. It *will* support TCP/TLS/HTTP/HTTPS.

It address the **scalability** lack of our favorite LokiJS.

```
                                  JSONRPC (jayson)
                                 TCP|TLS|HTTP|HTTPS

+----------------------------+                         +----------------------------------+
|                            |                         |          LokiJS-Server           |
|       NodeJS Daemon        |<----------------------->|        (Local or Remote)         |
|                            |                         |                                  |
+----------------------------+                         |    +------------------------+    |
                                                       |    |                        |    |
+----------------------------+                         |    |                        |    |
|                            |                         |    |                        |    |
|       NodeJS Daemon        |<----------------------->|    |         LokiJS         |    |
|                            |                         |    |       (database)       |    |
+----------------------------+                         |    |                        |    |
                                                       |    |                        |    |
+----------------------------+                         |    +------------------------+    |
|                            |                         |                                  |
|           CLI              |<----------------------->|                                  |
|                            |                         |                                  |
+----------------------------+                         +----------------------------------+
```

## Installation

Copy paste line you want)

* locally: ```npm install LokiJS-Server``` or ```yarn add LokiJS-Server```
* globaly: ```npm install -g LokiJS-Server``` or ```yarn add -g LokiJS-Server```


## Current state

**WORK IN PROGRESS**

**NOT USABLE YET**

See [CHANGELOG.md](/CHANGELOG.md)


#### Commands implementation

Legend:
* Implemented :white_check_mark:
* In progress/must be implemented: :white_circle:
* Will NOT be implemented: :red_circle:

| Status            | Category | Command           | Parameter | Description                
|-------------------|----------|-------------------|-----------|----------------
| :white_check_mark:| Server   | quit              |           | disconnect (TCP/TLS clients only)
| :white_check_mark:| Server   | shutdown          |           | shutdown LokiJS-Server
| :white_check_mark:| Server   | memory            |           | return LokiJS-Server memory usage
| :white_check_mark:| Server   | clients           |           | return TCP/TLS connected clients
| :white_check_mark:| Server   | commands          |           | return available commands
| :white_check_mark:| Loki     | db                |           | mongodb like, return current database name
| :white_check_mark:| Loki     | use               | dbName    | mongodb like, select (and load if needed) a database
| :white_check_mark:| Loki     | listDatabases     |           | return available databases
| :white_check_mark:| Loki     | listCollections   |           | return available collections in selected database
| :white_circle:    | Loki     | addCollection     | options   | add a collection in selected database


#### Transports implementation

| Status             | Transport            | Notes               
|--------------------|----------------------|--------------------------------
| :white_check_mark: | TCP                  | Persistant connection
| :white_circle:     | TLS                  |
| :white_circle:       | HTTP                 |
| :white_circle:       | HTTPS                |


#### Benchmarks

| Status             | Transport            | Notes               
|--------------------|----------------------|--------------------------------
| :white_circle:       | TCP                  | Persistant connection
| :white_circle:       | TLS                  |
| :white_circle:       | HTTP                 |
| :white_circle:       | HTTPS                |


#### Extra Tools

| Status             | Tool                 | Notes               
|--------------------|----------------------|--------------------------------
| :white_circle:       | CLI                  | CLI using TCP transport


#### Improvements on top of LokiJS

| Status             | Improvement          | Notes               
|--------------------|----------------------|--------------------------------
| :white_circle:       | Authentication       | Optional authentication layer (all transports)



## Boot options

* Environnement variables

| Name   | Default Value  | Possible values | Implemented since version
|---|---|---|---|
| LOKI_DIR  | ~/.lokijs/dbs  | | 0.0.0 |
| LOKI_TRANSPORT  | TCP | TCP\|HTTP\|TCP-HTTP | 0.0.0 |

* Command line options

| Option   | Default Value  | Possible values | Implemented since version
|---|---|---|---|
| dir  | ~/.lokijs/dbs  | | 0.0.0 |
| transport  | TCP | TCP\|HTTP\|TCP-HTTP | 0.0.0 |
