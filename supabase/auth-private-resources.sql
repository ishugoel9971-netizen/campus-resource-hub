-- Run this after enabling Supabase Auth. It adds per-user ownership and visibility.
alter table public.resources add column if not exists owner_id uuid references auth.users(id);
alter table public.resources add column if not exists visibility text not null default 'public' check (visibility in ('public','private'));
create index if not exists resources_owner_id_idx on public.resources(owner_id);
drop policy if exists "public read" on public.resources;
create policy "public and owned resources read" on public.resources for select using (visibility='public' or owner_id=auth.uid());
create policy "students insert own resources" on public.resources for insert to authenticated with check (owner_id=auth.uid());
