`<!doctype html>`
html lang="en"

head
	meta charset="utf-8"

	title
		`Luka Kostic`

	meta name="description" content="Luka Kostic - The guy to fulfill all your Software, Game and Web Developer needs. Many years of experience in C#, JavaScript, Python, C/C++ . Experienced in Game developement in Unity and other game engines; Software development in Visual Studio and QT; Scripting in Python and NodeJS; Web automation with web drivers and browser extensions; Machine learning; ... "
	meta name="keywords" content="Luka Kostic,C#,JavaScript,Python,C,C++,Unity,Game,Developer,Software,Web,Visual Studio,HTML,CSS,Bootstrap,Machine Learning">
	meta name="author" content="Luka Kostic"
	meta name="viewport" content="width=device-width, initial-scale=1"

	link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"
	link rel="stylesheet" href="index.css"


	script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"
	link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"
	link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
	link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/v4-shims.css"
	script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"
	script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"
	script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.js" integrity="sha256-tcqPYPyxU+Fsv5sVdvnxLYJ7Jq9wWpi4twZbtZ0ubY8=" crossorigin="anonymous"

	script src="index.js" defer

	link rel="icon" href="favicon128.png"




main role="main"

	div ."jumbotron bg-white"
		div ."container"
			div ."row" itemprop="author" itemscope="" itemtype="http://schema.org/Person" itemref="person-email"
				div ."col-xs-12 col-md-4"
					div #"profile"

						img ."portrait" src="prof.png" width="220px" height="220px"
						{
					  div ."portrait" style="background-image: url('https://lukakostic.com/prof.png');" 
						}
						meta itemprop="image" content="prof.png"


						div ."portrait-title"
							h1 itemprop="name"
								`Luka Kostić`
							h4 itemprop="jobTitle"
								`Games, Software & Web`

							h3 itemprop="worksFor" itemscope="" itemtype="http://schema.org/Organization"
								{
						  <a href="http://montreal.ubisoft.com/en/" target="_blank" itemprop="url">
							<span itemprop="name">Ubisoft Montréal</span>
						  </a>
								}


						link itemprop="url" href="https://www.jendrikillner.com/"

						ul ."social-icon" aria-hidden="true"


							li
								a itemprop="sameAs" href="mailto:jendrik.illner@gmail.com" target="_blank"
									i ."fa fa-envelope big-icon"


							li
								a itemprop="sameAs" href="//twitter.com/jendrikillner" target="_blank"
									i ."fa fa-twitter big-icon"

				div ."col-xs-12 col-md-8" itemprop="description"



					h1 #"biography"
						`Biography`

					p
						`In 2015 I joined Ubisoft Montréal as a 3D Programmer on FarCry Primal. After a successful project
development, I moved on to work on FarCry 5.
My focus is on engine architecture and performance optimizations.`

					p
						`Before joining Ubisoft I worked as a freelancer on a number of smaller games for various consoles.`


					div ."row"


						div ."col-sm-5"
							h3
								`Interests`
							ul ."ul-interests"

								li
									`Engine Design`

								li
									`Optimizations`

								li
									`GPU based Pipelines`



						div ."col-sm-7"
							h3
								`Education`
							ul ."ul-edu fa-ul"

								li
									i ."fa-li fa fa-graduation-cap"
									div ."description"
										p ."course"
											`Master Game Technology, 2015`
										p ."institution"
											`NHTV Breda`

								li
									i ."fa-li fa fa-graduation-cap"
									div ."description"
										p ."course"
											`B.Eng International Game Architecture and Design, 2010`
										p ."institution"
											`NHTV Breda`

	div ."container bg-light"
		a href="#" ."btn text-dark"
			`All`
		a href="#Web" ."btn text-dark"
			`Web`
		a href="#3D" ."btn text-dark"
			`3D`
		a href="#WebGL" ."btn text-dark"
			`WebGL`

	div ."album py-5"
		div ."container"

			div ."row" #"boards"


				div ."col-md-4" data-tags="Web Bootstrap CSS"
					div ."card mb-4 shadow-sm"
						a href="http://lukakostic.com"
							img src="/portfolio/site.png" height="100%" background="#55595c" color="#eceeef" ."card-img-top"
						div ."card-body"
							p ."card-text fonted"
								`Made LukaKostic.com using HTML, Bootstrap and CSS.`
							div ."d-flex justify-content-between align-items-center"
								div ."btn-group"
									a href="#Web" type="button" ."btn btn-sm btn-outline-secondary"
										`Web`
								small ."text-muted"
									`2019`

				div ."col-md-4" data-tags="Web WebGL 3D"
					div ."card mb-4 shadow-sm"
						a href="/penguins"
							img src="/portfolio/penguins.jpg" height="100%" background="#55595c" color="#eceeef" ."card-img-top"
						div ."card-body"
							p ."card-text fonted"
								`Testing Three.js and WebGL.<br>You can walk a penguin around with mouse clicks
and throw snowballs with T.`
							div ."d-flex justify-content-between align-items-center"
								div ."btn-group"
									a href="#Web" type="button" ."btn btn-sm btn-outline-secondary"
										`Web`
									a href="#3D" type="button" ."btn btn-sm btn-outline-secondary"
										`3D`
								small ."text-muted"
									`2018`


footer ."text-center fonted text-light"
	div ."container"
		p
			`Remember to have a nice day :)`