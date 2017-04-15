
ice Tray
-----------------
Why use iceTray?  Ice Tray lets you progressively load your content and assets.  You can prioritize your most important content to manage the UX in the first crucial moments as your site loads.

----------------------------------------------------------------------------------------------------------------------------

*How it works:*

you create a new iceTray object and define a 'requests' object.  This object takes objects numbered started from zero.

**Example Usage**


    var trayOne = new iceTray(); //create a new iceTray
    trayOne.requests = {
        0:{
            url: "https://url.to/some/content",
            callback: function(){
                //do stuff like use this.response to use data from your request
            }
            method: 'GET', //GET is the default so you don't need to specify it
            responseType: 'text'
        },
        1:{
            url: "https://url.to/some/script.js",
            callback: function(){
                //do stuff using the oaded script
            }
            placement: document.getElementById('myNode'), //Dom node selector.  Script will append to this node.
            dependencies: [0] //this request is dependent on the first request loading correctly
        }
    };

    trayOne.chain(0); //starts the chain of requests and callbacks for trayOne.



**All following parameters are optional**
-------------------------------------
**dependencies:** [2, 4], 

**responseType:** 'response type', //defaults to ''

**method:** 'POST or GET' //defaults to GET

**placement:**  domNode //in the case of loading external JS or CSS this is the dom node which you would like to append the script

**response:** //stores the request response.  is not parameter

------------------------------------------------------------------------------------------------------------

*Ice Tray - Copyright Nick Freese 2017*

-------------------------------
