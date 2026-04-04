-- WhatsApp Embedded Signup: one row per Cloud API phone number (tenant routing).
-- Applied via Supabase MCP (migration whatsapp_accounts_embedded_signup) or SQL Editor.

create table if not exists public.whatsapp_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  waba_id text not null,
  phone_number_id text not null,
  access_token text not null,
  country_template text,
  budget_template text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (phone_number_id)
);

create index if not exists whatsapp_accounts_user_id_idx
  on public.whatsapp_accounts (user_id);

alter table public.whatsapp_accounts enable row level security;

drop policy if exists "Users can select own whatsapp_accounts" on public.whatsapp_accounts;
drop policy if exists "Users can insert own whatsapp_accounts" on public.whatsapp_accounts;
drop policy if exists "Users can update own whatsapp_accounts" on public.whatsapp_accounts;
drop policy if exists "Users can delete own whatsapp_accounts" on public.whatsapp_accounts;

create policy "Users can select own whatsapp_accounts"
  on public.whatsapp_accounts
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own whatsapp_accounts"
  on public.whatsapp_accounts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own whatsapp_accounts"
  on public.whatsapp_accounts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own whatsapp_accounts"
  on public.whatsapp_accounts
  for delete
  to authenticated
  using (auth.uid() = user_id);
