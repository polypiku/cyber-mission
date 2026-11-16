-- Cyber Mission · phishing drill counter (real/index.html)
-- Run once in Supabase → SQL Editor. Stores only a campaign code and a time per click; no visitor data.
create table if not exists public.bait_clicks(
  id bigint generated always as identity primary key,
  campaign text not null default 'main',
  created_at timestamptz not null default now()
);
alter table public.bait_clicks enable row level security;   -- no policies: the table is reachable only through the functions below

create or replace function public.bait_hit(c text) returns bigint
language sql security definer set search_path = public as $$
  insert into bait_clicks(campaign) values (left(coalesce(nullif(lower(c), ''), 'main'), 32));
  select count(*) from bait_clicks where campaign = left(coalesce(nullif(lower(c), ''), 'main'), 32);
$$;

create or replace function public.bait_count(c text) returns bigint
language sql stable security definer set search_path = public as $$
  select count(*) from bait_clicks where campaign = left(coalesce(nullif(lower(c), ''), 'main'), 32);
$$;

grant execute on function public.bait_hit(text), public.bait_count(text) to anon;

-- See results: select campaign, count(*) as clicks, min(created_at) as first, max(created_at) as last
--              from bait_clicks group by campaign order by clicks desc;
