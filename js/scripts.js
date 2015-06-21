/* Copyright John Harding */
(function() {

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

	var easeShow = function(obj,start) {
		start += .05;
		obj.style.opacity = start;
		obj.style.filter = "Alpha(opacity=" + ( start * 100 ) + ")";
		if(start < 1)
		{
			var t2 = setTimeout(closure(obj,start),12);
		}
	};

	var closure = function(child,start) {
		return function(){easeShow(child,start);}
	};
})();