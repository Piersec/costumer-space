-- ===========================================================
-- ADMIN USERS
-- ===========================================================

create table if not exists public.admin_users (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null unique references auth.users(id) on delete cascade,

    email text not null unique,

    created_at timestamptz not null default now()

);

-- ===========================================================
-- NEWS
-- ===========================================================

create table if not exists public.news_items (

    id uuid primary key default gen_random_uuid(),

    slug text unique,

    image_url text not null,

    tag text not null,

    title text not null,

    description text not null,

    link_url text,

    target_blank boolean not null default true,

    sort_order integer not null default 0,

    is_active boolean not null default true,

    created_by uuid references auth.users(id),

    updated_by uuid references auth.users(id),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

-- ===========================================================
-- PODCASTS
-- ===========================================================

create table if not exists public.podcasts (

    id uuid primary key default gen_random_uuid(),

    video_url text not null,

    episode_code text not null,

    title text not null,

    short_description text not null,

    modal_description text not null,

    topics jsonb not null default '[]',

    footer_text text,

    channel_link_text text,

    channel_link_url text,

    sort_order integer not null default 0,

    is_active boolean not null default true,

    created_by uuid references auth.users(id),

    updated_by uuid references auth.users(id),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

-- ===========================================================
-- EVENTS
-- ===========================================================

create table if not exists public.events (

    id uuid primary key default gen_random_uuid(),

    image_url text not null,

    date_label text not null,

    badge text not null,

    title text not null,

    description text not null,

    location text not null,

    time_label text not null,

    event_link text,

    sort_order integer not null default 0,

    is_active boolean not null default true,

    created_by uuid references auth.users(id),

    updated_by uuid references auth.users(id),

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

-- ===========================================================
-- AUDITORIA
-- ===========================================================

create table if not exists public.audit_logs (

    id uuid primary key default gen_random_uuid(),

    table_name text not null,

    record_id uuid not null,

    action text not null,

    old_data jsonb,

    new_data jsonb,

    user_id uuid references auth.users(id),

    created_at timestamptz not null default now()

);

-- ===========================================================
-- TRIGGERS
-- ===========================================================

drop trigger if exists trg_news_updated_at on public.news_items;

create trigger trg_news_updated_at
before update
on public.news_items
for each row
execute function public.set_updated_at();


drop trigger if exists trg_podcast_updated_at on public.podcasts;

create trigger trg_podcast_updated_at
before update
on public.podcasts
for each row
execute function public.set_updated_at();


drop trigger if exists trg_events_updated_at on public.events;

create trigger trg_events_updated_at
before update
on public.events
for each row
execute function public.set_updated_at();

-- ===========================================================
-- GERA SLUG AUTOMATICAMENTE
-- ===========================================================

drop trigger if exists trg_news_slug on public.news_items;

create trigger trg_news_slug
before insert
on public.news_items
for each row
execute function public.generate_slug();