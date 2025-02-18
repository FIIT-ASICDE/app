create extension if not exists pg_trgm;

-- Create function to generate weighted trigram index
create or replace function user_trigram_concat(u "User")
    returns text
    as $$
begin
    return coalesce(u.username, '') || ' ' || coalesce(u.email, '') || ' ' || coalesce(u.name, '') || ' ' || coalesce(u.surname, '');
end;
$$
language plpgsql
immutable;

create index user_trigram_idx on "User" using gin(user_trigram_concat("User") gin_trgm_ops);
