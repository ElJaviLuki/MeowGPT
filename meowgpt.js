// Get the entire page's source code as a string
var pageSource = document.documentElement.outerHTML;

// Replace '"oof":true' with '"oof":false'
pageSource = pageSource.replace(/\"oof\":true/g, '"oof":false');

// Replace the current page's source code with the modified version
document.open();
document.write(pageSource);
document.close();


window.enableFakeMod = (localStorage.getItem("enable_fakemod") == 'false') ? false : true;
// Create a new style element.
var style = document.createElement('style');
// Add CSS styles to the style element.
style.innerHTML = '.switch{position:relative;display:inline-block;width:60px;height:34px;}.switch input{opacity:0;width:0;height:0;}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s;}.slider:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;transition:.4s;}input:checked + .slider{background-color:#2196F3;}input:focus + .slider{box-shadow:0 0 1px #2196F3;}input:checked + .slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px);}.slider.round{border-radius:34px;}.slider.round:before{border-radius:50%;}';
// Add the style element to the head of the page.
document.head.appendChild(style);
window.switchEnableFakeMod = function () {
    let cswitch = document.querySelector("input#cswitch");
    let checked = cswitch ? cswitch.checked : false;
    if (checked) {
        window.enableFakeMod = true;
        localStorage.setItem("enable_fakemod", true);
    } else {
        window.enableFakeMod = false;
        localStorage.setItem('enable_fakemod', false);
    }
};
window.clearAllBoxItem = function () {
    let navs = document.querySelectorAll('nav');
    for (var x = 0; x < navs.length; x++) {
        var allItems = navs[x].querySelectorAll('div.toolbox-item');
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].remove();
        }
    }
};
window.exportSaveData = function () {
    var conversation_id = window.conversation_id_last || "";
    var parent_message_id = window.parent_message_id_last || "";
    var authorization = window.authorization_last;
    if (conversation_id == "" || parent_message_id == "" || conversation_id == "undefined" || parent_message_id == "undefined") {
        alert("Please say at least two sentences before using this feature!");
        return
    }
    var jsonObject = {
        conversation_id: conversation_id,
        parent_message_id: parent_message_id,
        authorization: authorization
    };
    var jsonString = JSON.stringify(jsonObject);
    var base64String = window.btoa(jsonString);
    return base64String;
};

window.importSaveData = function (savB64) {
    var decodedString = window.atob(savB64);
    var jsonObject = JSON.parse(decodedString);
    if (!jsonObject || jsonObject.conversation_id === undefined || jsonObject.parent_message_id === undefined) {
        alert("The session archive is corrupted, please make sure to copy it in full!");
        return
    }
    let authUnix = window.getAuthTimestamp(jsonObject.authorization) || 0;
    if (authUnix && Math.floor(Date.now() / 1000) > authUnix) {
        if (!confirm("This session archive's token looks expired and may not work properly. \r\nIf this archive was exported by the current account, you can try using the current session to overwrite the imported state.\r\nDo you want to continue?")) {
            return
        }
    } else {
        alert("This session archive's validity expires at: \r\n" + (new Date(authUnix * 1000)).toLocaleString('en-US') + "\r\n\r\nNote: imported sessions cannot be exported or saved again.");
        window.import_authorization = jsonObject.authorization;
    }
    window.next_conversation_id = jsonObject.conversation_id;
    window.next_parent_message_id = jsonObject.parent_message_id;

    alert("Import successful, the current session state has been \"temporarily\" attached to the imported archive. This will take effect on your next sentence.\r\nIf the host of the archive has logged out or released the session, the archive will also become invalid. \r\n You may be prompted to log in again.\r\n\r\nTo detach the attached state in the middle, please refresh the browser, click \"New Chat\" to create a new session, or switch to other sessions.");
};

window.clearTempValues = function () {
    delete window.import_authorization;
    delete window.next_parent_message_id;
    delete window.next_conversation_id;
    delete window.parent_message_id_last;
    delete window.conversation_id_last;
    delete window.authorization_last;
};
window.boxInit = function () {
    window.clearAllBoxItem();
    var navs = document.querySelectorAll('nav');
    for (var x = 0; x < navs.length; x++) {
        let nav = navs[x];
        let switchLabel = document.createElement("div");
        let aEle = nav.querySelectorAll('a');


        if (!nav.childNodes[0].hasOwnProperty('patched')) {
            nav.childNodes[0].addEventListener("click", function (event) {
                event.preventDefault();
                if (confirm("A new session is about to be created, the imported session from the import function will become invalid, do you want to continue?")) {
                    nav.childNodes[0].removeEventListener('click', arguments.callee);
                    window.clearTempValues();
                    nav.childNodes[0].click();
                }
            });
            Object.defineProperty(nav.childNodes[0], 'patched', { value: true, enumerable: false });
        }

        switchLabel.setAttribute("class", "toolbox-item flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm flex-shrink-0 border border-white/20");
        switchLabel.innerHTML = `<svg t="1670527970700" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9830" width="18" height="18"><path d="M514 114.3c-219.9 0-398.8 178.9-398.8 398.8 0 220 178.9 398.9 398.8 398.9s398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m0 685.2c-42 0-76.1-34.1-76.1-76.1 0-42 34.1-76.1 76.1-76.1 42 0 76.1 34.1 76.1 76.1 0 42.1-34.1 76.1-76.1 76.1z m0-193.8c-50.7 0-91.4-237-91.4-287.4 0-50.5 41-91.4 91.5-91.4s91.4 40.9 91.4 91.4c-0.1 50.4-40.8 287.4-91.5 287.4z" p-id="9831" fill="#dbdbdb"></path></svg>Disable data monitoring<label class="switch" style="position: absolute; right: 15px;"><input id="cswitch" type="checkbox" ${window.enableFakeMod ? "checked='true'" : ""} onclick="window.switchEnableFakeMod()" ><span class="slider"></span></label>`;
        nav.insertBefore(switchLabel, nav.childNodes[1]); // Insert the newly created switchLabel element before the second child element of the nav element.
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].innerHTML.indexOf('FAQ') >= 0) {
                aEle[i].removeAttribute('href');
                aEle[i].innerHTML = '<svg t="1670527911492" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8753" width="16" height="16"><path d="M562.996016 643.229748V72.074369a50.996016 50.996016 0 0 0-101.992032 0v571.155379a50.996016 50.996016 0 0 0 101.992032 0z" fill="#dbdbdb" p-id="8754"></path><path d="M513.087915 144.080744L802.337317 432.446215a50.996016 50.996016 0 0 0 71.93838-72.210358L513.087915 0 149.588313 362.411687A50.996016 50.996016 0 0 0 221.594688 434.486056L513.087915 144.148738zM53.035857 643.229748v184.537583c0 109.471448 105.255777 192.832935 230.026029 192.832935h457.876228c124.770252 0 230.026029-83.361487 230.026029-192.832935V643.229748a50.996016 50.996016 0 1 0-101.992031 0v184.537583c0 47.256308-55.075697 90.840903-128.033998 90.840903H283.061886c-72.9583 0-128.033997-43.65259-128.033998-90.840903V643.229748a50.996016 50.996016 0 0 0-101.992031 0z" fill="#dbdbdb" p-id="8755"></path></svg>Export conversation';
                aEle[i].onclick = function () {
                    var textarea = document.querySelector("textarea");
                    let savB64 = window.exportSaveData();
                    if (savB64) {
                        prompt("↓ Please copy your session archive ↓", savB64);
                    }
                }
            }
            if (aEle[i].innerHTML.indexOf('OpenAI Discord') >= 0) {
                aEle[i].removeAttribute('href');
                aEle[i].innerHTML = '<svg t="1670527878930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7606" width="16" height="16"><path d="M563.2 68.266667v573.44a51.2 51.2 0 0 1-102.4 0V68.266667a51.2 51.2 0 0 1 102.4 0z" fill="#dbdbdb" p-id="7607"></path><path d="M513.092267 616.584533l290.474666-289.518933a51.2 51.2 0 0 1 72.226134 72.4992L513.092267 761.173333 148.138667 397.448533A51.2 51.2 0 0 1 220.433067 324.949333l292.6592 291.6352z" fill="#dbdbdb" p-id="7608"></path><path d="M51.2 641.706667v185.275733c0 109.909333 105.6768 193.604267 230.946133 193.604267h459.707734c125.269333 0 230.946133-83.694933 230.946133-193.604267V641.706667a51.2 51.2 0 1 0-102.4 0v185.275733c0 47.445333-55.296 91.204267-128.546133 91.204267H282.146133c-73.250133 0-128.546133-43.8272-128.546133-91.204267V641.706667a51.2 51.2 0 0 0-102.4 0z" fill="#dbdbdb" p-id="7609"></path></svg>Import conversation';
                aEle[i].onclick = function () {
                    if (!window.location.href.includes("/chat/") && window.location.href.includes("/chat")) {
                        alert("Please use this function on an existing session, \r\nrather than in the context of an empty \"New Chat\" session.");
                        return
                    }
                    var userInput = prompt("Please paste the session archive here.");
                    window.importSaveData(userInput);
                }
            }

            if (!nav.childNodes[0].hasOwnProperty('patched')) {
                nav.childNodes[0].addEventListener("click", function (event) {
                    event.preventDefault();
                    if (confirm("A new session is about to be created, the imported session from the import function will become invalid, do you want to continue?")) {
                        nav.childNodes[0].removeEventListener('click', arguments.callee);
                        window.clearTempValues();
                        nav.childNodes[0].click();
                    }
                });
                Object.defineProperty(nav.childNodes[0], 'patched', { value: true, enumerable: false });
            }
        }

    }
};
window.getAuthTimestamp = function (authBearer) {
    var authArray = authBearer.split('.');
    if (authArray.length < 2) {
        return 0;
    }
    var decodedString = window.atob(authArray[1]);
    var jsonObject = JSON.parse(decodedString);
    if (jsonObject && jsonObject.exp) {
        return jsonObject.exp;
    }
    return 0;
};

window.boxInit();
const oldFetch = window.fetch;
window.fetch = function (...args) {
    if (args[0].includes("moderations") && window.enableFakeMod) {
        return new Response('{}', {
            status: 200,
            statusText: "ok",
        })
    }

    if (args[0].includes("signout") && window.enableFakeMod) {
        if (!confirm("Do you want to log out?")) {
            return new Response('{}', {
                status: 200,
                statusText: "ok",
            })
        }
    }

    if (args[0].includes("/conversation/") || args[0].includes("/conversations") || args[0].includes("/chat.json")) {
        if (args[0].includes("/conversations") && args[1].method === "PATCH") {
            let bodyJson = JSON.parse(args[1].body);
            bodyJson.is_visible = !(confirm("Warning: Are you sure you want to clear all session records under your account?") && confirm("Warning: Second confirmation, you will not be able to retrieve previous records after clearing, do you want to continue?"));
            if (!bodyJson.is_visible) {
                window.clearTempValues();
            }
            args[1].body = JSON.stringify(bodyJson);
        }
        setTimeout(window.onresize, 1000);
        window.clearTempValues();
    } else if (args[0].includes("conversation")) {
        if (args[1].body && args[1].method === "POST") {
            //Overriding original authentication
            var headers = new Headers(args[1].headers);
            let lastAuth = headers.get("authorization");
            window.authorization_last = lastAuth;
            let authorization = window.import_authorization ? window.import_authorization : lastAuth;
            headers.set("authorization", authorization);
            args[1].headers = headers;
            //Processing session data attachments
            let bodyJson = JSON.parse(args[1].body);
            if (window.next_conversation_id && window.next_parent_message_id) {
                bodyJson.conversation_id = window.next_conversation_id ? window.next_conversation_id : bodyJson.conversation_id;
                bodyJson.parent_message_id = window.next_parent_message_id ? window.next_parent_message_id : bodyJson.parent_message_id;
                args[1].body = JSON.stringify(bodyJson);
                delete window.next_parent_message_id;
                delete window.next_conversation_id;
            } else {
                window.conversation_id_last = bodyJson.conversation_id;
                window.parent_message_id_last = bodyJson.parent_message_id;
            }
        }
    }
    return oldFetch(...args)
};

var resizeTimer = null;
window.onresize = function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        window.boxInit();
        var buttons = document.getElementsByTagName('button');
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            if (button.innerHTML.indexOf('sidebar') !== -1) {
                button.addEventListener('click', function () { window.setTimeout(function () { window.boxInit() }, 300) });
            }
        }
    }, 200);
};

window.onresize();

alert("MeowGPT was enabled.");
