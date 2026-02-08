-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: incidents
create table public.incidents (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  language text not null default 'en',
  status text check (status in ('open', 'investigating', 'resolved', 'critical')) default 'open',
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: messages (for incident updates)
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  incident_id uuid references public.incidents(id) on delete cascade,
  content text not null,
  language text not null default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime
alter publication supabase_realtime add table incidents;
alter publication supabase_realtime add table messages;

-- RLS (Row Level Security) - Allow anon read/write for demo purposes
alter table incidents enable row level security;
alter table messages enable row level security;

create policy "Public incidents are viewable by everyone" on incidents for select using (true);
create policy "Public incidents are insertable by everyone" on incidents for insert with check (true);
create policy "Public incidents are updateable by everyone" on incidents for update using (true);

create policy "Public messages are viewable by everyone" on messages for select using (true);
create policy "Public messages are insertable by everyone" on messages for insert with check (true);
