<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>John Harding Jr's Portfolio</title>
<!-- Custom CSS - Compiled from LESS -->
<link rel="stylesheet" href="css/style.css?v=1.0.1" type="text/css">

<!-- Bootstrap -->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

<!-- Font Awesome -->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="icon" href="images/icon_small.ico">

<?php
 if($_SERVER['HTTP_HOST'] != 'localhost'):
?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-66356232-1', 'auto');
  ga('send', 'pageview');

</script>

<?php
 endif;
?>

 <!-- HTML5 Shim and Respond.js -->
  <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="body-main body-index">
<header id="jh-top">
	<a href="./"><img class="logo-light" src="images/logo-white.png" alt="John Harding Jr's Portfolio"><img class="logo-dark" src="images/logo-blue.png" alt="John Harding Jr's Portfolio"></a>
	<nav>
		<ul>
			<!--<li><a href="#" id="full-portfolio-link" class="test">Full Portfolio</a></li>-->
			<li><a href="John-Harding-Resume.html">Resume</a>
				<ul class="sub-resume">
					<li><a href="John-Harding-Resume.html">HTML</a></li>
					<li><a href="John-Harding-Resume.docx">Word Document</a></li>
					<li><a href="John-Harding-Resume.pdf">PDF</a></li>
				</ul>
			</li>
			<li><a href="https://stackoverflow.com/users/4792461/john-harding" target="_blank">Stackoverflow <span class="link-external-blue"></span></a></li>
			<li><a href="https://github.com/john-harding" target="_blank">Github <span class="link-external-blue"></span></a></li>
		</ul>
	</nav>
</header>
<section class="jh-section highlight-section stationary-bg">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="outer-exp-display" id="outer-exp-display">
					<h1>Hey, I'm John Harding.</h1><h2>I'm a front end/full stack developer.</h2>
					<a class="btn-blue btn-main" id="btn-main" href="#">View My Work</a>
				</div>
			</div>
		</div>
	</div>
	<img class="stationary-image" src="https://i.imgur.com/OGW3jVf.jpg" />
</section>
<section class="jh-section section-extra-padding section-hidden" id="section-fg">
	<div class="container" id="section-fg-show">
		<div class="row">
			<div class="col-md-6">
				<img class="display-img-2" src="images/screen_formofgood.png" alt="RepFive">
			</div>
			<div class="col-md-6">
				<h1>Social media site for average users and coders.</h1>
				<h2>Used React, Redux, SCSS, Node, Express, MySQL, and all hosted on AWS</h2>
				<p>
					In August 2017, I began work on <strong>Form of Good</strong>, a startup that allows users to create posts 
					with the option of editing the HTML and JavaScript.  This was an arduous task, as there are many 
					potential security pitfalls I had to be wary of.  It is still a work in progress.
				</p>
				<p>
					I have done 99.9% of the project, and based it on the MERN starter repo.
				</p>
				<p>
					AWS usage includes Route 53, S3, AWS RDS, Elastic Beanstalk, AWS SES, and Lambda.  I would still consider myself fairly 
					junior at using AWS, but I have gained a significant amount of knowledge.  This portfolio is also hosted on 
					AWS (using beanstalk).
				</p>
				<br />
				<p class="no-margin">
					<a class="btn-blue" href="https://www.formofgood.com" target="_blank"><strong>Formofgood.com <span class="link-external-blue external-white"></span></strong></a>
				</p>
			</div>
		</div>
	</div>
</section>
<section class="jh-section jh-section-grey section-extra-padding section-hidden" id="section-0">
	<div class="container" id="section-0-show">
		<div class="row">
			<div class="col-md-6">
				<h1>Created a New Social Network. From Scratch.</h1>
				<h2>Using HTML, CSS, JavaScript, PHP, Sphinx, and Linux</h2>
				<p>
					In January 2013, I began work on <strong>RepFive</strong>, a project that allowed users to follow content based on either the user posting it, 
					or the category it was posted in.  I moved on from this project in November of 2014 when I accepted a position with Qualtrics.
				</p>
				<p class="p-new-repfive">
					<span>Check out how it looked:</span><br />
					<a href="repfive_index.php"><strong>Improved Feed</strong></a><a href="signup.php"><strong>New Signup Page</strong></a><a href="developer.php"><strong>New Developer Page</strong></a>
				</p>
<!-- removed because site is no longer up for now
				<p class="no-margin">
					<a class="btn-blue" href="http://www.repfive.com/login.php" target="_blank"><strong>Current Version <span class="link-external-blue external-white"></span></strong></a>
					<span class="r5-login-info">
						<span>Username: <strong>demo</strong></span>
						<span>Password: <strong>repfive</strong></span>
					</span>
				</p>
-->
			</div>
			<div class="col-md-6">
				<img class="display-img" src="images/screen_repfive.png" alt="RepFive">
			</div>
		</div>
	</div>
</section>
<section class="jh-section jh-section-short section-extra-padding section-hidden" id="section-1">
	<div class="container" id="section-1-show">
		<div class="row">
			<div class="col-md-6">
				<img src="images/highlight-screenshots/highlight-two.png" alt="Short Lived Projects">
			</div>
			<div class="col-md-6">
				<h1>Short-Lived Side Projects</h1>
				<h2>Unfinished projects, but I like to think they look nice.</h2>
				<p>
					<a href="comment/">CommentKing</a> was started when I began applying for jobs in late 2014.  I took a job with Qualtrics one to two weeks after
					starting, so it was sidelined. (Late Oct to Early November of 2014)
				</p>
				<p>
					<a href="project4.php">Embark</a> was created in response to a friend's idea that has since been put on hold.  I spent one night
					(granted, it was the whole night) on the project. (May 2014)
				</p>
			</div>
		</div>
	</div>
</section>
<section class="jh-section jh-section-grey section-extra-padding section-no-padding-bottom" id="section-2">
	<div class="container" id="section-2-show">
		<div class="row">
			<div class="col-md-6">
			<h1>Portfolios</h1>
			<h2>These are the two portfolios I created to display my work and strengths.</h2>
			<!-- <p>
				See my old portfolio <a href="http://www.servehappy.com/" target="_blank">here<span class="link-external-blue"></span></a>.  I created it in October 2014 before I started 
				applying for jobs.
			</p> -->
			<p>
				You are viewing my current portfolio now!
			</p>
			</div>
			<div class="col-md-6">
				<img src="images/portfolios.png" alt="Portfolio Screenshots">
			</div>
		</div>
	</div>
</section>
<section class="jh-section section-extra-padding" id="section-3">
	<div class="section-bg-overlay section-bg-absolute">
	</div>
	<div class="section-bg-display section-bg-absolute paralax-bg">
	</div>
	<div class="container" id="section-3-show">
		<div class="row">
			<div class="col-lg-12">
			<h1>Full Portfolio</h1>
			<hr>
				<div class="folder-icon">
					<i class="fa fa-folder-open-o"></i>
				</div>
			</div>
		</div>
		<div class="row portfolio-images">
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="https://www.formofgood.com" target="_blank">
					<span>Form of Good<span class="link-external-blue"></span></span>
					<img src="images/highlight-screenshots/formofgood.png" alt="Form of Good">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="repfive_index.php">
					<span>RepFive</span>
					<img src="images/highlight-screenshots/repfive.png" alt="Repfive Preview">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="https://www.qualtrics.com/financial-services" target="_blank">
					<span>Qualtrics - Industry Pages<span class="link-external-blue"></span></span>
					<img src="images/highlight-screenshots/qualtrics-industry.png" alt="Qualtrics - Industry Pages">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="https://support.qualtrics.com/" target="_blank">
					<span>Qualtrics - Support Nav &amp; JS<span class="link-external-blue"></span></span>
					<img src="images/highlight-screenshots/qualtrics-support.png" alt="Qualtrics - Support Navigation Pane &amp; JavaScript (including Angular)">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="React/timer-multiple.php">
					<span>React JS Timer App</span>
					<img src="images/highlight-screenshots/react.png" alt="React JS Timer Application">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="/">
					<span>This Portfolio</span>
					<img src="images/highlight-screenshots/new-portfolio.png" alt="Old Portfolio Preview">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="project4.php">
					<span>Embark</span>
					<img src="images/highlight-screenshots/project3.png" alt="Project3 Preview">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="comment/">
					<span>CommentKing</span>
					<img src="images/highlight-screenshots/ck_comment.png" alt="Ck Comments Preview">
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="micro.php">
					<span>UMiami Micro'Canes</span>
					<img src="images/highlight-screenshots/portfolio_micro.png" alt="Umiami Micro'Canes">
				</a>
			</div>
		<!-- 	<div class="col-xs-12 col-sm-6 col-lg-4">
				<a class="outer-portfolio-image" href="http://www.servehappy.com" target="_blank">
					<span>Old Portfolio<span class="link-external-blue"></span></span>
					<img src="images/highlight-screenshots/portfolio.png" alt="Old Portfolio Preview">
				</a>
			</div> -->
		</div>
	</div>
</section>
<section class="jh-section section-extra-padding jh-section-dark" id="section-4">
	<div class="container" id="section-4-show">
		<div class="row">
			<div class="col-lg-12">
			<h1>About Me</h1>
			<hr>
			<p>I graduated from the University of Miami in 2014.  Outside of coding, I love lifting weights, playing basketball, and exercising. 
			Before and after work you'll find me in the gym shooting hoops and repeatedly lifting heavy objects for fun.</p>
			<p>Recruiters and companies can get in touch with me at <a href="mailto:jsh.miami@gmail.com">jsh.miami@gmail.com</a>.</p>
			</div>
			<div class="col-lg-12">
				<img src="images/activities.png" alt="Old Portfolio Preview">
			</div>
		</div>
	</div>
</section>
<script type="text/javascript" src="js/scripts.js?v=1.0.1"></script>
</body>
</html>