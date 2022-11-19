-- Transaction : 
-- vient s'assurer de l'intégralité de l'exécution de TOUTES les commandes entre le BEGIN et le COMMIT
-- sinon, rollback
-- ex: utile pour les opérations importantes telles les virements bancaires

BEGIN;

CREATE ROLE okanban WITH LOGIN PASSWORD 'okanban';
-- Equivalent de :
-- CREATE USER okanban WITH PASSWORD 'okanban';

CREATE DATABASE okanban OWNER okanban;

COMMIT;
