# Configuration
This project runs on React Native using the Expo CLI for bundling. For reference, please click [here](https://reactnative.dev/docs/environment-setup)

To get the application running, you must have Node 14 LTS or higher installed. 

**Below are two ways that you are able to install Node LTS**

## Installation via Chocolatey

If you do not have chocolatey installed, run the following command on an administrative command prompt

`Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`

*Note: Once you run the above command to install chocolatey, you may have to close and reopen an admin prompt*

Once you have this installed, to install Node on your computer run the following command below on an admin prompt

`choco install nodejs-lts`

## Installation via .msi

Click this link [here](https://nodejs.org/en/download/) for the node.js installation website and just follow the steps for your specific OS

# Set Up

To verify that Node installed correctly, in a command prompt type the following commands
```
node -v
npm -v
```

Now that you have node installed, you will have to download certain npm packages to have the application run. Below are the commands that are needed to install npm, the expo CLI, and yarn (the npm package manager that we use) globally on your computer

```
npm install -g npm
npm install -g expo-cli
npm install -g yarn
```

# Running the Project

Now that you have all the dependencies installed, all you have to do is install all of the npm packages that we use and run the expo-CLI tool on your laptop

To run this project, open your filesystem to the directory that you want to clone this project into and run...
```
git init
git clone https://github.com/PDuff234/Paper-Management-System
```

Once cloned, navigate into the project directory with a `cd Paper-Management-System`

When you are in the projects directory, run the following commands to install all npm packages used and run the project

```
yarn 
yarn start
```

# Setting up the Database

Sweet! If you followed everything up to this point, you should be able to run the app itself but none of the APIs. Here is how you set everything up to have a fully functional program

Since we are using a PERN stack, PostgreSQL is required to operate this program. Please click [here](https://www.postgresql.org/download/) to download PostgreSQL for your specific OS

Once you have the PostgreSQL suite downloaded, you need to initalize Postgres by running the SQL Shell application. The easiest way I found to run the SQL Shell is by looking up "psql" in the Windows Search Bar and running the application. 

When in the psql Shell, set up the credentials for PostgreSQL using the information provided in [db.js](https://github.com/PDuff234/Paper-Management-System/blob/main/server/db.js)

# Initializing Tables for the Database

Once initialized, you are going to go into pgAdmin4 (The PostgreSQL GUI) to create the tables required to run this database. To do this, you will have to navigate to Server > PostgreSQL 14 > Databases and login with your specific information

Once you are in the Database tab, right click on Databases and go to Create > Database... and name the database 'pdms'

Congrats! Now you have a database! Now navigate to the pdms database you just created and right click on pdms to go to Query tool

Once in the Query tool, click on the file icon right above 'Query' and navigate to [DBInit\DBInit.sql](https://github.com/PDuff234/Paper-Management-System/tree/main/DBInit) to open the file in pgAdmin4 and then run the file by pressing F5 or clicking on the Execute/Refresh icon

# Final Touches

Now that you have the database as well as the application up and running, you are almost ready to have full capability of the program

To have the application interact with the database, you will have to open up a listener port in your terminal

To do this, open up a new terminal and navigate to .\server\ from within the project

Once your terminal is in the server directory, run the command `nodemon index` to start the listener on port 5000

Leave the nodemon terminal running and open a second terminal in the projects home directory and run `yarn start` to run the application with full functionality

To kill either terminal at any time, press Ctrl+C to kill the program