-- Commerce platform. Catalog content stays in the repository.
-- This schema stores customers, orders, entitlements, and delivery events.

create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  price integer not null,
  currency text not null default 'INR',
  status text not null,
  delivery_type text not null,
  version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text not null unique,
  name text,
  phone text,
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_purchase_at timestamptz
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  currency text not null default 'INR',
  subtotal integer not null,
  total integer not null,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  payment_provider text not null default 'razorpay',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  product_name_snapshot text not null,
  unit_price_snapshot integer not null,
  quantity integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'razorpay',
  provider_order_id text,
  provider_payment_id text unique,
  amount integer not null,
  currency text not null default 'INR',
  status text not null,
  payload_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  product_id text not null references public.products(id),
  order_id uuid not null references public.orders(id),
  status text not null check (status in ('active', 'revoked', 'refunded', 'expired')),
  granted_at timestamptz,
  expires_at timestamptz,
  version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists entitlements_one_active
  on public.entitlements (customer_id, product_id)
  where status = 'active';

create table if not exists public.download_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  product_id text not null references public.products(id),
  entitlement_id uuid not null references public.entitlements(id),
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.marketing_consents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  email text not null,
  consent_type text not null,
  status text not null check (status in ('opted_in', 'opted_out')),
  source text,
  consented_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists marketing_consents_unique
  on public.marketing_consents (customer_id, consent_type);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  order_id uuid references public.orders(id),
  product_id text references public.products(id),
  type text not null,
  provider_message_id text,
  status text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists email_events_once
  on public.email_events (order_id, type)
  where order_id is not null;

create table if not exists public.student_product_sessions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  product_id text not null references public.products(id),
  state jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, product_id)
);

create table if not exists public.processed_events (
  id text primary key,
  source text not null,
  created_at timestamptz not null default now()
);

create index if not exists orders_customer_idx on public.orders (customer_id, created_at desc);
create index if not exists entitlements_customer_idx on public.entitlements (customer_id, status);
create index if not exists payments_order_idx on public.payments (order_id);

alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.entitlements enable row level security;
alter table public.download_events enable row level security;
alter table public.marketing_consents enable row level security;
alter table public.email_events enable row level security;
alter table public.student_product_sessions enable row level security;
alter table public.processed_events enable row level security;

create or replace function public.current_customer_id()
returns uuid
language sql
stable
as $$
  select id from public.customers
  where email_normalized = lower(coalesce(auth.jwt() ->> 'email', ''))
  limit 1
$$;

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select using (true);

drop policy if exists customers_self_select on public.customers;
create policy customers_self_select on public.customers
  for select using (id = public.current_customer_id());

drop policy if exists customers_self_update on public.customers;
create policy customers_self_update on public.customers
  for update using (id = public.current_customer_id());

drop policy if exists orders_self_select on public.orders;
create policy orders_self_select on public.orders
  for select using (customer_id = public.current_customer_id());

drop policy if exists order_items_self_select on public.order_items;
create policy order_items_self_select on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.customer_id = public.current_customer_id()
    )
  );

drop policy if exists payments_self_select on public.payments;
create policy payments_self_select on public.payments
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
        and orders.customer_id = public.current_customer_id()
    )
  );

drop policy if exists entitlements_self_select on public.entitlements;
create policy entitlements_self_select on public.entitlements
  for select using (customer_id = public.current_customer_id());

drop policy if exists download_events_self_select on public.download_events;
create policy download_events_self_select on public.download_events
  for select using (customer_id = public.current_customer_id());

drop policy if exists download_events_self_insert on public.download_events;
create policy download_events_self_insert on public.download_events
  for insert with check (customer_id = public.current_customer_id());

drop policy if exists marketing_consents_self_select on public.marketing_consents;
create policy marketing_consents_self_select on public.marketing_consents
  for select using (customer_id = public.current_customer_id());

drop policy if exists email_events_self_select on public.email_events;
create policy email_events_self_select on public.email_events
  for select using (customer_id = public.current_customer_id());

drop policy if exists sessions_self_all on public.student_product_sessions;
create policy sessions_self_all on public.student_product_sessions
  for all using (customer_id = public.current_customer_id())
  with check (customer_id = public.current_customer_id());

insert into storage.buckets (id, name, public)
values ('product-deliverables', 'product-deliverables', false)
on conflict (id) do nothing;

drop policy if exists deliverables_no_public_read on storage.objects;
create policy deliverables_no_public_read on storage.objects
  for select using (false);
