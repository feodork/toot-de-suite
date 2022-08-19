\i schema.sql

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE toots_id_seq RESTART WITH 1;
ALTER SEQUENCE reviews_id_seq RESTART WITH 1;

\i seed/users.sql
\i seed/toots.sql
\i seed/reviews.sql
