# QUEER HERE

Queer Here Twin Cities is a calendar and event sharing platform for the Queer community in the Twin Cities. This technology is meant to fill a gap and increase connections for the community as well as allies. Registered users are able to create a profile, create organizations and create events for those organization which will be shared to a public calendar. Users are also able to save events they may be interested in to their personal profile.

## Built With

 - PostgreSQL
 - Express.js
 - AngularJS
 - Node.js
 - Bootstrap
 - Bootstrap Angular Calendar
 - SweetAlert

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)


### Installing

npm install

<!-- ```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
``` -->

## Screen Shots

![Queer Here landing page](https://github.com/sratanas/QUEER-HERE/blob/master/server/public/images/RMlandingpage.png "Queer Here landing page")

<br>
<br>

![Queer Here dashboard](https://github.com/sratanas/QUEER-HERE/blob/master/server/public/images/RMdashboard.png "Queer Here dashboard")

<br>
<br>

![Queer Here calendar view](https://github.com/sratanas/QUEER-HERE/blob/master/server/public/images/RMcalendar.png "Queer Here calendar view")

## Documentation

- [Scope document link](https://docs.google.com/document/d/1mGqVfGeI1fdaY95IRJfQjhZ6Utr7szkXV60pcUBPrhg/edit?usp=sharing)

### Completed Features

High level list of items completed.

- [x] Landing page view with upcoming events, welcome message and login.
- [x] Calendar view: Accessible to unregistered users.
- [x] Login and user dashboard: Registered users are able to log in, save events from the main calendar and other organizations to their own profile, create organizations, and create events for those organziations.
- [x] Organization creation form.
- [x] Event creation form with organization reference drop down.
- [x] Individual organization views using $routeParams.



<!-- ### Next Steps

Features that you would like to add at some point in the future.

- [ ] Increase responsiveness to make better for mobile.
- [ ] Incorporate Google Maps API for event locations and directions. -->


## Authors

* Stephanie Ratanas


## Acknowledgments

* [Angular Bootstrap Calendar](https://github.com/mattlewis92/angular-bootstrap-calendar)
