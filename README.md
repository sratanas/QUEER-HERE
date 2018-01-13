# Name of Project

Queer Here Twin Cities is a calendar and event sharing platform for the Queer community in the Twin Cities. This technology is meant to fill a gap and increase connections for the community as well as allies. Registered users are able to create a profile, create organizations and create events for those organization which will be shared to a public calendar. Users are also able to save events they may be interested in to their personal profile.

## Built With

PostgreSQL
Express.js
AngularJS
Node.js
Bootstrap
Bootstrap Angular Calendar
SweetAlert

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

npm install

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Stephanie Ratanas


## Acknowledgments

* [Angular Bootstrap Calendar](https://github.com/mattlewis92/angular-bootstrap-calendar)
