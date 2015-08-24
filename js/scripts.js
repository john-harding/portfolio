/* Copyright : John Harding Jr */
(function() {

	// array of all sections that will pop up and gain opacity on scroll by
	// format : [section ID, is it currently visible?, marginTop to start at when popping up,should this pop up?,increase opacity amount for every iteration]
	var sectionList = [["section-0",false,120,true,.02],["section-1",false,200,false,.015],["section-2",false,300,true,1]];
	var sectionEnabled = true;

	var jshHighlightHt = document.getElementsByClassName("highlight-section")[0].offsetHeight; // get height of highlight section

	var jshTopBarHt = 65; // height of the header bar
	var returnDoc = getDocInfo();
	var docHeight = returnDoc[0];
	var docInnerHt = returnDoc[1];
	var paralax = document.getElementsByClassName("paralax-bg");

	window.onresize = function () {
		jshHighlightHt = document.getElementsByClassName("highlight-section")[0].offsetHeight;
		returnDoc = getDocInfo();
		docHeight = returnDoc[0];
		docInnerHt = returnDoc[1];
	}
	window.onscroll = function () {

		// get the current scroll position
		var currentPos = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
		var tempSectionVisible = true;


		// loop through each of the sections we are going to pop up ** may want to splice off sections that have already been popped up
		if(sectionEnabled)
		{
			for(var i = 0;i < sectionList.length;i++)
			{
				tempSectionVisible = (tempSectionVisible && sectionList[i][1]) ? true : false;
				//window.console.log(i);
				var tempObj = document.getElementById(sectionList[i][0]);// get the element we are using to determine when to pop up
				var tempObj2 = document.getElementById(sectionList[i][0]+"-show");  // get the element that will be popped up (it is a child of tempObj)
				var tempTop = tempObj.getBoundingClientRect().top;
				//window.console.log(tempTop);
				if(!sectionList[i][1] && (docInnerHt - sectionList[i][2]) > tempTop && currentPos > sectionList[i][2])
				{
					sectionList[i][1] = true;
					easeShow(tempObj2,0,sectionList[i][4]);
					if(sectionList[i][3])
					{
						easeUp(tempObj2,80);
					}
				}
			}
			sectionEnabled = !tempSectionVisible;
		}
		for(var i2=0;i2 < paralax.length;i2++)
		{
			var tempTop2 = paralax[i2].getBoundingClientRect().top;
			if(tempTop2 <= (docInnerHt))
			{
				paralax[i2].style.backgroundPositionY = (-Math.round((tempTop2)/1.5))+"px";
			}
		}

		if(currentPos > 0 && currentPos < (jshHighlightHt - jshTopBarHt))
		{
			document.getElementById("jh-top").className = "jh-top-light";
		} else
		if(currentPos >= (jshHighlightHt - jshTopBarHt))
		 {
			document.getElementById("jh-top").className = "jh-top-dark";
		
		} else
		if(currentPos == 0)
		 {
			document.getElementById("jh-top").className = "";
		
		}
	};

	function scrollToPortfolio()
	{
		
		var currentPos = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
		var portObj = document.getElementById("section-0");
		var elemHeight = portObj.getBoundingClientRect().top;
		var goToPos = elemHeight + currentPos - 65; // height of top header bar
		var increment = 30;

		if((currentPos + increment) < goToPos)
		{
			window.scrollTo( 0 , currentPos + increment );
			setTimeout(function(){scrollToPortfolio();},25);
		} else {
			window.scrollTo( 0 , goToPos );
		}
	}
	//document.getElementById("highlight-images").onclick = function(event){event.preventDefault();scrollToPortfolio();};
	//document.getElementById("full-portfolio-link").onclick = function(event){event.preventDefault();scrollToPortfolio();};
	document.getElementById("btn-main").onclick = function(event){event.preventDefault();scrollToPortfolio();};

/*	// this shows the portfolio images one by one
	window.onload = function() {
		var obj = document.getElementById("highlight-images");
		var children = obj.children;
		var elemPositions = [
			[236,295],
			[86,62], //[10,-13],
			[125,125],
			[140,140],
			[155,155],
			[170,170],
			[185,185]
		];
		for(var i = children.length-1; i >= 0; i--)
		{
			children[i].style.top = elemPositions[i][1]+"px";
			children[i].style.left = elemPositions[i][0]+"px";
			children[i].style.zIndex = Math.abs(i-6);

			var t = setTimeout(closure(children[i],0,"easeShow"),
			(Math.abs(i-6) * 600));
		}
	};
*/
	// returns the height of the entire document and the viewport
	function getDocInfo() {
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
			var t2 = setTimeout(closure(obj,start,"easeShow",amt),12);
		}
	};

	var easeUp = function(obj,start) {
		start -= Math.round(start/20 + 1);
		//start -= 6;
		start = start >= 0 ? start : 0;
		obj.style.marginTop = start + "px";
		obj.style.marginBottom = "-" + start + "px";
		if(start > 0)
		{
			var t2 = setTimeout(closure(obj,start,"easeUp"),8);
		}
	};

	var closure = function(child,start,type,amt) {
		if(type == "easeShow")
		{
			return function(){easeShow(child,start,amt);};
		} else 
		if(type == "easeUp")
		{
			return function(){easeUp(child,start,amt);};
		}
	};
})();