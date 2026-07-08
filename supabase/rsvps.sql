-- RSVP table for theabunion.
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.rsvps (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text,
  attending  boolean not null,
  guests     integer not null default 1,
  message    text
);

-- Lock the table down: enable RLS and grant NO public policies.
-- The /api/rsvp route writes with the service-role key, which bypasses
-- RLS, so guests can submit but no one can read the list from the client.
alter table public.rsvps enable row level security;

-- View responses in Dashboard → Table Editor → rsvps, or:
--   select name, attending, guests, message, created_at
--   from public.rsvps order by created_at desc;
