# Take Your Medicine




by [JenniKate Wallace](https://github.com/jennikate), [Jonny Farmer](https://github.com/jonnysfarmer)

## The product

[View the app](https://rememberyour-meds.herokuapp.com/) | [View the code](https://github.com/jonnysfarmer/remember-your-meds)



### Overview

_Take Your Medicine_ is an app where you can:

- store your medicine information including dosage and renewal dates
- choose to get reminders to take your meds at a specific time of day
- choose to get SMS and/or email reminders for each type

If you'd like to install this locally you will need to

 - fork this repo
 - run `npm i` to install all the frontend dependencies
 - run `pipenv install` to install all the backend dependencies
 - create a PostgreSQL database called `prescriptions`
 - run `python manage.py migrate` to setup the database
 - run `python manage.py loaddata Fixture.json` to add the medicine names for the autocomplete

----

## The brief

### Project #4: A Django + React App

#### Technical Requirements

You must:

* [x] **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* [x] **Consume your API with a separate front-end** built with React
* [x] **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* [x] **Build a full-stack application** by making your own backend and your own front-end
* [x] **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* [x] **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* [x] **Be deployed online** so it's publicly accessible.


#### Necessary Deliverables

* [x] A **working app** hosted on the internet
* [x] A **link to your hosted working app** in the URL section of your Github repo
* [x] A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* [x] **A `readme.md` file** with:
    * [x] An embedded screenshot of the app
    * [x] Explanations of the **technologies** used
    * [x] A couple paragraphs about the **general approach you took**
    * [x] **Installation instructions** for any dependencies
    * [x] Link to your **user stories/wireframes** – sketches of major views / interfaces in your application
    * [x] Link to your **pitch deck/presentation** – documentation of your wireframes, user stories, and proposed architecture
    * [x] Descriptions of any **unsolved problems** or **major hurdles** you had to overcome

----

## Technologies used

#### Backend : technologies used to create our Schema's and API

 - Django
 - Python

**Additional Libraries**

 - Yagmail for email
 - JWT for registration/login

#### Frontend : technologies used to create our interface and interactions

 - ReactJS
 - MaterialUI
 - Axios

**Additional Libraries**

 - Moment for formatting and manipulating times and dates
 - React Router for handling links


#### Integrations : 3rd party products and APIs

- NHS API for data
- Twilio for SMS


#### Management : tools used for planning and delivery management

- Trello : for task management
- Figma : for wireframing
- LucidChart : for dataflows / dbstructure

----

## The planning

### Management

<img src="https://github.com/jennikate/remember-your-meds/blob/master/readme-images/trello-board.png?raw=true" width="200px">


### Flows

<img src="https://github.com/jennikate/remember-your-meds/blob/master/readme-images/flow-overview.png?raw=true" width="200px"><img src="https://github.com/jennikate/remember-your-meds/blob/master/readme-images/flow-create.png?raw=true" width="200px"><img src="https://github.com/jennikate/remember-your-meds/blob/master/readme-images/flow-remind.png?raw=true" width="200px">


### Entity Relationship Diagram
<img src="https://github.com/jennikate/remember-your-meds/blob/master/readme-images/erd.png?raw=true" width="200px">

----


## The development


## Hurdles Overcome & Problems to Solve

### Scheduling Reminders

_not overcome in this project_

The idea of this app is to send you reminders, either on a date or at a time, so you remember to take medicine, or order it, or make a doctors appointment to review.

We spent some time investigating how to trigger these reminders at the specific time or date. And decided it had to be a CRON job, or even better, using a proper scheduler like RabbitMQ. This was outside our capabilities currently and as this was a week long project we decided we did not have enough time to learn how to set these up, and therefore have not built the actual scheduling of sends.

**Send email reminders**
We implemented Yagmail to send email reminders and can trigger a successful send from our backend.

**Send SMS reminders**
We implemented Twilio to send sms reminders and could trigger a successful send from our backend, though we've removed this functionality for deployment as it can't be run from live app and contains secure information that we didn't want to have to deal with for this project deploy.

### Material UI

_SOLVED! (mostly)_

Learning to use Material UI was a harder task than we expected. While the basics are straightforward once you get into more custom styling it can be come very verbose very quickly.
We built as we understood and then returned to the styling at the end and refactored it once we had more knowledge of all the components we used.

In the end we had only one item we couldn't resolve, and that is the underline that shows on the links in the nav.

----

## Future

### Go Native

We would ideally turn this into a native app for android and iphone and offer notifications as preferable to sms's for reminders. 


### Feature Ideas

These were considered in our architecture but were deprioritised due to time constraints

- Link to/details of my GP

These are other ideas that we deprioritised before we began design

- Link to/details of my pharmacy 
- Search conditions to get NHS information

### Bugs

 - on edit prescription, if you change amounts but do not reenter(orchange) the prescription name, it errors with 'not a valid string'
 - time input fields not working on iOS (safari or chrome), discovered they are unsupported only after we'd pushed to heroku and tested on phones

Something to be aware of: 

 - page loads after form submits are not always loading full info now we're on Heroku with `too many connections`, this is because we're using a free option in Heroku


If you find any other bugs let us know!


----
