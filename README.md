
ice Tray
-----------------

It’s important to keep a tight ship when it comes to performance.  Ice Tray allows you to control your critical rendering path to make sure the user sees the most important content first and fast.

Ice Tray works by allowing you to define strings of requests.  Each request will take similar parameters to a standard ajax request, with the addition of some goodies.

**The Goodies:**

 - Dependencies:  A list of the requests this one is dependant on.

 - Images: if Ice Tray senses that the request url is an image it will download it and store the image tag in the request response. Even gives you a callback once the image is finished loading.

 - Scripts and CSS:**  same as with images,  if the request url is a script of CSS, Ice Tray will download it and drop it into the dom in a place of your choosing.  And you still get a call back which will fire after it is finished loading.

----------------------------------------------------------------------------------------------------------------------------

 To get setup, create a new iceTray object and define a 'requests' object.  This object takes objects numbered started from zero.  This is the order they will be called in.

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
                //do stuff using the loaded script
            },
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
