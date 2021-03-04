# EMH

This document describes the requirements for the Enterprise Management Hub (EMH).

## Functional Requirements

Below describes the basic functioning of the EMH.

### The EMH

The EMH should offer functionality in 4 broad areas:

1. Users

The EMH should be capable of _registering_ and _signing in_ users and performing all actions regarding those users, such as _token distribution_.

2. Triggers

The EMH should abstract away from explicit implementation through a process of _triggers_. For example, _gimme50_ might be a trigger that just gives the user 50 tokens. However, it could just as easily give the user 50 tokens **AND** notify some service 'somewhere' that a user has received 50 tokens.

3. Logging

The EMH should log **everything** - _stats_, _stats_ and _MORE STATS_!

4. Wallet

This includes basic token functionality, such as _create_, _send_, _balance_, etc.

### Roles

**Users** should be able to register and login to a service, where they can download the Minima APK and a wallet-based MiniDapp.

**Admins** (Enterprise staff) should be able to create tokens and send them to their users. They can browse all information, which could include, "How many users do we have?", "How many tokens have we distributed?", "How many times has this URL been called?" etc.

**System Admins** should be able to manage all low-level database information.

## EMH Requirements

To meet the [functional requirements](#functional-requirements), above, the EMH should implement the following:

### Server

A server running 'nix and Apache/nginx.

### Database

The database will be [MySQL](https://www.mysql.com/), fronted up by the headless CMS [directus](https://directus.io/).

#### Database Design

![](./images/dbase.png)

### User Service

A web-based front end service (allowing users to register and login to the service, download the Minima APK and wallet minidapp will be a javascript single-page application built on _React_ and the directus API.

### Admin' Service

A web-based front end service that allows EMH admins to create tokens and send them to their users. EMH admins should also be able to view logging information.

### MiniDapp

The MiniDapp is to be a version of the wallet.
