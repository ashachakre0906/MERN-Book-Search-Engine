const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }
    },
  },
    user: async (parent, { username, _id }, context) => {
      try {
        return await User.findOne({
          $or: [{ _id: _id }, { username }],
        });
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    // me: async (parent, args, context) => {
    //   try {
    //     if (!context.user) throw new AuthenticationError('Not logged in!');
    //     const user =  findById(context.user._id);
    //     return user;
    //   } catch (error){
    //     throw new AuthenticationError(error);
    //   }
    // }
  // },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("test");
      const user = await User.create({ username, email, password });
      //To reduce the friction for the user, we immediately sign a JSON Web Token and log in after they are created
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log("logging in!");
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Icorrect credentials");
      }
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      try {
        if (context.user) {
          console.log(context.user);
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { ...book } } },
            { new: true, runValidators: true }
          );
        } else throw new AuthenticationError("Not loggedd in");
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return;
      }
      return updatedUser;
      console.log(updatedUser);
    },
  },
};

module.exports = resolvers;
