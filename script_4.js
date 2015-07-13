function rotate_images()
{
	document.getElementById("loader-image").style.width="0%";
	load_percent = 0;
	load_bar();

	image_at++;
	if(image_at >= image_arr.length)
	 {
		image_at=0;
	 }

	image_id_num = (image_id_num)?0:1;
	document.getElementById("image-back"+image_id_num).style.backgroundImage = "url('"+image_arr[image_at]+"')";
}

var load_percent = 0;
var t;
function load_bar()
{
	load_percent+=.2;
	if(load_percent <= 100)
	 {
		document.getElementById("loader-image").style.width=load_percent+"%";
		t=setTimeout(function(){load_bar();},45);
	 } else {
		next_image();
	 }
}

var image_at = 0;
var image_id_num = 0;
var image_arr = new Array("starry.png","snowboard.jpg","skydive.png","pyramids.jpg");
//var image_title = new Array("Vincent van Gogh: Starry Night","Take a Chance","Go Skydiving","Explore the World");
/*
var image_description = new Array("Visit the Museum of Modern Art and observe famous works like Starry Night by Vincent van Gogh.",
	"Experience the thrill of snowboarding, and for experienced snowboarders, why not push your limits?",
	"Take the jump and experience an adrenaline rush like none other.",
	"Visit the pyramids in Egypt or the local landmarks you haven't yet made the time for.");
*/

var image_title = new Array("Vincent van Gogh: Starry Night","Title #2","Title #3","Title #4");

var image_description = new Array("Visit the Museum of Modern Art and observe famous works like Starry Night by Vincent van Gogh.",
	"Description #2",
	"Description #3",
	"Description #4");

function next_image()
{
	clearTimeout(t);
	load_percent = 0;
	document.getElementById("loader-image").style.width="0%";
	document.getElementById("image-title").innerHTML = image_title[image_at];
	document.getElementById("image-description").innerHTML = image_description[image_at];

	slide_images();
	//rotate_images();
}

var image_slide_at = 100;
var image_slide_dn = 0;
function slide_images()
{
	image_slide_at -= 7;
	image_slide_dn -= 7;
	if(image_slide_at >= 0)
	 {
		document.getElementById("image-back"+image_id_num).style.left = image_slide_at+"%";
		document.getElementById("image-back"+((image_id_num)?0:1)).style.left = image_slide_dn+"%";
		t = setTimeout(function(){slide_images();},30);
	 } else {
		document.getElementById("image-back"+image_id_num).style.left = "0%";
		document.getElementById("image-back"+((image_id_num)?0:1)).style.left = "100%";
		image_slide_at = 100;
		image_slide_dn = 0;
		rotate_images();
	 }
}

function prev_image()
{
	clearTimeout(t);

	image_at-=2;
	if(image_at < 0)
	 {
		image_at=image_arr.length+image_at;
	 }

	//image_id_num = (image_id_num)?0:1;
	document.getElementById("image-back"+image_id_num).style.backgroundImage = "url('"+image_arr[image_at]+"')";
	document.getElementById("image-back"+image_id_num).style.left = "-100%";

	load_percent = 0;
	document.getElementById("loader-image").style.width="0%";

	document.getElementById("image-title").innerHTML = image_title[image_at];
	document.getElementById("image-description").innerHTML = image_description[image_at];

	slide_images_right();
}

var image_slide_at2 = -100;
var image_slide_dn2 = 0;
function slide_images_right()
{
	image_slide_at2 += 7;
	image_slide_dn2 += 7;
	if(image_slide_dn2 <= 100)
	 {
		document.getElementById("image-back"+image_id_num).style.left = image_slide_at2+"%";
		document.getElementById("image-back"+((image_id_num)?0:1)).style.left = image_slide_dn2+"%";

		//alert();
		t = setTimeout(function(){slide_images_right();},30);
	 } else {
		document.getElementById("image-back"+image_id_num).style.left = "0%";
		document.getElementById("image-back"+((image_id_num)?0:1)).style.left = "100%";
		image_slide_at2 = -100;
		image_slide_dn2 = 0;
		rotate_images();
	 }
}

rotate_images();