const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middleware/jwt-validate");

const register = async (req, res, next) => {
  try {
    if (req.body.mail && req.body.name && req.body.password) {
      if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
        res
          .status(400)
          .json({ success: false, message: "Incorrect mail format" });
        return;
      }

      const userExists = users.find(u => {
        return u.mail === req.body.mail;
      });

      if (userExists) {
        res
          .status(400)
          .json({ success: false, message: "repeated email address" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        id: idMaker(24),
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        lookingFor: req.body.lookingFor,
        bio: req.body.bio,
        image: req.body.image,
        distance: req.body.distance,
        interests: req.body.interests,
        mail: req.body.mail,
        password: password,
      };

      users.push(newUser);
      return res.status(200).json({ success: true, newUser });
    } else {
      return res.status(400).json({
        success: false,
        message: "Missing values (required: mail, name, password)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = users.find(u => u.mail === req.body.mail);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Crear el token
    const token = jwt.sign(
      {
        name: user.name,
        mail: user.mail,
      },
      TOKEN_SECRET
    );

    res.status(200).json({
      error: null,
      data: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    return res.status(200).json({ error: null, users });
  } catch (error) {
    return next(error);
  }
};

const idMaker = length => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  register,
  login,
  getUsers,
};

const users = [
  {
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
  },
  {
    id: "c1a718e1-01bd-4739-9142-a02af21868c1",
    mail: "psidworth0@npr.org",
    name: "Pauli",
    age: 32,
    gender: "Male",
    lookingFor: "Male",
    bio: "Waxbill, violet-eared",
    image:
      "https://robohash.org/molestiaealiquidquas.png?size=250x350&set=set1",
    distance: 9,
    interests: ["Karaoke", "Moda", "Brunch", "Escritura", "Nadar"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "34d1be2a-88a6-4554-a887-7b752ab3df77",
    mail: "ntredgold1@squarespace.com",
    name: "Noella",
    age: 48,
    gender: "Female",
    lookingFor: "Male",
    bio: "Pelican, brown",
    image: "https://robohash.org/molestiaeenimaut.png?size=250x350&set=set1",
    distance: 7,
    interests: ["Deportes", "Caminar", "Politica", "Golf"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "a4c3075b-48d4-4c98-96b1-4f970c8eeb48",
    mail: "jmacieja2@hostgator.com",
    name: "Junia",
    age: 28,
    gender: "Male",
    lookingFor: "Female",
    bio: "Moose",
    image: "https://robohash.org/suntevenietqui.png?size=250x350&set=set1",
    distance: 3,
    interests: ["Moda", "Correr", "Voluntariado", "Te"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "90f430b1-91d4-429e-9dbb-2293217dbf5d",
    mail: "ksomner3@purevolume.com",
    name: "Kaitlin",
    age: 28,
    gender: "Male",
    lookingFor: "Female",
    bio: "Southern white-crowned shrike",
    image: "https://robohash.org/autemsequiqui.png?size=250x350&set=set1",
    distance: 8,
    interests: ["Escalada", "Entrenamiento", "Vino", "Amante de los perros"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "8839cdaa-12a3-4b09-93f3-74302eebb09b",
    mail: "hbaudesson4@elegantthemes.com",
    name: "Harlin",
    age: 41,
    gender: "Female",
    lookingFor: "Female",
    bio: "Dragon, ornate rock",
    image: "https://robohash.org/liberoquiesse.png?size=250x350&set=set1",
    distance: 9,
    interests: ["Leer", "Trivia"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "8c94cdaa-1f0d-4092-a7d9-bec3d19433c9",
    mail: "dmaides5@blogs.com",
    name: "Dorthea",
    age: 38,
    gender: "Female",
    lookingFor: "Male",
    bio: "Boat-billed heron",
    image: "https://robohash.org/etnostrumipsam.png?size=250x350&set=set1",
    distance: 1,
    interests: ["Dieta a base de plantas", "Musica", "Te", "Entrenamiento"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "f12ca4d8-5c36-4572-8c53-9b763981b9e4",
    mail: "mleppo6@elpais.com",
    name: "Matty",
    age: 31,
    gender: "Male",
    lookingFor: "Female",
    bio: "Asian openbill",
    image: "https://robohash.org/sedetvoluptatem.png?size=250x350&set=set1",
    distance: 10,
    interests: ["Yoga", "Trivia", "Politica"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "72647e69-6d92-472e-8666-09e2bb79f3e1",
    mail: "vbrute7@baidu.com",
    name: "Venita",
    age: 31,
    gender: "Male",
    lookingFor: "Male",
    bio: "Lark, horned",
    image:
      "https://robohash.org/fugiatillotemporibus.png?size=250x350&set=set1",
    distance: 10,
    interests: ["Correr", "Yoga", "Bailar", "Intercambio de idiomas"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "7c39019f-ed29-4b36-aad8-560bed810a58",
    mail: "cmccuish8@redcross.org",
    name: "Con",
    age: 28,
    gender: "Female",
    lookingFor: "Female",
    bio: "Eastern grey kangaroo",
    image: "https://robohash.org/doloresquiaquod.png?size=250x350&set=set1",
    distance: 5,
    interests: ["Caminar", "Viajar", "Yoga"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
  {
    id: "b6f949d1-953a-42ac-9f06-7a7a91d35128",
    mail: "oburgis9@amazonaws.com",
    name: "Ottilie",
    age: 23,
    gender: "Male",
    lookingFor: "Female",
    bio: "White-browed sparrow weaver",
    image: "https://robohash.org/eaoditvitae.png?size=250x350&set=set1",
    distance: 5,
    interests: ["Futbol", "Astrologia", "Golf"],
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",
  },
];
