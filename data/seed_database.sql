BEGIN;

INSERT INTO "list" (id, position, name)
VALUES
  (1, 1, 'Liste des courses'),
  (2, 2, 'Todo today'),
  (3, 3, 'Liste des anniversaires')
;

INSERT INTO "card" (id, position, content, color, list_id)
VALUES
  (1, 1, 'Savon', '#F0F', 1),
  (2, 2, 'Chartreuse', NULL, 1),
  (3, 3, 'Concombre', '#0F0', 1),

  (4, 1, 'Dormir', '#F00', 2),
  (5, 2, 'Nourrir le chat', NULL, 2),
  (6, 2, 'Devenir le meilleur dresseur', NULL, 2),

  (7, 1, 'Maman le 01/01/1970', '#00F', 3)
;

INSERT INTO "tag" (id, name, color) 
VALUES 
  (1, 'Urgent', '#F0F'),
  (2, 'En retard', '#000'),
  (3, 'Eco-friendly', '#0F0')
;

INSERT INTO "card_has_tag" (card_id, tag_id)
VALUES
  (1, 3),
  (5, 1),
  (5, 2),
  (3, 3),
  (6 ,1),
  (4, 2)
;


-- On set la valeur de la séquence à l'ID max car on vient d'insérer des ID manuellement donc ça n'a pas initialiser la séquence correctement.
-- Deuxieme option : on aurait pu juste retirer les ID lors de l'insertion
SELECT setval('list_id_seq', (SELECT MAX(id) from "list"));
SELECT setval('card_id_seq', (SELECT MAX(id) from "card"));
SELECT setval('tag_id_seq', (SELECT MAX(id) from "tag"));

COMMIT;
