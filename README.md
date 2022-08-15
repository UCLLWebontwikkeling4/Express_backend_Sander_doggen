# Getting Started with Lecturers example

## **Prerequisites**

`WSL`

WSL stands for Windows Subsystem Linux and allows you to install a linux distribution in Windows. It provides performant and seamless integration between windows and linux, without the need for virtualisation. Web development and a lot of its tools work better on a linux based system.
More info: https://www.digitalocean.com/community/posts/trying-the-new-wsl-2-its-fast-windows-subsystem-for-linux

If you're running on Windows, you can choose to install WSL2 (with ubuntu distro).
More information on how to install WSL: https://docs.microsoft.com/en-us/windows/wsl/install.

On mac or native linux, you can skip this step.

`Mysql`

To install mysql in WSL, you can execute:

```
> sudo apt install mysql-server
```

To start mysql:

```
sudo service mysql start
```

You can execute the DDL in **sql/dd.sql** in your favorite mysql tool (Datagrip, Mysql Workbench, SequelPro,...) to create the schema and insert initial data.

`Dotenv`

Dotenv is a module to externalize configuration, for instance database connection details.
To get this demo up and running, you'll need to create a **.env** file in you root project directory (on the same level as .gitignore). The contents should look like this:

```
APP_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_SCHEME=lecturers
```

Replace the connection details with the ones from your server.

`VSCode`

Throughout the lessons we'll use VSCode for the excerises. Make sure you have the following extensions downloaded and enabled:

-   Prettier - Code formatter
-   Auto Rename Tag
-   GitLens - Git supercharged

Open the settings of VSCode, search for **Format on save** and make sure it's checked. This assures that every time you save a file, it's being formatted according to the code style rules described in **.prettier.rc**.

Replace the values with your local configuration.

## **Starting the demo application**

Run the following commands in a terminal (project root folder) to install all required node packages en get the server up and running:

```
> npm install

> npm start
```

This will start an express server on [http://localhost:3000](http://localhost:3000).
You can test if everything works by requesting http://localhost:3000/status or http://localhost:3000/status/lecturers from a browser or a tool like Postman.

You can access the API documentation and test it via Swagger running on http://localhost:3000/api-docs.

## **Troubleshooting**

### **Debugging in VSCode and WSL**

In VSCode, you can attach a debugger to a Node process and use breakpoints to debug your code. However, since the Node processes are running within WSL and VSCode in Windows (where no node processes are running), you'll need to perform some steps to get this working:

-   In VSCode install the extension **Remote WSL**.
-   Open VSCode in WSL by clicking on the yellow "><" icon on the bottom of the screen and selecting "Reopen folder in WSL".
-   VSCode is now able to detect the Node processes. Press **Ctrl-shift-p** and type "Debug: attach to Node process".
-   Select (the first) process in the list.
-   You can now put breakpoints and start debugging

### **Network problems in WSL**

If you're having problems in WSL when executing command that require a network connection, like **curl** or **ping**, try the following:

Edit the file **/etc/wsl.conf** and add the lines:

```
[network]
generateResolvConf = false
```

Remove symlink **/etc/resolv.conf**

```
> sudo rm -rf /etc/resolv.conf\*\*
```

Create a new file **/etc/resolv.conf** and add the line:

```
nameserver 8.8.8.8
```

Lock the resolv.conf so it doesn't get overwritten by executing:

```
> sudo chattr +i resolv.conf
```

Restart WSL.

### **Setting WSL as default integrated terminal in VSCode**

In VSCode press **ctr/cmd-shift-p** and type **"Open Settings (JSON)"**.

In the Object **terminal.integrated.profiles.windows** add this entry:

```
"Ubuntu (WSL)": {
"path": "C:\\WINDOWS\\System32\\wsl.exe",
"args": ["-d", "Ubuntu"]
}
```

Find the setting **terminal.integrated.defaultProfile.windows** and change it to:

```
"terminal.integrated.defaultProfile.windows": "Ubuntu (WSL)"
```
