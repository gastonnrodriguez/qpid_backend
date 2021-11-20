tags = [
    "Gastronomia",
    "Instagram",
    "Caminar",
    "Escalada",
    "Reposteria",
    "Correr",
    "Viajar",
    "Intercambio de idiomas",
    "Bloggear",
    "Peliculas",
    "Golf",
    "Dieta a base de plantas",
    "Fotografia",
    "Leer",
    "Surf",
    "Escritura",
    "Deportes",
    "Atletismo",
    "Cafe",
    "Moda",
    "Karaoke",
    "Salir a tomar algo",
    "Gamer",
    "Astrologia",
    "Espiritualidad",
    "Cocinar",
    "Futbol",
    "Bailar",
    "Jardineria",
    "Arte",
    "Manualidades",
    "Politica",
    "Ciclismo",
    "Museo",
    "Aire libre",
    "Salir de compras",
    "Salir de picnic",
    "Comedia",
    "Brunch",
    "Musica",
    "Netflix",
    "Disney",
    "Amante de los perros",
    "Cerveza artesanal",
    "Nadar",
    "Te",
    "Juegos de mesa",
    "Trivia",
    "Voluntariado",
    "Ecologismo",
    "Senderismo",
    "Vino",
    "Vloggear",
    "Amante de los gatos",
    "Entrenamiento",
    "Yoga",
    "Pesca",
  ];
  /*
  //Generate random selection of tags
  const randomNumber = (a, b) => {
    return Math.floor(Math.random() * b) + a;
  };
  
  const randomTag = () => {
    return randomNumber(1, 57);
  };
  
  const randomTagAmount = () => {
    return randomNumber(1, 5);
  };
  
  let selectedTags = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j <= randomTagAmount(); j++) {
      selectedTags.push(tags[randomTag()]);
    }
    console.log(selectedTags);
    selectedTags = [];
  }
  */
//Generate checkbox for interests dynamically
  tags.forEach(tag => {
   console.log(`
  <div class="tag">
    <input type="checkbox" id="${tag}" name="${tag}" value="${tag}" class="interestTag">
    <label for="${tag}">${tag}</label>
  <div/>
  `);
  });