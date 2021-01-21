const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'ExampleName', email: 'example@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// This route will be found at http://localhost:3001/api/users/login in the browser.
router.post('/login', (req, res) => {
  // The .findOne() Sequelize method looks for a user with the specified email. The result of the query is passed as dbUserData to the .then() part of the .findOne() method. 
  // If the query result is successful (i.e., not empty), we can call .checkPassword(), which will be on the dbUserData object. 
  // We'll need to pass the plaintext password, which is stored in req.body.password, into .checkPassword() as the argument.
  // expects {email: 'example@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    // res.json({ user: dbUserData });
    // Note that the instance method was called on the user retrieved from the database, dbUserData. 
    // Because the instance method returns a Boolean, we can use it in a conditional statement to verify whether the user has been verified or not.
    // Verify the user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      // If the match returns a false value, an error message is sent back to the client, and the return statement exits out of the function immediately.
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    // if there is a match, the conditional statement block is ignored, and a response with the data and the message "You are now logged in." is sent instead.
    res.json({ user: dbUserData, message: 'You are now logged in!' });

  });
});

router.put('/:id', (req, res) => {
  // expects {username: 'ExampleName', email: 'example@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
