/* Copyright John Harding */
(function() {

	var sectionList = [["section-0",false,150]];
	var topIsDefault = 0;
	window.onscroll = function () {
		var returnDoc = getDocInfo();
		var docHeight = returnDoc[0];
		var docInnerHt = returnDoc[1];
		var currentPos = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;

		var jshHighlightHt = 800; // must match height of .jsh_body_portfolio_hold in style_port.css

		var jshTopBarHt = 65;
/*
		var toHeight = document.getElementById("portfolio"+(port_is_fixed?"":"2")).getBoundingClientRect().top;

		if(toHeight <= 0 && port_is_fixed)
		{
			document.getElementById("portfolio").style.height = "0px";
			document.getElementById("portfolio2").style.position = "relative";
			document.getElementById("jh-top").className = "jh-top_start jh-top jh-top2";

			port_is_fixed = 0;
		} else
		if(toHeight > 0 && !port_is_fixed)
		{
			document.getElementById("portfolio").style.height = jshHighlightHt;
			document.getElementById("portfolio2").style.position = "fixed";
			document.getElementById("jh-top").className = "jh-top_start jh-top";

			port_is_fixed = 1;
		}
*/
		for(var i = 0;i < sectionList.length;i++)
		{
			var tempObj = document.getElementById(sectionList[i][0]);
			var tempObj2 = document.getElementById(sectionList[i][0]+"-show");
			var tempTop = tempObj.getBoundingClientRect().top;
			window.console.log(tempTop);
			if(!sectionList[i][1] && (docInnerHt - sectionList[i][2]) > tempTop && currentPos > sectionList[i][2])
			{
				sectionList[i][1] = true;
				easeShow(tempObj2,0,.03);
			}
		}

		if(currentPos > 0 && currentPos < (jshHighlightHt - jshTopBarHt))
		{
			document.getElementById("jh-top").className = "jh-top-light";
			//topIsDefault = 0;
		} else
		if(currentPos >= (jshHighlightHt - jshTopBarHt))
		 {
			document.getElementById("jh-top").className = "jh-top-dark";
		
		} else
		if(currentPos == 0)
		 {
			document.getElementById("jh-top").className = "";
			//topIsDefault = 1;
		
		}
	};

	window.onload = function() {
		var obj = document.getElementById("highlight-images");
		var children = obj.children;
		var elemPositions = [
			[50,83],
			[125,125],
			[140,140],
			[155,155],
			[170,170],
			[185,185]
		];
		for(var i = children.length-1; i >= 0; i--)
		{
			children[i].style.top = elemPositions[i][0]+"px";
			children[i].style.left = elemPositions[i][1]+"px";
			children[i].style.zIndex = Math.abs(i-6);

			var t = setTimeout(closure(children[i],0),
			(Math.abs(i-6) * 600));
		}
	};

	var getDocInfo = function() {
		var body = document.body,docElement = document.documentElement;

		var docHeight = Math.max(body.scrollHeight,body.offsetHeight,docElement.clientHeight,docElement.scrollHeight,docElement.offsetHeight);
		var docInnerHt = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;

		return [docHeight,docInnerHt];
	};

	var easeShow = function(obj,start,amt) {
		start += amt || .05;
		start = start <= 1 ? start : 1;
		obj.style.opacity = start;
		obj.style.filter = "Alpha(opacity=" + ( start * 100 ) + ")";
		if(start < 1)
		{
			var t2 = setTimeout(closure(obj,start,amt),12);
		}
	};

	var closure = function(child,start,amt) {
		return function(){easeShow(child,start,amt);}
	};
})();