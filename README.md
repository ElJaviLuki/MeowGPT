# MeowGPT
MeowGPT is a set of tools for ChatGPT that allows you to use ChatGPT with minimal coding.

The current version includes:
1. The ability to turn off data governance
2. Importing and exporting sessions
3. Increasing the maximum load limit:
- Enabling "Regenerate Response" automatically
- Bypassing login restrictions when they are in place

# Warning
1. Be careful not to share exported session archives with anyone you don't know, as it could put your account at risk.
2. Keep in mind that this project is just for experimenting with what ChatGPT can do, so don't use it excessively.
3. Also, keep in mind that the exported archives will no longer be valid once the authentication expires.

# Instructions:
Copy the entire JS of the corresponding version, add a javascript: bookmark in your browser.

## PC/MAC Chrome
1. Copy the following code:
This JavaScript will retrieve the latest version of the code from the repository:
```
javascript:var xhr=new XMLHttpRequest();xhr.open('GET','https://ghproxy.com/https://raw.githubusercontent.com/eljaviluki/MeowGPT/main/meowgpt.js',true);xhr.onload=function(){if(xhr.readyState===4&&xhr.status===200){eval(xhr.responseText)}};xhr.send(null);
```
You can also save the complete JavaScript directly in your bookmark and run it. This will save loading time, but you may need to update the version manually.
2. Create a new bookmark, delete any existing URL, paste the code, and save it.
3. Click on this bookmark in the ChatGPT chat interface to activate it (retrieving the latest version remotely may take 1-5 seconds).

## Mobile Chrome usage guide
There are two options for mobile devices.
For large-screen devices such as Chrome on an iPad, you can add the PC version of the bookmark directly.
For small-screen devices such as a mobile phone, it's recommended to add it to the bookmark bar and give it a memorable name. After that, manually click on the javascript part that starts.
If the bookmark is not working properly, please follow these steps:

1. Copy the following code:
This JavaScript will retrieve the latest version of the code from the repository:
```
var xhr=new XMLHttpRequest();xhr.open('GET','https://ghproxy.com/https://raw.githubusercontent.com/eljaviluki/MeowGPT/main/meowgpt.js',true);xhr.onload=function(){if(xhr.readyState===4&&xhr.status===200){eval(xhr.responseText)}};xhr.send(null);
```
2. Create a new bookmark in Chrome on your phone, paste the code and save it.
3. On the page you want to activate, manually enter the name of the bookmark you just saved in the address bar and click on it.