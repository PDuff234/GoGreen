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
git clone https://github.com/PDuff234/GoGreen
```

Once cloned, navigate into the project directory with a `cd Go Green`

When you are in the projects directory, run the following commands to install all npm packages used and run the project

```
yarn 
yarn start
```

# Final Touches

To test this application on your phone, you will have to go to your platforms app store and download [Expo Go](https://expo.dev/client)

Once you have Expo Go on your phone, you will have to have your phone and laptop/PC connected to the same internet source for the project to compile

Once you have the application and you are connected to the same internet, you scan the QR code generated in the terminal using your phones camera to run the application!

To kill either terminal at any time, press Ctrl+C to kill the program