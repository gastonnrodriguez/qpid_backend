const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    age: {
        type: Number,
        required: [true, 'Please add an age']
    },
    gender: {
        type: String,
        required: [true, 'Please identify yoourself']
    },
    lookingFor: {
        type: String,
        required: [true, 'Please add a gender preference']
    },
    bio: {
        type: String,
        required: [true, 'Please add a bio to your profile']
    },
    image: {
        type: String,
        required: [true, 'Please add a profile pic']
    },
    distance: {
        type: Number,
        required: [true, 'Please add a distance radius']
    },
    interests: [{
        type: String,
        required: [true, 'Please add at least one interest']
    }],
    mail: {
        type: String,
        required: [true, 'Please add an email account']
    },
    password:{
        type:String,
        required: [true, 'Please add a strong password']
    }
});

module.exports = mongoose.model('User',UserSchema);

/* {
    id: "uCLrgIQwShMeqGPzssRCrxIR",
    name: "Gaston",
    age: 35,
    gender: "Male",
    lookingFor: "Female",
    bio: "Pelican, brown",
    image:
      "https://rootencial.com/wp-content/uploads/2019/11/NOELLA-PINTEREST2-e1606715848364.jpg",
    distance: 7,
    interests: ["Moda", "Caminar", "Entrenamiento", "Yoga"],
    mail: "gastoncodes@gmail.com",
    password: "$2b$10$4Sk0vWidgLLvg.YV1Gc9heqHwCzgGPrJ2JiznmFV2bZQfytKW46Su",
  }, */