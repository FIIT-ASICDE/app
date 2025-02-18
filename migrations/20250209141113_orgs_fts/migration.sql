create extension if not exists pg_trgm;

create index organization_name_trgm_idx on "Organization" using GIN(name gin_trgm_ops);
