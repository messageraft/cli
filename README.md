<p align="center">
  <a href="" rel="noopener">
 <img src="https://i.imgur.com/K8iNOa8.png" alt="Messageraft"></a>
</p>

<h2 align="center">Messageraft</h3>

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
[![Version](https://img.shields.io/npm/v/@messageraft/cli.svg)](https://npmjs.org/package/@messageraft/cli)
[![License](https://img.shields.io/npm/l/@messageraft/cli)](https://github.com/messageraft/cli/blob/main/package.json)
[![GitHub Issues](https://img.shields.io/github/issues/messageraft/cli.svg)](https://github.com/messageraft/cli/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/messageraft/cli.svg)](https://github.com/messageraft/cli/pulls)
</div>

<div align="center">

![Social](https://img.shields.io/twitter/follow/messageraft_com?style=social)

</div>

## <p align = "center">💡 Notification Gateway for sending emails, sms, direct chat and more!</p>

## 📝 Table of Contents

<!-- toc -->
- [About](#about)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Authors](#authors)
<!-- tocstop -->

<!-- about -->
## 🧐 About <a name = "about"></a>
Messageraft is a notification gateway where you have a single API to send multiple types of notification.

By configuring Messageraft with your 3rd party provider API keys you can use this service to send your message and Messageraft does the rest

> Currently supported providers out of the box: **Sendgrid**, **Twilio** and **Slack**
<!-- aboutstop -->

## 🏁 Getting Started <a name ="getting-started"></a>

### Step 1 - Install CLI

```sh-session
$ npm i -g @messageraft/cli

OR

$ yarn global add @messageraft/cli
```

### Step 2 - Run init command
Main question the CLI will ask is to select the providers you want to install

```sh-session
$ messageraft init <directory-name>
```

### Step 3 - Setup ENV variables
Last step before spinning up the server is to setup the environment variables. Check `config/env/development.example.env` on necessary details needed based on the providers you selected

> IMPORTANT: Don't forget to rename development.example.env -> development.env

### Step 4 - Start server and send request
The server was created using [Nest JS](https://nestjs.com/) but there is nothing you need to touch really.
```sh-session
# Start server locally

$ npm run start:dev
 
OR

$ yarn start:dev
```
NOTE: Ideally if you are going to deploy then you should first build the server before running, also creating a `production.env` file is required

### Step 5 - Send a message

```bash
curl --request POST \
--header "Content-Type: application/json" \
--data '{
  "data": {
   "to": "xyz@gmail.com",
   "from": "hello@messageraft.com",
   "subject": "Testing",
   "html": "<p>Hello <strong>World</strong></p>"
  }
}' \
http://localhost:3000/message/send/sendgrid
```

## ✍️ API Documentation <a name = "api-documentation"></a>

Messageraft is using Swagger to host the documentation, simply navigate to 

```
http://localhost:3000/api
```

to view the documentation

<!-- usagestop -->

## ✍️ Authors <a name = "authors"></a>

- [@pitops](https://github.com/pitops)
