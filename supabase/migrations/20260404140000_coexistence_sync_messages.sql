-- Coexistence: log mobile-app echoes; flag accounts linked via Business App onboarding.

alter table public.whatsapp_accounts
  add column if not exists is_coexistence boolean not null default false;

create table if not exists public.whatsapp_sync_messages (
  id uuid primary key default gen_random_uuid(),
  phone_number_id text,
  is_echo boolean not null default true,
  wa_message_id text,
  from_wa_id text,
  to_wa_id text,
  message_type text not null,
  text_body text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_sync_messages_phone_created_idx
  on public.whatsapp_sync_messages (phone_number_id, created_at desc);
