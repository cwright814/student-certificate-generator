# Student Certificate Generator

Web form for batch generation of student course-completion certificate PDFs. This is a stripped version for public demonstration which only downloads the resulting PDFs rather than automating the upload and user notification process.

## System Requirements

- **Node** 10.23.x
- **NPM** 6.14.x
- **Python2** 2.7.x
- **make** latest
- **g++** latest

Easiest way to install Node/NPM is to use NVM.

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install 10.23
nvm use 10.23
```

### Installing on Windows / Mac OS / Linux

```bash
cd ./student-certificate-generator
```

Proceed to [**Project Setup**](#project-setup).

### Installing on Android

Install `node-gyp` via NPM first:

```bash
cd ./student-certificate-generator
npm install node-gyp
```

Then open `common.gypi` with a text editor such as Nano:

```bash
nano ~/.node-gyp/YOUR_INSTALLED_VERSION/include/node/common.gypi
```

Search for the first occurrence of `"android"`, and replace `'-fPIE'` with `'-fPIC'` for both `'cflags'` and `'ldflags'`. Remove the `-pie` flag from `'ldflags'` as well. Search for the second occurrence of `"android"` and repeat the steps above. Save the file, and be sure to `cd` back into the student-certificate-generator directory if necessary.

You may now proceed to [**Project Setup**](#project-setup).

## Project Setup

### Install project dependencies

```bash
NODE_ENV=development
npm install
```

### Prep the global configuration file

A `config.json` must be created and configured within the `src/` folder before the app will run.

See [**Global Configuration**](#global-configuration) for more details on how to set up this file.

## NPM Scripts

### Launch development server

```bash
npm run serve
```

### Launch development server with verbose debugging

```bash
npm run serve:verbose
```

### Compile and minify for production

```bash
NODE_ENV=production
npm run build
```

### Lint and fix files

```bash
npm run lint
```

## Global Configuration

Copy `src/config.template.json` -> `src/config.json`, then fill out the missing values. AWS and Slack key/value pairs must exist at least once between the default and app settings (however, they are unused for this public demo). All `Object` keys must be present - set the object as empty to leave out all of its keys; i.e. `slack: {}`.

### config.json

- **default** `Object` Global default parameters
  - **aws** `Object` Configuration for Amazon Web Services (AWS) *(Unused in public demo)*
    - **region** `string` Server region for requests
    - **identityPoolID** `string` Cognito IdentityPoolID required for authentication
    - **s3** `Object` Configuration for the AWS S3 service
      - **apiVersion** `string` API version for requests
      - **bucket** `string` Bucket to make requests to
      - **maxKeys** `string` Maximum keys that may be returned from a single request
      - **baseConsoleURL** `string` Base URL used when viewing S3 buckets from the console
  - **slack** `Object` Configuration for the Slack messaging service *(Unused in public demo)*
    - **webhookURL** `string` URL for the webhook which will receive submission notifications
  - **jobRunner** `Object` Params for the JobRunner class
    - **concurrency** `string` Maximum number of jobs that can run simultaneously
- **app** `Object` Parameters for the student-certificate-generator app (overrides global defaults)
  - **aws** `Object` Configuration for Amazon Web Services (AWS) *(Unused in public demo)*
    - **region** `string` Server region for requests
    - **identityPoolID** `string` Cognito IdentityPoolID required for authentication
    - **s3** `Object` Configuration for the AWS S3 service
      - **apiVersion** `string` API version for requests
      - **bucket** `string` Bucket to make requests to
      - **maxKeys** `string` Maximum keys that may be returned from a single request
  - **slack** `Object` Configuration for the Slack messaging service *(Unused in public demo)*
    - **webhookURL** `string` URL for the webhook which will receive submission notifications
  - **jobRunner** `Object` Params for the JobRunner class
    - **concurrency** `string` Maximum number of jobs that can run simultaneously
  - **className** `Object` Params for the "Class Name" field
    - **min** `string` Minimum length
    - **max** `string` Maximum length
  - **students** `Object` Params for the "Number of Students" field
    - **min** `string` Minimum value
    - **max** `string` Maximum value
  - **studentName** `Object` Params for the "Student Name" field
    - **min** `string` Minimum length
    - **max** `string` Maximum length
  - **certificateFileExtension** `string` Certificate file extension for input and output
