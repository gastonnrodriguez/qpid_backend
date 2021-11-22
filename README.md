# QPID Backend
## How to install:
Clone the repository and run npm install, you'll need Node, Express, Nodemon, Morgan among others packages.

## Endpoints

### /registro
Allows you to register a new user:
E.g. : Request POST 
{    
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
  }
  
  Response 200 OK
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
  }

### /login 
Let users log in into the app
E.g.: Request POST
{  
 "email": "gaston@gmail.com"
 "password": "123456"
}

Response 200 OK
{
 user: {id: "c1a718e1-01bd-4739-9142-a02af21868c1",
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
    password: "$2b$10$EE3eIPWLB3rQWlP7FPK60OhDovkg1FkgWFook3wWHZoIMzvMnW62i",},
token: "dfjalsñdjfñdjf879698730982-304982-34h"
}
### /getUsers
Returns a complete list of users
E.g: Request GET

Response 200 OK
with an array of users.

###/getProposals
Returns proposals for the signed in user
E.g: Request POST
{
  id:"sdfasdf245ergd-45-df---rtr454534we"
}

Response 200 OK
with an array of users that match the criteria (Distance, gender and have at least one interest in common)





