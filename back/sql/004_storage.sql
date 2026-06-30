-- ===========================================================
-- STORAGE BUCKETS
-- ===========================================================

insert into storage.buckets (id, name, public)
values
    ('news', 'news', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values
    ('podcasts', 'podcasts', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values
    ('events', 'events', true)
on conflict (id) do nothing;

-- ===========================================================
-- REMOVE POLICIES ANTIGAS
-- ===========================================================

drop policy if exists "Public Read News" on storage.objects;
drop policy if exists "Public Read Podcasts" on storage.objects;
drop policy if exists "Public Read Events" on storage.objects;

drop policy if exists "Admin Upload News" on storage.objects;
drop policy if exists "Admin Upload Podcasts" on storage.objects;
drop policy if exists "Admin Upload Events" on storage.objects;

drop policy if exists "Admin Update News" on storage.objects;
drop policy if exists "Admin Update Podcasts" on storage.objects;
drop policy if exists "Admin Update Events" on storage.objects;

drop policy if exists "Admin Delete News" on storage.objects;
drop policy if exists "Admin Delete Podcasts" on storage.objects;
drop policy if exists "Admin Delete Events" on storage.objects;

-- ===========================================================
-- LEITURA PÚBLICA
-- ===========================================================

create policy "Public Read News"
on storage.objects
for select
using (bucket_id = 'news');

create policy "Public Read Podcasts"
on storage.objects
for select
using (bucket_id = 'podcasts');

create policy "Public Read Events"
on storage.objects
for select
using (bucket_id = 'events');

-- ===========================================================
-- UPLOAD
-- ===========================================================

create policy "Admin Upload News"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'news'
    and public.is_admin()
);

create policy "Admin Upload Podcasts"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'podcasts'
    and public.is_admin()
);

create policy "Admin Upload Events"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'events'
    and public.is_admin()
);

-- ===========================================================
-- UPDATE
-- ===========================================================

create policy "Admin Update News"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'news'
    and public.is_admin()
);

create policy "Admin Update Podcasts"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'podcasts'
    and public.is_admin()
);

create policy "Admin Update Events"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'events'
    and public.is_admin()
);

-- ===========================================================
-- DELETE
-- ===========================================================

create policy "Admin Delete News"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'news'
    and public.is_admin()
);

create policy "Admin Delete Podcasts"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'podcasts'
    and public.is_admin()
);

create policy "Admin Delete Events"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'events'
    and public.is_admin()
);