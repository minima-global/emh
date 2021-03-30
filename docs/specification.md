# EMH

This document describes the requirements for the Enterprise Management Hub (EMH).

## Functional Requirements

The EMH should perform two basic functions:

1. Listen for calls at specified URL-based endpoints. Those calls should [trigger](#trigger) Minima transactions (and maybe calls to other URLs).

2. Listen for Minima transactions at certain (configurable) addresses and subsequently, call URLs with data from those transactions.

Additionally, the EMH should fulfil one specific requirement:

1. It should enable the actions of a basic wallet, such as `create`, `send` and `receive`.

### Triggers

The EMH should abstract away from explicit implementation through a process of _triggers_. For example, a `gimme50` URL endpoint is _probably_ a trigger that gives the user 50 tokens. However, it could just as easily give the user 50 tokens **AND** notify some service 'somewhere' that a user has received 50 tokens.

### Logging

The EMH should log **everything** - _stats_, _stats_ and _MORE STATS_!

## System Requirements

To meet the [functional requirements](#functional-requirements), above, the EMH should implement the following:

### MiniDapp

The EMH must be deployable to both mobile and server environments, so it must run as a MiniDapp.

### Database

The EMH will make use of `Minima.sql`, therefore abstracting away from a specific database implementation.

#### Database Design

![](./images/dbase.png)

### Admin App'

A web-based interface to the EMH will be a javascript single-page application that allows EMH admins to create, send and receive tokens, review logs, create endpoints and specify actions.
