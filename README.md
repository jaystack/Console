# Console

## Problem
As a project manager, managing multiple projects through multiple channels of communication can get extremely difficult and things get missed. Additional, unnecessary time is spent trying to track down files, emails and contact details, which is horribly inefficient.

## Solution
A new communications aggregator application. This application will serve as a platform for plugins to be developed (hereafter refer to as "Connectors"), integrating new forms of communication into one chronologically ordered, digestible, efficiently searchable feed. Initially the application will ship with only a few connectors, such as email integration, Google Drive, HipChat and Slack.

### UI
The main UI will mimic popular "infiniscroll" style feeds, such as that of Facebook or Twitter, with a large search bar at the top allowing users to easily search through the various messages, emails, files that been aggregated. Additionally filters based on metadata collected at the time of import to the database will allow the user to finely tune the data they see.

There will also be a dashboard screen, where users can configure their services and manage contacts, organisations and projects.

### Email problem
With multiple email providers this could get sticky. We have a few main options so far:

* ##### Integrating Azure Logic Apps (Hi-tech)
Azure Logic Apps allows us to create workflows of serverless functions from a variety of triggers ranging from a HTTP request to a tweet with a certain hashtag. It includes a number of connectors integrating services like Office365, so it's possible a solution could be build like this.

* ##### Forwarding all incoming email to a capture account (Lo-tech)
We could configure dynamically generated mailboxes for each account and instruct them to configure a rule on their email provider to forward all incoming mail to that account, which would be captured by our system and populated into the database. Whilst this is more compatible than the Azure solution in the long run, it doesn't synchronise between the email server and the application in terms of deletion, read status, etc.

* ##### Integrating IMAP/POP3 (and SMTP later on, most resilient)
We could also allow users to configure mail accounts through their IMAP/POP3 details. This would allow full integration into the system, and would allow for the greatest compatibility.

### Search
The search functionality will be powered by a cloud search solution like elasticsearch and will index multiple fields.

### DevOps/CI/GIT
There will be connectors for services like Jenkins that will allow continuous integration logs to be aggregated within the feed. Additionally information like commits and pull requests could feature as items.

### Modularity
As this application is to be a product after internal use and development, connectors will need to be self contained and modular, so as to set a standard ensuring maximum compatibility with future connectors.

### Authentication
Users will need to authenticate so as to receive the appropriate data, therefor some kind of authentication system must be implemented.

### Restrictions of MVP offering
The initial offering will feature only a few connectors and, with the exception of email, will not feature the ability to respond or otherwise affect any of the items other than simply to view them. In email's case there is an exception because we want the email server to know when an email has been read so that it can synchronise this across the user's devices.

### Steps after MVP
Later on this application will be productised. This means that a great number of additional connectors will need to be developed to ensure we have an offering that has mass market appeal.
