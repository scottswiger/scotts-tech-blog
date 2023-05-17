const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

//Get posts on home page
router.get('/', withAuth, async (req, res) => {
  try {
    postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

//Get new post
router.get('/new', withAuth, (req, res) => {
  res.render('post', {
    layout: 'dashboard',
  });
});



router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

// Getting the route for a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

// Getting the route for logging in 
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//Getting the route for signing up 
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
