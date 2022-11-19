const sanitizeHtml = require("sanitize-html");
const { List } = require("../models");

async function getAllLists(req, res) {
  const lists = await List.findAll({ // Récupérer les listes
    order: [
      ["position", "ASC"],
      ["created_at", "DESC"]
    ],
    include: [{
      association: "cards", // la clef association attend l'alias de l'association
      include: {
          association: "tags"
      }
  }] // Potentiellement mauvaise pratique, car on alourdi la taille de la réponse, donc du transfert, donc la vitesse de notre API
  });
  res.json(lists); // Les envoyer en json au client. Le status est 200 par défaut (mais on pourrait le préciser si on veut)
}

async function getOneList(req, res) {
  const listId = parseInt(req.params.id); // On récupère l'ID passé dans la requête

  if( isNaN(listId) ) { // On peut même éviter un appel à la base en vérifiant les user inputs
    res.status(404).json({ error: "List not found. Please verify the provided id." });
    return;
  }

  const list = await List.findByPk(listId); // On fetch la liste en question

  if (! list) { // si elle existe pas => 404
    res.status(404).json({ error: "List not found. Please verify the provided id." });
    return; // On arrête la fonction (on pourra se permettre de l'écrire sur la même ligne que le res.json mais il faut comprendre que c'est pour simplement ARRETER la fonction)
  }

  res.json(list); // si elle existe => on la retourne
}

async function createList(req, res) {
  const { name, position } = req.body;

  if (position && isNaN(position)) { // Condition de garde, on protège notre API. Avec des early return
    return res.status(400).json({ error: "Invalid type: position should be a number" });
  }

  if (! name) {
    return res.status(400).json({ error: "Missing body parameter: name" });
  }

  const list = await List.create({
    name: sanitizeHtml(name),
    position
  });

  res.status(201).json(list);
}

async function updateList(req, res) {
  // Extract params & body
  const listId = parseInt(req.params.id);
  const { name, position } = req.body;

  // Verify user inputs
  if (! name && ! position) {
    return res.status(400).json({ error: "Invalid body. Should provide at least a 'name' or 'position' property" });
  }

  if (position && isNaN(position)) {
    return res.status(400).json({ error: "Invalid body parameter 'position'. Should provide a number." });
  }

  // Fetch from Database
  const list = await List.findByPk(listId);
  if (! list) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." });
  }

  // Update Database
  if (name) {
    list.name = sanitizeHtml(name);
  }
  if (position) {
    list.position = parseInt(position);
  }
  await list.save();

  // Return response
  res.json(list);
}

async function deleteList(req, res) {
  // Extract params & body
  const id = parseInt(req.params.id);

  // Fetch from Database
  const list = await List.findByPk(id);
  if (! list) {
    return res.status(404).json({ error: "List not found. Please verify the provided id." });
  }

  // Update Database
  await list.destroy();

  // Return response
  res.status(204).end();
}


module.exports = {
  getAllLists,
  getOneList,
  createList,
  updateList,
  deleteList
};
