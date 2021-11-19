const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middleware/jwt-validate");
const registro = async (req, res, next) => {
  try {
    if (req.body.mail && req.body.name && req.body.password) {
      // Formato del mail
      if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
        res
          .status(400)
          .json({ success: false, message: "Formato de mail incorrecto" });
        return;
      }

      const existeUser = usuarios.find(u => {
        return u.mail === req.body.mail;
      });

      if (existeUser) {
        res.status(400).json({ success: false, message: "Mail repetido" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      console.log("Salt", salt);
      const password = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        name: req.body.name,
        mail: req.body.mail,
        password: password,
      };

      usuarios.push(newUser);

      return res.status(200).json({ success: true, newUser });
    } else {
      return res.status(400).json({
        success: false,
        message: "Faltan datos (requeridos: mail, name, password)",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = usuarios.find(u => u.mail === req.body.mail);
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña no válida" });
    }

    // Crear el token
    const token = jwt.sign(
      {
        name: user.name,
        mail: user.mail,
      },
      TOKEN_SECRET
    );

    console.log("Login exitoso");
    res.status(200).json({
      error: null,
      data: "Login exitoso",
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    return res.json({ error: null, usuarios });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registro,
  login,
  getUsers,
};

const usuarios = [
  {
    id: "c1a718e1-01bd-4739-9142-a02af21868c1",
    email: "psidworth0@npr.org",
    name: "Pauli",
    age: 32,
    gender: "Male",
    lookingFor: "Male",
    bio: "Waxbill, violet-eared",
    image:
      "https://robohash.org/molestiaealiquidquas.png?size=250x350&set=set1",
    distance: 9,
    interests: ["Karaoke", "Moda", "Brunch", "Escritura", "Nadar"],
  },
  {
    id: "34d1be2a-88a6-4554-a887-7b752ab3df77",
    email: "ntredgold1@squarespace.com",
    name: "Noella",
    age: 48,
    gender: "Female",
    lookingFor: "Male",
    bio: "Pelican, brown",
    image: "https://robohash.org/molestiaeenimaut.png?size=250x350&set=set1",
    distance: 7,
    interests: ["Deportes", "Caminar", "Politica", "Golf"],
  },
  {
    id: "a4c3075b-48d4-4c98-96b1-4f970c8eeb48",
    email: "jmacieja2@hostgator.com",
    name: "Junia",
    age: 28,
    gender: "Male",
    lookingFor: "Female",
    bio: "Moose",
    image: "https://robohash.org/suntevenietqui.png?size=250x350&set=set1",
    distance: 3,
    interests: ["Moda", "Correr", "Voluntariado", "Te"],
  },
  {
    id: "90f430b1-91d4-429e-9dbb-2293217dbf5d",
    email: "ksomner3@purevolume.com",
    name: "Kaitlin",
    age: 28,
    gender: "Male",
    lookingFor: "Female",
    bio: "Southern white-crowned shrike",
    image: "https://robohash.org/autemsequiqui.png?size=250x350&set=set1",
    distance: 8,
    interests: ["Escalada", "Entrenamiento", "Vino", "Amante de los perros"],
  },
  {
    id: "8839cdaa-12a3-4b09-93f3-74302eebb09b",
    email: "hbaudesson4@elegantthemes.com",
    name: "Harlin",
    age: 41,
    gender: "Female",
    lookingFor: "Female",
    bio: "Dragon, ornate rock",
    image: "https://robohash.org/liberoquiesse.png?size=250x350&set=set1",
    distance: 9,
    interests: ["Leer", "Trivia"],
  },
  {
    id: "8c94cdaa-1f0d-4092-a7d9-bec3d19433c9",
    email: "dmaides5@blogs.com",
    name: "Dorthea",
    age: 38,
    gender: "Female",
    lookingFor: "Male",
    bio: "Boat-billed heron",
    image: "https://robohash.org/etnostrumipsam.png?size=250x350&set=set1",
    distance: 1,
    interests: ["Dieta a base de plantas", "Musica", "Te", "Entrenamiento"],
  },
  {
    id: "f12ca4d8-5c36-4572-8c53-9b763981b9e4",
    email: "mleppo6@elpais.com",
    name: "Matty",
    age: 31,
    gender: "Male",
    lookingFor: "Female",
    bio: "Asian openbill",
    image: "https://robohash.org/sedetvoluptatem.png?size=250x350&set=set1",
    distance: 10,
    interests: ["Yoga", "Trivia", "Politica"],
  },
  {
    id: "72647e69-6d92-472e-8666-09e2bb79f3e1",
    email: "vbrute7@baidu.com",
    name: "Venita",
    age: 31,
    gender: "Male",
    lookingFor: "Male",
    bio: "Lark, horned",
    image:
      "https://robohash.org/fugiatillotemporibus.png?size=250x350&set=set1",
    distance: 10,
    interests: ["Correr", "Yoga", "Bailar", "Intercambio de idiomas"],
  },
  {
    id: "7c39019f-ed29-4b36-aad8-560bed810a58",
    email: "cmccuish8@redcross.org",
    name: "Con",
    age: 28,
    gender: "Female",
    lookingFor: "Female",
    bio: "Eastern grey kangaroo",
    image: "https://robohash.org/doloresquiaquod.png?size=250x350&set=set1",
    distance: 5,
    interests: ["Caminar", "Viajar", "Yoga"],
  },
  {
    id: "b6f949d1-953a-42ac-9f06-7a7a91d35128",
    email: "oburgis9@amazonaws.com",
    name: "Ottilie",
    age: 23,
    gender: "Male",
    lookingFor: "Female",
    bio: "White-browed sparrow weaver",
    image: "https://robohash.org/eaoditvitae.png?size=250x350&set=set1",
    distance: 5,
    interests: ["Futbol", "Astrologia", "Golf"],
  },
];
