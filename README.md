/*-------------------------------

Ice Tray - Copyright Nick Freese 2017

-------------------------------*/

/*------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

Why use iceTray?  Ice Tray lets you progressively load your content and assets.  You can prioritize your most important content to manage the UX in the first crucial moments as your site loads.

Description:  iceTry is a js library for asyncronously loading content.

How it works:

you create a new iceTray object and define a 'requests' object.  This object takes objects numbered started from zero.   

example: requests: {0:{}, 1:{}, 2:{}};

each number object requires a 'url' parameter specifying a source.

All other parameters are optional.

dependencies: [2, 4], 

responseType: 'response type', //defaults to ''

method: 'POST or GET' //defaults to GET

placement:  domNode //in the case of loading external JS or CSS this is the dom node which you would like to append the script

response: //stores the request response.  is not parameter;

------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------*/