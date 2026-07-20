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

-- ─────────────────────────────────────────────────────────────
-- One row per email (dedupe). Run this block once on an existing
-- table; it is safe to re-run.
-- ─────────────────────────────────────────────────────────────

-- 1. Normalise existing emails to lowercase (matches the API).
update public.rsvps set email = lower(email) where email is not null;

-- 2. Remove older duplicates, keeping the most recent per email.
delete from public.rsvps a
using public.rsvps b
where a.email is not null
  and a.email = b.email
  and a.created_at < b.created_at;

-- 3. Enforce uniqueness so the API's upsert(onConflict: email) works.
--    Multiple NULL emails remain allowed (guests who skip the field).
create unique index if not exists rsvps_email_unique
  on public.rsvps (email);

-- View responses in Dashboard → Table Editor → rsvps, or:
--   select name, attending, guests, message, created_at
--   from public.rsvps order by created_at desc;
