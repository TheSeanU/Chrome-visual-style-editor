(function ($) {

    "use strict";
		
	// jquery visible plugin
	!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);
	
	// Replace from last.
	String.prototype.reverse = function () {
		return this.split('').reverse().join('');
	};
	String.prototype.replaceLast = function (what, replacement) {
		return this.reverse().replace(new RegExp(what.reverse()), replacement.reverse()).reverse();
	};
	
	
	// Return the id.
	var yp_script_id = function(str) {
		if(typeof str !== "undefined" && str != ''){
			str = str.replace(/\W+/g, "");
			return str;
		}else{
			return '';
		}
    }
	

	window.cachedData = null;
	
	// CSS Engine Function
	function cssEngine(rule,markup,defaults,source){

		// iframe contents.
		//var $iframe = $($('#iframe').contents().get(0));
		var $iframe = $(document);

		// Source
		if(window.externalCSS == false){

			// default css
			if($("style#yellow-pencil").length > 0){
				source = source + $("style#yellow-pencil").html();
			}

			// preview css
			if($("style#yp-live-preview").length > 0){
				source = source + $("style#yp-live-preview").html();
			}

			// backend css
			if($("style#yellow-pencil-backend").length > 0){
				source = source + $("style#yellow-pencil-backend").html();
			}

			// backend css in editor
			if($("body").hasClass("yp-yellow-pencil")){
				if($iframe.find("style#yellow-pencil-backend").length > 0){
					source = source + $iframe.find("style#yellow-pencil-backend").html();
				}
			}

		}else{

			// Plus preview css
			if($("#yp-live-preview").length > 0){
				source = source + $("#yp-live-preview").html();
			}

			// backend css
			if($("#yellow-pencil-backend").length > 0){
				source = source + $("#yellow-pencil-backend").html();
			}

			// backend css in editor
			if($("body").hasClass("yp-yellow-pencil")){
				if($iframe.find("#yellow-pencil-backend").length > 0){
					source = source + $iframe.find("#yellow-pencil-backend").html();
				}
			}

		}

		if(window.cachedData == null){
		
			// Source
			var data = "#yellow-pencil{-yp-engine:true;}"+source;

			// Clean.
			data = data.replace(/(\r\n|\n|\r)/g,"").replace(/\t/g, '');
			
			// Don't care rules in comment.
			data = data.replace(/\/\*(.*?)\*\//g,"");
			
			// Don't care rules in media query.
			data = data.replace(/@media(.*?)\}\}/g, '');

			// Don't care rules in media query.
			data = data.replace(/@-webkit-keyframes(.*?)\}\}/g, '');
			data = data.replace(/@keyframes(.*?)\}\}/g, '');

			if($("body").hasClass("yp-yellow-pencil") == false){
				window.cachedData = data;
			}

		}else{

			data = window.cachedData;

		}

		
		// Getting Selector and rule value.
		if(data.split(rule+":").length-1 > 0){
		
			for (var ix = 0; ix < data.split(rule+":").length; ix++){
				
				var dataNew = '';
				var output = markup;
				
				dataNew = data.match(new RegExp('}(.*){(.*)'+rule+':(.*);'));
				data = data.replaceLast(rule+":","processed-rule:");
	
				
				// Selector
				if(dataNew != null){
					var selector = $.trim(dataNew[1]);
					if(!selector.indexOf("}") >= 0){
						selector = $.trim(dataNew[1].split("}")[dataNew[1].split("}").length-1]);
					}
				}
				
				// Fix selector bug.
				selector = selector.replace(/&gt;/g,'>');
				
				
				// Support just nth-child. not other selectors. (ex: hover, focus etc.)
				if(selector.indexOf(":") >= 0 && selector.indexOf(":nth") == -1){
					return false;
				}
				
				
				// Rule Value.
				if(dataNew != null){
					var val = $.trim(dataNew[3].split(";")[0]);
				}
				
				if(dataNew != null){
					var onlyit = dataNew[3];
				}
				
				if(dataNew != null){
					if(dataNew[3].indexOf("}") >= 0){
						var onlyit = dataNew[3].split("}")[0];
					}
				}
				
				if(dataNew != null){
					var allCSS = (dataNew[2]+onlyit).replace(val,"").split(";");
				}
				
				
				var allRuleCSS = [];
				for (var i = 0; i < allCSS.length; i++){			
					if(allCSS[i] != null && allCSS[i] != '' && allCSS[i] != ' ' && allCSS[i] != ',' && allCSS[i] != undefined){
						allRuleCSS.push(allCSS[i]);
					}
				}
				
				// Ready.
				allCSS = allRuleCSS;
				
				
				// Default Values.
				if(defaults != undefined){
					for (var iq = 0; iq < Object.keys(defaults).length; iq++){
						
						if(allCSS.join(",").indexOf(Object.keys(defaults)[iq]+":") == -1){
							allCSS.push(Object.keys(defaults)[iq]+":"+defaults[Object.keys(defaults)[iq]]);
						}
						
					}
				}
				
					
				// Replace Rule Name To Rule Value, using in markup.
				for (var i = 0; i < allCSS.length; i++){
					var ruleX = allCSS[i].replace(/\"\)*$/, '').split(":")[0];
					output = output.replace(ruleX,allCSS[i].replace(/\"\)*$/, '').split(":")[1]);
				}
				
				// USE: $selector  ->  rule address. (string)
				output = output.replace(/\$selector/g,selector);
				
				// USE: $value  ->  rule value. (string)
				output = output.replace(/\$value/g,val);

				// USE: $rule  ->  rule. (string)
				if(rule.indexOf("jquery-") != -1){
					output = output.replace(/\$rule/g,rule.split("-")[1]);
				}else{
					output = output.replace(/\$rule/g,rule);
				}
				
				// USE: $self  ->  rule address. (object)
				output = output.replace(/\$self/g,"$('"+selector+"')");
				
				// Make it clean.
				output = output.replace(/undefined/g,"");
				
				
				// If main rule value is active.
				if(val != 'none' || val != '0'){
					
					var id = selector+rule;		
						
						// This scripts for customizer page.
						if($("body").hasClass("yp-yellow-pencil")){

							//var ifrm = $("#iframe")[0],iwind = ifrm.contentWindow;
							var ifrm = $(document)[0],iwind = ifrm.contentWindow;

							iwind.eval("(function($){"+output+"}(jQuery));");
					
						}else{
							
							// eval scripts for website.
							eval(output);
							
						}
					
				}
				
			}
			
		}
	
	}
	
	
	// Helper function for call engine.
	$.fn.CallCSSEngine = function(source){
		EngineRules(source);
	}
	
	
	// All CSS Engines.
	function EngineRules(source){

		// Parallax Background CSS Engine.
		cssEngine(
			
			// Rule name.
			"background-parallax",
			
			// Markup of jquery api.
			"$self.simple_parallax({speed: background-parallax-speed, x: background-parallax-x});",
			
			{ // Defaults
				'background-parallax-speed': '1',
				'background-parallax-x': '50'
			},
			
			source
			
		);
	
	}

	
	// for Live Customizer.
	if($("body").hasClass("yp-yellow-pencil")){
		$(document).on("load", function(){
			EngineRules('');
		});
	}else{

		if($("link#yp-custom-css").length > 0){

			window.externalCSS = true;

			var href = $("link#yp-custom-css").attr("href");

			$.when($.get(href)).done(function(source){

				// for website.
				EngineRules(source);

			});

		}else{

			window.externalCSS = false;

			// for website.
			EngineRules('');

		}


	}
	
	
}(jQuery));