const router = require('express').Router();
const { Post, User } = require('../../models');

// In a query to the post table, we would like to retrieve not only information about each post, but also the user that posted it. 
// With the foreign key, user_id, we can form a JOIN, an essential characteristic of the relational data model.

// Note that the username attribute was nested in the user object, which designates the table where this attribute is coming from.
// Get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Notice that there are only differences, namely the use of the findOne method and the use of the req.params to retrieve the id property from the route. 
// We used the where property to set the value of the id using req.params.id. 
// We are requesting the same attributes, including the username which requires a reference to the User model using the include property.
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Post.update(
            {
                title: req.body.title
            },
            {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Notice in the response that even though the entry at id = 2 was deleted, the new post that was created was designated to id = 3. 
// The id once used is never reused in favor of a new number. This is to avoid any possible references to other tables.
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;