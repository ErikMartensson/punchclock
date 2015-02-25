PunchClock
==========

This is a web app custom made for the HipChat PunchClock room that the IT-department, at ServiceFinder, is using.
The first time you use this web app, you'll need to enter your HipChat API token. After that you just open up the web page and press the appropriate button.

**What you'll need to set this up**

- A server with Node.js installed on
- A specific HipChat room, and the ID for that room

**What you, as a user, need to use this web app**

- A HipChat account with an API token
- A semi modern browser, this has only been tested in Chrome for Windows and Chrome for Android
	- CSS3 Animations
	- Local storage

*Stuff that I used to make this work*

- [Node.js](http://nodejs.org/)
- [express](https://www.npmjs.org/package/express)
- [body-parser](https://www.npmjs.org/package/body-parser)
- [hipchatter](https://www.npmjs.org/package/hipchatter)
- [jQuery](http://jquery.com/)
- [SweetAlert](http://tristanedwards.me/sweetalert)
