# **CS-300; Elements of Software Engineering**
# *SleepyChat* by Isaac Yep
## **Description**
*SleepyChat* is a web-hosted chat application written by Isaac Yep. This web app exists solely as a means to learn, and as it falls under the *MIT License*, is free to use by anyone for educational or personal utility.<br>
This application was made under the supervision of project manager *Li Shi* and professor *Fei Xie* at *Portland State University* solely by *Isaac Yep*. Some of the fonts in this application are not supported by mobile browsers or deprecated desktop browser clients.

## **Front-end**
`index.js` manages the server/host filesystem exposure and serves the landing page `index.html` where the user can enter credentials to authenticate themselves. For demonstration purposes, it logs to the console success or failure of authentication.<br>
The front end css is supported by ***fontawesome*** and ***bootstrap v4.4.1*** as well as ***express*** and ***websocket_io*** handling middleware tasks. Ultimately this is a ***node.js*** project, with `chat.html` serving as the file behind the authentication wall being updated by back-end and middleware supporters.
 
## **Back-end**
`index.js` emits and recieves request and response strings ultimately to the custom interface I've implemented. The database `sleepyChat.db` has two interface modules that are exported to `index.js`, the first is `chatLoginInterface.js` that offers utilities for the *history* table and handles incoming messages in the chat log (schema shown below). The second is `userInterface.js` that offers utilities for the *users* table and handles authentication (schema shown below).

### __***history* Schema**__
| [TEXT] username * | [TEXT] msg |
|--|--|
| Sleepy Boy | this |
| Sleepy Boy | is |
| Sleepy Boy | a test |
| Awakey Girl | I'm here too! |

### __***users* Schema**__
| [TEXT] username * | [TEXT] password | [TEXT] email |
|--|--|--|
| Sleepy Boy | abcdefg | sleepyboy@gmail_com |
| Awakey Girl | 123456 | awakeygirl@gmail_com |
