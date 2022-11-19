const { List, Card } = require("../app/models");

testDBConnexion();

async function testDBConnexion() {
  const lists = await List.findAll({
    include: {
      association: "cards",
      include: "tags",
    },
    order: [
      ["position", "DESC"],
      [{ model: Card, as: "cards" }, "position", "ASC"], // pour trier les cartes par position croissante, pas le choix il faut sortir l'artillerie Stackoverflow
    ],
    logging: false
  });

  lists.forEach(list => {
    console.log(list.name);
    list.cards.forEach(card => {
      console.log(`   ${card.content}`);
      card.tags.forEach(tag => {
        console.log(`       ${tag.name}`);
      });
    });
  });
}
