-- ===========================================================
-- GET NEWS
-- ===========================================================

create or replace function public.get_news()
returns jsonb
language sql
stable
as $$
select coalesce(
    (
        select jsonb_agg(
            jsonb_build_object(
                'id', id,
                'slug', slug,
                'image_url', image_url,
                'tag', tag,
                'title', title,
                'description', description,
                'link_url', link_url,
                'target_blank', target_blank
            )
            order by sort_order, created_at desc
        )
        from public.news_items
        where is_active = true
    ),
    '[]'::jsonb
);
$$;

-- ===========================================================
-- GET PODCASTS
-- ===========================================================

create or replace function public.get_podcasts()
returns jsonb
language sql
stable
as $$
select coalesce(
    (
        select jsonb_agg(
            jsonb_build_object(
                'id', id,
                'video_url', video_url,
                'embed_url', public.youtube_embed(video_url),
                'episode_code', episode_code,
                'title', title,
                'short_description', short_description,
                'modal_description', modal_description,
                'topics', topics,
                'footer_text', footer_text,
                'channel_link_text', channel_link_text,
                'channel_link_url', channel_link_url
            )
            order by sort_order, created_at desc
        )
        from public.podcasts
        where is_active = true
    ),
    '[]'::jsonb
);
$$;

-- ===========================================================
-- GET EVENTS
-- ===========================================================

create or replace function public.get_events()
returns jsonb
language sql
stable
as $$
select coalesce(
    (
        select jsonb_agg(
            jsonb_build_object(
                'id', id,
                'image_url', image_url,
                'date_label', date_label,
                'badge', badge,
                'title', title,
                'description', description,
                'location', location,
                'time_label', time_label,
                'event_link', event_link
            )
            order by sort_order, created_at desc
        )
        from public.events
        where is_active = true
    ),
    '[]'::jsonb
);
$$;

-- ===========================================================
-- HOME
-- ===========================================================

create or replace function public.get_home_content()
returns jsonb
language sql
stable
as $$
select jsonb_build_object(

    'news',
    public.get_news(),

    'podcasts',
    public.get_podcasts(),

    'events',
    public.get_events()

);
$$;