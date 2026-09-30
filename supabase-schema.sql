-- Run this in your Supabase project → SQL Editor

-- Expenses table
create table if not exists expenses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  amount      numeric not null,
  category    text not null,
  note        text,
  date        text not null,
  created_at  timestamptz default now()
);

-- Settings table (one row per user)
create table if not exists settings (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references auth.users(id) on delete cascade not null unique,
  email_address        text default '',
  monthly_budget       numeric default 50000,
  currency             text default 'PKR',
  email_notifications  boolean default false,
  created_at           timestamptz default now()
);

-- Enable Row Level Security (users can only access their own data)
alter table expenses enable row level security;
alter table settings  enable row level security;

-- Expenses policies
create policy "users can select own expenses"
  on expenses for select using (auth.uid() = user_id);

create policy "users can insert own expenses"
  on expenses for insert with check (auth.uid() = user_id);

create policy "users can delete own expenses"
  on expenses for delete using (auth.uid() = user_id);

-- Settings policies
create policy "users can select own settings"
  on settings for select using (auth.uid() = user_id);

create policy "users can upsert own settings"
  on settings for insert with check (auth.uid() = user_id);

create policy "users can update own settings"
  on settings for update using (auth.uid() = user_id);
