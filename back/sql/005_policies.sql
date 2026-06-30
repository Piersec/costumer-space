-- ===========================================================
-- HABILITA RLS
-- ===========================================================

alter table public.admin_users enable row level security;
alter table public.news_items enable row level security;
alter table public.podcasts enable row level security;
alter table public.events enable row level security;
alter table public.audit_logs enable row level security;

-- ===========================================================
-- REMOVE POLICIES ANTIGAS
-- ===========================================================

drop policy if exists "Public read news" on public.news_items;
drop policy if exists "Public read podcasts" on public.podcasts;
drop policy if exists "Public read events" on public.events;

drop policy if exists "Admin manage news" on public.news_items;
drop policy if exists "Admin manage podcasts" on public.podcasts;
drop policy if exists "Admin manage events" on public.events;

drop policy if exists "Admin read admins" on public.admin_users;
drop policy if exists "Admin manage admins" on public.admin_users;

drop policy if exists "Admin read audit" on public.audit_logs;

-- ===========================================================
-- LEITURA PÚBLICA
-- ===========================================================

create policy "Public read news"

on public.news_items

for select

using (
    is_active = true
);

create policy "Public read podcasts"

on public.podcasts

for select

using (
    is_active = true
);

create policy "Public read events"

on public.events

for select

using (
    is_active = true
);

-- ===========================================================
-- ADMIN CRUD
-- ===========================================================

create policy "Admin manage news"

on public.news_items

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);

create policy "Admin manage podcasts"

on public.podcasts

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);

create policy "Admin manage events"

on public.events

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);

-- ===========================================================
-- ADMIN USERS
-- ===========================================================

create policy "Admin read admins"

on public.admin_users

for select

to authenticated

using (
    public.is_admin()
);

create policy "Admin manage admins"

on public.admin_users

for all

to authenticated

using (
    public.is_admin()
)

with check (
    public.is_admin()
);

-- ===========================================================
-- AUDITORIA
-- ===========================================================

create policy "Admin read audit"

on public.audit_logs

for select

to authenticated

using (
    public.is_admin()
);