# Take Your Medicine

using Twilio trial account so have to add number to verified numbers there
not setting up cron job/tasking system like RabbitMQ which would be needed to schedule the reminders
so have them set as management commands so we can run them on command
can we setup that to trigger on a button click :think:


Material UI, while it looks nice and gives you some stuff out of the box that saves time, it does seem to require you to import a lot of varied stuff to make it work, and if you need to overwrite some of their stylings it get complicated
It also gets complicated when handling submits

_logo goes here_

by [JenniKate Wallace](https://github.com/jennikate), [Jonny Farmer](https://github.com/jonnysfarmer)

## The product

[View the app](url)

[View the code](url)

_gif goes here_

### Overview

Don't forget your meds! is an app where you can:

- store your medicine information including dosage and renewal dates
- choose to get reminders to take your meds at a specific time of day
- choose to get SMS and/or email reminders for each type

----

## The brief


----

## Technologies used

#### Backend : technologies used to create our Schema's and API


**Additional Libraries**


#### Frontend : technologies used to create our interface and interactions

**Additional Libraries**

#### Integrations : 3rd party products and APIs

- NHS API for data
- Twilio for SMS
- EmailJS for email


#### Management : tools used for planning and delivery management

- Trello : for task management
- Figma : for wireframing
- LucidChart : for dataflows / dbstructure

----

## The planning

### Management

<img src="https://github.com/jennikate/remember-your-meds/blob/development/readme-images/trello-board.png?raw=true" width="200px">


### Flows

<img src="https://github.com/jennikate/remember-your-meds/blob/development/readme-images/flow-overview.png?raw=true" width="200px"><img src="https://github.com/jennikate/remember-your-meds/blob/development/readme-images/flow-create.png?raw=true" width="200px"><img src="https://github.com/jennikate/remember-your-meds/blob/development/readme-images/flow-remind.png?raw=true" width="200px">


### Entity Relationship Diagram
<img src="https://github.com/jennikate/remember-your-meds/blob/development/readme-images/erd.png?raw=true" width="200px">

----


## The development

----

## Hurdles Overcome & Problems to Solve

----

## Future

### Go Native

We would ideally turn this into a native app for android and iphone and offer notifications as preferable to sms's for reminders. 

### Feature Ideas

These were considered in our architecture but were deprioritised due to time constraints

- I can choose to get reminders to request a new prescription before you need it
- I can choose to get reminders to book a doctor review before you need it
- I can see details about my medicine from the NHS

These are other ideas that we deprioritised before we began design

- Link to/details of my pharmacy 
- Link to/details of my GP
- Search conditions to get NHS information

### Bugs

 - on the single prescription page view, we currently cannot show whether the take reminder is active or not as we need to check all 3 take types, but return only one response (ran out of time to fix this)
 - can't work out how to remove the underline on menu links (text-decoration: none is not clearing them!)

If you find any other bugs let us know!


----
