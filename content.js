chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {

            $(document).ready(function () {

                if($('#plugin-content').length > 0){
                    $('#plugin-content').toggle();
                    $('.yp-selector-mode').trigger('click');

                    return false;
                }

                $.ajax({
                    url: chrome.extension.getURL('/plugin.html'),
                    dataType: 'html',
                    success: function (data) {
                        $('body').append(data).addClass('yp-yellow-pencil wt-yellow-pencil yp-metric-disable yp-body-selector-mode-active browser_chrome');

                        // All plugin element list
                        window.plugin_classes_list = 'yp-styles-area|yp-animating|yp-animate-data|yp-scene-1|yp-sharp-selector-mode-active|yp-scene-2|yp-scene-3|yp-scene-4|yp-scene-5|yp-scene-6|yp-anim-creator|data-anim-scene|yp-anim-link-toggle|yp-animate-test-playing|ui-draggable-handle|yp-css-data-trigger|yp-yellow-pencil-demo-mode|yp-yellow-pencil-loaded|yp-element-resized|resize-time-delay|yp-selected-handle|yp-parallax-disabled|yp_onscreen|yp_hover|yp_click|yp_focus|yp-recent-hover-element|yp-selected-others|yp-multiple-selected|yp-demo-link|yp-live-editor-link|yp-yellow-pencil|wt-yellow-pencil|yp-content-selected|yp-selected-has-transform|yp-hide-borders-now|ui-draggable|yp-target-active|yp-yellow-pencil-disable-links|yp-closed|yp-responsive-device-mode|yp-metric-disable|yp-css-editor-active|wtfv|yp-clean-look|yp-has-transform|yp-will-selected|yp-selected|yp-fullscreen-editor|yp-element-resizing|yp-element-resizing-width-left|yp-element-resizing-width-right|yp-element-resizing-height-top|yp-element-resizing-height-bottom|context-menu-active|yp-selectors-hide|yp-contextmenuopen|yp-control-key-down|yp-selected-others-multiable-box';
                        // Any visible element.
                        window.simple_not_selector = 'head, script, style, [class^="yp-"], [class*=" yellow-pencil-"], link, meta, title, noscript';
                        // basic simple.
                        window.basic_not_selector = '*:not(script):not(style):not(link):not(meta):not(title):not(noscript)';
                        // Variable
                        window.loadStatus = false;


                        var iframe = $(document);
                        var body = iframe.find("body");

                        // Loading Styles
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/dashicons.min.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/contextmenu.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/nouislider.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/iris.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/bootstrap-tooltip.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/sweetalert.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/yellow-pencil.css") + '" >').appendTo('head');
                        $('<link rel="stylesheet" href="' + chrome.extension.getURL("assets/css/frame.css") + '" >').appendTo('head');

                        // Scripts Loading.
                        setTimeout(function () {

                            // Ace Code Editor Base.
                            window.aceEditorBase = chrome.extension.getURL("assets/js/ace");

                            var scripts = [];
                            scripts.push(chrome.extension.getURL("assets/js/constants.js"));
                            scripts.push(chrome.extension.getURL("assets/js/contextmenu.js"));
                            scripts.push(chrome.extension.getURL("assets/js/wNumb.js"));
                            scripts.push(chrome.extension.getURL("assets/js/nouislider.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/core.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/widget.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/mouse.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/slider.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/draggable.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/resizable.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/menu.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/jquery/ui/autocomplete.min.js"));
                            scripts.push(chrome.extension.getURL("assets/js/iris.js"));
                            scripts.push(chrome.extension.getURL("assets/js/bootstrap-tooltip.js"));
                            scripts.push(chrome.extension.getURL("assets/js/css-engine.js"));
                            scripts.push(chrome.extension.getURL("assets/js/ace/ace.js"));
                            scripts.push(chrome.extension.getURL("assets/js/sweetalert.js"));
                            scripts.push(chrome.extension.getURL("assets/js/yellow-pencil-dev.js"));

                            //setup object to store results of AJAX requests
                            var responses = {};

                            //create function that evaluates each response in order
                            function yp_eval_scripts() {
                                // load javascript
                                for (var i = 0, len = scripts.length; i < len; i++) {

                                    // Eval
                                    eval(responses[scripts[i]]);

                                }

                                // New List
                                var newLoadList = Array();

                                // Getting all CSS Stylesheets
                                window.humanStyleData = '';
                                iframe.find("link[rel='stylesheet'][href]").each(function () {

                                    // Get href
                                    var href = $(this).attr("href");

                                    // check and add
                                    if (href.indexOf("waspthemes-yellow-pencil") == -1 &&
                                        href.indexOf("animate") == -1 &&
                                        href.indexOf("font") == -1 &&
                                        href.indexOf("icon") == -1 &&
                                        href.indexOf("googleapis.com") == -1 &&
                                        href.indexOf("bootstrap") == -1 &&
                                        href.indexOf("print") == -1 &&
                                        href.indexOf("reset") == -1 &&
                                        href.indexOf("preloader") == -1 &&
                                        href.indexOf("fancybox") == -1 &&
                                        href.indexOf("colorbox") == -1 &&
                                        href != 'ie' &&
                                        href.indexOf("ie6") == -1 &&
                                        href.indexOf("ie8") == -1 &&
                                        href.indexOf("ie8") == -1 &&
                                        href.indexOf("ie9") == -1 &&
                                        href.indexOf("media") == -1 &&
                                        href.indexOf("setting") == -1 &&
                                        href.indexOf("responsive") == -1 &&
                                        href.indexOf("webkit") == -1 &&
                                        href.indexOf("animation") == -1 &&
                                        href.indexOf("animate") == -1 &&
                                        href.indexOf("animate") == -1 &&
                                        href.indexOf("keyframe") == -1 &&
                                        href.indexOf("jquery") == -1 &&
                                        href.indexOf("prettyPhoto") == -1 &&
                                        href.indexOf("player") == -1 &&
                                        href.indexOf("video") == -1 &&
                                        href.indexOf("box") == -1 &&
                                        href.indexOf("popup") == -1 &&
                                        href.indexOf("smallscreen") == -1 &&
                                        href.indexOf("skin") == -1 &&
                                        href.indexOf("scheme") == -1 &&
                                        href.indexOf("audio") == -1 &&
                                        href.indexOf("mobile") == -1 &&
                                        href.indexOf("admin") == -1 &&
                                        newLoadList.length <= 10) {

                                        // Add
                                        newLoadList.push(href);

                                    }

                                });


                                // There not have css stylesheets to load?, so start editor.
                                if (newLoadList.length == 0) {
                                    yp_start_editor();
                                }


                                // Loading all stylesheets and Open Editor.
                                var load_style_loop = function (i) {

                                    if (i < newLoadList.length) {

                                        // Load styles
                                        $.get({
                                            url: newLoadList[i],
                                            timeout: 2000,
                                            cache: true
                                        }).always(function (data) {

                                            // Update
                                            if ($.type(data) === "string") {
                                                window.humanStyleData += data;
                                            }

                                            // If last
                                            if (i + 1 == newLoadList.length) {

                                                yp_start_editor();

                                            }

                                            // Repait
                                            load_style_loop(i + 1);

                                        });

                                    }

                                };

                                // Go
                                load_style_loop(0);

                            }


                            // Stop load and call editor function.
                            function yp_start_editor() {

                                // Ready!:
                                yp_load_note("loading...");

                                // Set true.
                                window.loadStatus = true;

                                // Okay. Load it.
                                setTimeout(function () {
                                    yellow_pencil_main();
                                }, 150);

                            }

                            //start
                            $.each(scripts, function (index, value) {

                                $.ajax({

                                    url: scripts[index],

                                    //force the dataType to be "text" rather than "script"
                                    dataType: 'text',

                                    success: function (textScript) {

                                        //add the response to the "responses" object
                                        responses[value] = textScript;

                                        //check if the "responses" object has the same length as the "scripts" array,
                                        //if so then evaluate the scripts
                                        if (Object.keys(responses).length === scripts.length) {
                                            yp_eval_scripts();
                                        }

                                    },

                                    error: function (jqXHR, textStatus, errorThrown) {
                                        alert('An error occurred while loading.');

                                    }

                                });

                            });

                        });

                    }
                });

            });

        }
    }
);


// Update loading notes.
function yp_load_note(text) {
    if (window.loadStatus == false) {
        $(".loading-files").html(text);
    }
}