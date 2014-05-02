module.exports = function (app, express, nodemailer) {

	// Returns No Layout With Ajax Request
	app.configure(function() {
	  app.use(require('express-ajax'));
	});

	// Home Route
	var home = function (req, res) {
	    res.render('home', {
	        title: 'Larry King Orchestra'
	    });
	}

    // set up the routes themselves
	app.get('/', home); 

	app.get('/index.html', home);

	app.get('/home', home);

	app.get('/about', home);

	app.get('/services', home);

	app.get('/gallery', home);

	app.get('/videos', home);

	app.get('/bios', home);

	app.get('/raves-reviews', home);

	app.get('/contact', home);

	app.get('/raves-reviews/', home);

	app.get('/raves-reviews/contact', home);

	app.get('/links', home);

	app.get('/raves-reviews/links', home);

    // BIOGRAPHY PAGES
    app.get('/bios/larry-king', function (req, res) {
	    res.render('partials/bios/larry-king.html', {
	        layout: 'bios', 
	        title: 'Larry King Biography'
	    });
	});

    app.get('/bios/john-blasucci', function (req, res) {
	    res.render('partials/bios/john-blasucci.html', {
	        layout: 'bios', 
	        title: 'John Blasucci Biography'
	    });
	});

    app.get('/bios/tina-crawley', function (req, res) {
	    res.render('partials/bios/tina-crawley.html', {
	        layout: 'bios', 
	        title: 'Tina Crawley Biography'
	    });
	});

    app.get('/bios/chris-siebold', function (req, res) {
	    res.render('partials/bios/chris-siebold.html', {
	        layout: 'bios', 
	        title: 'Chris Siebold Biography'
	    });
	});

    app.get('/bios/kathleen-obrien', function (req, res) {
	    res.render('partials/bios/kathleen-obrien.html', {
	        layout: 'bios', 
	        title: 'Kathleen O\'Brien Biography'
	    });
	});

    app.get('/bios/jeff-morrow', function (req, res) {
	    res.render('partials/bios/jeff-morrow.html', {
	        layout: 'bios', 
	        title: 'Jeff Morrow Biography'
	    });
	});

    app.get('/bios/ethan-bender', function (req, res) {
	    res.render('partials/bios/ethan-bender.html', {
	        layout: 'bios', 
	        title: 'Ethan Bender Biography'
	    });
	});

    app.get('/bios/mike-poupko', function (req, res) {
	    res.render('partials/bios/mike-poupko.html', {
	        layout: 'bios', 
	        title: 'Mike Poupko Biography'
	    });
	});

    app.get('/bios/marques-carroll', function (req, res) {
	    res.render('partials/bios/marques-carroll.html', {
	        layout: 'bios', 
	        title: 'Marques Caroll Biography'
	    });
	});

    app.get('/bios/nic-meyer', function (req, res) {
	    res.render('partials/bios/nic-meyer.html', {
	        layout: 'bios', 
	        title: 'Nic Meyer Biography'
	    });
	});


    app.get('/bios/khari-parker', function (req, res) {
	    res.render('partials/bios/khari-parker.html', {
	        layout: 'bios', 
	        title: 'Khari Parker Biography'
	    });
	});

    app.get('/bios/john-janowiak', function (req, res) {
	    res.render('partials/bios/john-janowiak.html', {
	        layout: 'bios', 
	        title: 'John Janowiak Biography'
	    });
	});

    app.get('/bios/poetic-video', function (req, res) {
	    res.render('partials/bios/poetic-video.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

	app.get('/bios/heather-boehm', function (req, res) {
	    res.render('partials/bios/heather-boehm.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

	app.get('/bios/stephanie-harris', function (req, res) {
	    res.render('partials/bios/stephanie-harris.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

	app.get('/bios/dawn-gingrich', function (req, res) {
	    res.render('partials/bios/dawn-gingrich.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

	app.get('/bios/julia-schifrin', function (req, res) {
	    res.render('partials/bios/julia-schifrin.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

	app.get('/bios/elizabeth-huffman', function (req, res) {
	    res.render('partials/bios/elizabeth-huffman.html', {
	        layout: 'bios', 
	        title: 'Lisa & Jeff'
	    });
	});

// ROUTES FOR RAVES AND REVIEWS //
    app.get('/raves-reviews/clients', function (req, res) {
	    res.render('raves', {
	        title: 'Raves & Reviews',
	        raves: true,
	        clients: true
	    });
	});

    app.get('/raves-reviews/lko-press', function (req, res) {
	    res.render('raves', {
	        title: 'Raves & Reviews',
	        raves: true,
	        lkopress: true
	    });
	});

    app.get('/raves-reviews/soleil-moon-reviews', function (req, res) {
	    res.render('raves', {
	        title: 'Raves & Reviews',
	        raves: true,
	        soleilmoon: true
	    });
	});

    // SEND EMAIL FROM FORM
    app.post('/send', function (req, res) {

    	var mailOpts, smtpTrans;

		//Setup nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
		smtpTrans = nodemailer.createTransport('SMTP', {
			service: 'Gmail',
			auth: {
				user: "larrykingorchestra@gmail.com",
				pass: "lukaluka1" 
			}
  		});

		//Mail options
		mailOpts = {
			from: req.body.email, //grab form data from the request body object
			to: 'larrykingorchestra@gmail.com',
			subject: 'LKO Contact Form',
			html: 'From: ' + req.body.name + ' &lt;' + req.body.email + '&gt; <br>Phone: ' + req.body.tel + '<br>Date of Event: ' + req.body.date + '<br>Location: ' +  req.body.location + '<br>Details &amp; Comments:<br>' + req.body.message + '<br><br><p>Email form provided by <a href="http://www.wavamedia.com/">WavaMedia</a>.',
			replyTo: req.body.email,
		};

		smtpTrans.sendMail(mailOpts, function (error, response) {
			//Email not sent
			if (error) {
				console.log('fail');
				res.redirect('/#contact');
			}
			//Yay!! Email sent
			else {
				console.log('work');
				res.redirect('/');
			}
		});
    });

	// STATIC ROUTE FOR ASSESTS
	app.use(express.static('assests/'));
};