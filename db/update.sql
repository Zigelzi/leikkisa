-- SELECT count(id) FROM Game WHERE createdAt > ;
SELECT count(id) FROM Game WHERE datetime(createdAt/1000, 'unixepoch') > datetime('now', '-2 days');

SELECT datetime(createdAt/1000, 'unixepoch') FROM Game;
SELECT datetime('now', '-2 days');
-- 1691222618
-- 1691513694

-- Now - 4D: 1691600184
-- GAme: 1691335824