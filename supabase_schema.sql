-- Create incidents table
create table public.incidents (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  description text null,
  status text not null default 'open'::text,
  priority text not null default 'medium'::text,
  language text not null default 'en'::text,
  constraint incidents_pkey primary key (id)
) tablespace pg_default;

-- Enable RLS
alter table public.incidents enable row level security;

-- Create policy to allow all access (for demo)
create policy "Enable all access for all users" on public.incidents as permissive for all to public using (true) with check (true);

-- Enable Realtime for incidents table
alter publication supabase_realtime add table incidents;
