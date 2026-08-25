-- Durable Contact rate-limit log. Service role only. No visitor PII.

create table if not exists public.contact_rate_events (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_rate_events_ip_created_idx
  on public.contact_rate_events (ip_hash, created_at desc);

alter table public.contact_rate_events enable row level security;
