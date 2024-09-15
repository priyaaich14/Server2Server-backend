import User from '../models/UserModel.js';
import axios from 'axios';

const userController = {};

userController.show = async (req, res) => {
  const uid = req.params.id;

  try {
    let user = await User.findOne({ usid: uid });
    if (!user) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${uid}`);
      if (response.data) {
        user = new User({
          usid: response.data.id,
          name: response.data.name,
          email: response.data.email,
          city: response.data.address.city
        });
        await user.save();
        res.status(201).json(user);
      } else {
        res.status(404).send('User not found in external API');
      }
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
}
userController.list = async (req, res) => {
    try {
      let users = await User.find();
      if (users.length === 0) {
        // If no users are found locally, fetch from external API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        if (response.data && response.data.length > 0) {
          // Save users from external API to local database
          users = await User.insertMany(response.data.map(user => ({
            usid: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city
          })));
          res.status(201).json(users);
        } else {
          res.status(404).send('No users found in external API');
        }
      } else {
        res.json(users);
      }
    } catch (error) {
      res.status(500).send(error.toString());
    }
  };

export default userController;
