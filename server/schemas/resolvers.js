const {AuthenticationError} = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("test")
      const user = await User.create({ username, email, password });
      //To reduce the friction for the user, we immediately sign a JSON Web Token and log in after they are created
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log("logging in!")
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Icorrect credentials");
      }
      const token = signToken(user);
      console.log(token)
      return { token, user };
    },
    saveBook: async(parent, { bookData },context) => {
      try {
        if (context.user){
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { ...bookData } } } ,
          { new: true, runValidators: true }
        );
        }
        else throw new error("Not loggedd in");
      } catch (err) {
        console.log(err);
        throw new Error(err);
      };
    },
    removeBook: async (parent,{ bookId },context)=> {
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
