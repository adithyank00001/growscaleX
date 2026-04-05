-- Lead funnel rows (WhatsApp webhook upserts; dashboard reads).
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null,
  full_name text,
  country_choice text,
  budget_choice text,
  current_step integer not null default 1,
  status text not null default 'new',
  is_paused boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (phone_number)
);

create index if not exists leads_updated_at_idx
  on public.leads (updated_at desc);

alter table public.leads enable row level security;

drop policy if exists "Authenticated users can select leads" on public.leads;

create policy "Authenticated users can select leads"
  on public.leads
  for select
  to authenticated
  using (true);
