const axios = require("axios");
const url = "http://localhost:3000/";

//Return all users from database

const allUsers = async () => {
  try {
    const response = await axios(`${url}auth/usuarios`);
    return response.data.usuarios;
  } catch (error) {
    console.log(error);
  }
};

//Return all users except the one that signed in
//TODO the filtered users also shouldn't exist on likes or matches list from signed in user
const filteredUsers = async id => {
  try {
    const users = await allUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    return filteredUsers;
  } catch (error) {
    console.log(error);
  }
};

//Return the whole object of signed in user
const loggedUser = async id => {
  try {
    const users = await allUsers();
    const loggedUser = users.find(user => user.id === id);
    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};

//If an user has just one interest subject in common with the signed in user it'll be a proposal
const compareInterests = (userInterests, candidateInterests) => {
  return userInterests.some(uInterest =>
    candidateInterests.includes(uInterest)
  );
};
//Return a list of proposals based on interests and gender
const findProposals = async id => {
  const user = await loggedUser(id);
  const availableUsers = await filteredUsers(id);
  const proposals = [];

  availableUsers.forEach(available => {
    compareInterests(user.interests, available.interests) &&
    user.gender == available.lookingFor
      ? proposals.push(available)
      : availableUsers.pop(available);
  });

  return proposals;
};

const getProposals = async (req, res, next) => {
  try {
    const proposals = await findProposals(req.body.id);
    res.status(200).json({ status: "ok", proposals });

    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProposals,
};
