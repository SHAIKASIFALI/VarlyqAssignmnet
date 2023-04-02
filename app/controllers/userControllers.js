const User = require("../models/userModel");

const httpGetUser = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1 });
    return res.status(200).send({
      data: users,
      success: true,
      msg: `successfully fetheched the users`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while fetching all the users`,
    });
  }
};

const httpCreateUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const user = await User.create(userData);
    res.status(201).send({
      data: user,
      success: true,
      msg: `user successfully created`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while creating a user`,
    });
  }
};

const httpUpdateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const filterObj = req.body;
    // when there is no user with that particular userid ..

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        err: `user doesnt exist kindly signup first`,
      });
    }
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      filterObj,
      { new: true }
    );

    return res.status(200).send({
      data: updatedUser,
      success: true,
      msg: `user succesffully updated`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while update a user`,
    });
  }
};

const httpDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // when there is no user with that particular userid ..

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        err: `user doesnt exist kindly signup first`,
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).send({
      data: deletedUser,
      success: true,
      msg: `successfully deleted an user`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      err: `there was a problem while deleting a user`,
    });
  }
};
module.exports = {
  httpGetUser,
  httpCreateUser,
  httpUpdateUser,
  httpDeleteUser,
};
