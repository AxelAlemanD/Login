# Advantage Marketing Technical Test

Solution to the Advantage Marketing technical test for the position of Angular/Ionic developer

## Features

* Login: Users can log in to the application by entering their valid credentials, which consist of their email address and password.
* Registration: Users can create a new account to access the home screen.
* Reset Password: Users have the option to reset their password in case they forget it.
* Error Handling: The application provides clear feedback to the user during all interactions, including response waits and errors.
* Route Protection: The app restricts access to the home screen only for authenticated users.
* Local storage: The application simulates calls to a real server using a service and storing information in local storage

## Requeriments
* `nodeJS`

## Installation
How to Run this project
You should have installed nodeJS before continuing with this guide Run this commands:

1. `npm install -g @ionic/cli`
2. `npm install`
3. `ionic serve`

That's it, the app should begin running in your browser.

## Generate APK
1. `ionic capacitor build android`
2. The last command open Android Studio. Within Android Studio, click the "Run" button, select the attached Android device, then click OK to build, install, and launch the app on your device.
