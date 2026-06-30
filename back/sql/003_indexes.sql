-- ===========================================================
-- NEWS
-- ===========================================================

create index if not exists idx_news_active
on public.news_items (is_active);

create index if not exists idx_news_sort
on public.news_items (sort_order);

create index if not exists idx_news_slug
on public.news_items (slug);

create index if not exists idx_news_active_sort
on public.news_items (
    is_active,
    sort_order
);

-- ===========================================================
-- PODCASTS
-- ===========================================================

create index if not exists idx_podcasts_active
on public.podcasts (is_active);

create index if not exists idx_podcasts_sort
on public.podcasts (sort_order);

create index if not exists idx_podcasts_active_sort
on public.podcasts (
    is_active,
    sort_order
);

-- ===========================================================
-- EVENTS
-- ===========================================================

create index if not exists idx_events_active
on public.events (is_active);

create index if not exists idx_events_sort
on public.events (sort_order);

create index if not exists idx_events_active_sort
on public.events (
    is_active,
    sort_order
);

-- ===========================================================
-- ADMIN USERS
-- ===========================================================

create index if not exists idx_admin_user
on public.admin_users (user_id);

create index if not exists idx_admin_email
on public.admin_users (email);

-- ===========================================================
-- AUDITORIA
-- ===========================================================

create index if not exists idx_audit_table
on public.audit_logs (table_name);

create index if not exists idx_audit_record
on public.audit_logs (record_id);

create index if not exists idx_audit_user
on public.audit_logs (user_id);

create index if not exists idx_audit_created
on public.audit_logs (created_at desc);
