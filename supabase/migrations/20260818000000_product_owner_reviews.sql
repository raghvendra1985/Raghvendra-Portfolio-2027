-- Owner review / approval is admin-only and is not catalogue status.
-- Do not auto-flip products.status or commerceMode from this table.
--
-- Catalogue content still lives in the repo. public.products is only a
-- commerce mirror. Create it here if the 20260817 commerce migration has
-- not been applied yet, so this file can run on its own.

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

alter table public.products enable row level security;

create table if not exists public.product_owner_reviews (
  product_id text primary key references public.products(id),
  reviewed boolean not null default false,
  approved_for_sale boolean not null default false,
  reviewed_at timestamptz,
  approved_at timestamptz,
  reviewer_email text,
  updated_at timestamptz not null default now()
);

alter table public.product_owner_reviews enable row level security;
