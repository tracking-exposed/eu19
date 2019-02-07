# Installation Guide
How to install facebook.tracking.exposed web browser extension.

## **Simple Setup**
Our facebook.tracking.exposed extension has been tested on both Mozilla and Google browsers. Once you know which browser you are using, you can follow the steps below.

##### Mozilla Firefox
To install the extension on Firefox, [open this link](https://addons.mozilla.org/en-US/firefox/addon/facebook-tracking-exposed/).

First, click on "Add to Firefox", then confirm by clicking "Add".

![a](https://user-images.githubusercontent.com/40333748/52417746-db376580-2aec-11e9-992a-7233c7811780.png)

![a](https://user-images.githubusercontent.com/40333748/52417747-dbcffc00-2aec-11e9-89d5-fa42d16be133.png)


##### Chromium / Google Chrome
To install on Chromium or Google Chrome, [open this link](https://chrome.google.com/webstore/detail/trackingexposed-investiga/fnknflppefckhjhecbfigfhlcbmcnmmi) and click "Add", then "Add extension".

![screenshot](https://user-images.githubusercontent.com/40333748/52428847-1d6ba180-2b03-11e9-9b00-52c91be72174.png)

![screenshot](https://user-images.githubusercontent.com/40333748/52428849-1e043800-2b03-11e9-8dcb-82fd1a472f6c.png)



#### Congratulations, **facebook.tracking.exposed is now installed and will start working as soon as you open your Facebook feed!**

If, for whatever reason (for example in the unlikely case the extension is taken down), the steps above do not work, keep reading below.



## **Advanced Setup**

This sections describes how to install the extension from our build as zip file.
As a first step you should download the [last build here](https://github.com/tracking-exposed/binaries/tree/master/fbTREX/last).


##### Set up your browser (for Chromium / Google Chrome)

If you use Chrome or Chromium, you should unzip the folder first.
To install the extension insert [chrome://extensions](chrome://extensions) in your URL bar as below.

![screenshot](https://user-images.githubusercontent.com/40333748/52428452-43447680-2b02-11e9-89b9-4326334f0d9b.png)

Afterwards, enable **Developer mode**.

![screenshot](https://user-images.githubusercontent.com/40333748/52428454-43447680-2b02-11e9-8fc6-71784200a894.png)

Click on **Load unpacked extension** and select the unzipped directory contained in this repo.

![screenshot](https://user-images.githubusercontent.com/40333748/52428456-43dd0d00-2b02-11e9-8adf-6c12120a4af7.png)


##### Set up your browser (for Firefox)
As standard practice, firefox doesn't allow unpacked extension to be loaded. However, it does allow developers to test unpacked extensions **temporarily**.
To accomplish this just enter  [about:debugging](about:debugging) in your URL bar.

![screenshot](https://user-images.githubusercontent.com/40333748/52428457-43dd0d00-2b02-11e9-9415-07b014f9482c.png)

Then click on **Load Temporary Add-on** and select the zip file in your Downloads folder.

![screenshot](https://user-images.githubusercontent.com/40333748/52428458-4475a380-2b02-11e9-8151-9d6ac9d2bd2c.png)



## **Forking the Project** (for developers)

The third part of the guide describes how to fork and build this extension using git. 

This project requires Node 5+.
We suggest installing nvm for easy version maintaining. Alternatively, you can install Nodejs from a package, but make sure it's the right version and install npm as well for package management.
Please note that this was tested only for ubuntu systems.

### Install nvm
 On a clean GNU/Linux system, start by installing nvm. It could be useful to update and upgrade your packages too first.

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```
or follow the instructions [here](https://github.com/creationix/nvm).

### Install node and npm
Check the last version of node and then install it through
```
nvm install x.xx.x
nvm install-latest-npm
```

### Clone with git and move to the directory
```
git clone https://github.com/tracking-exposed/web-extension.git
cd web-extension/
```

### Build the files and build the extension

The build system uses a simple `package.json` file to describe the tasks, you can check it out to find out the packages that we rely on to make this extension available or for troubleshooting.

To get started run:

```
npm install
npm test
npm start
```

The second line (`npm test`) is optional, but testing is cool and you should do
it anyway. It's also a nice way to check if the installation succeeded.
If npm test fails, don't worry and try npm start nonetheless, it might be due to facebook frequent html structure changes or nodejs extensions incompatibility, please report it back to us if this is the case.  


`npm start` will build the application using `webpack` and watch for changes.

Keep `npm start` running in the background to take advantage of the autoreload.

### It works!
Now you can use the extensions as described in the Advanced section above.

##### Note on autoreloading the extension
By running `npm start`, the extension will work in `DEVELOPMENT` mode. This
means that every time you reload `facebook.com`, the extension will automatically
reload itself using the `chrome.runtime.reload()` method.

Note that before we were using [Extension
Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)
to autoreload your extension every time a build succeeds.
This dependency is no longer needed.

##### Extend fixtures

 * You've to install the package `tidy` the last version in ubuntu is not
   working (we'll update the comment when fixed), use
   http://binaries.html-tidy.org/
 * Copy the userContentWrapper Element
 * save in file.html

```
tidy -i -m -w 0 -utf8 file.html
```

##### TL;DR how replicate the build?

`$ npm i ; npm run build:dist ; ls -l dist/extension.zip`
