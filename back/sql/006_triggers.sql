-- ===========================================================
-- PREENCHER created_by e updated_by
-- ===========================================================

create or replace function public.set_user_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    if tg_op = 'INSERT' then

        new.created_by := auth.uid();
        new.updated_by := auth.uid();

    elsif tg_op = 'UPDATE' then

        new.updated_by := auth.uid();

    end if;

    return new;

end;
$$;

-- ===========================================================
-- AUDITORIA
-- ===========================================================

create or replace function public.audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    if tg_op = 'INSERT' then

        insert into public.audit_logs (

            table_name,
            record_id,
            action,
            new_data,
            user_id

        )

        values (

            tg_table_name,
            new.id,
            'INSERT',
            to_jsonb(new),
            auth.uid()

        );

        return new;

    elsif tg_op = 'UPDATE' then

        insert into public.audit_logs (

            table_name,
            record_id,
            action,
            old_data,
            new_data,
            user_id

        )

        values (

            tg_table_name,
            new.id,
            'UPDATE',
            to_jsonb(old),
            to_jsonb(new),
            auth.uid()

        );

        return new;

    elsif tg_op = 'DELETE' then

        insert into public.audit_logs (

            table_name,
            record_id,
            action,
            old_data,
            user_id

        )

        values (

            tg_table_name,
            old.id,
            'DELETE',
            to_jsonb(old),
            auth.uid()

        );

        return old;

    end if;

    return null;

end;
$$;

-- ===========================================================
-- NEWS
-- ===========================================================

drop trigger if exists trg_news_user_fields
on public.news_items;

create trigger trg_news_user_fields

before insert or update

on public.news_items

for each row

execute function public.set_user_fields();


drop trigger if exists trg_news_audit
on public.news_items;

create trigger trg_news_audit

after insert or update or delete

on public.news_items

for each row

execute function public.audit_trigger();

-- ===========================================================
-- PODCASTS
-- ===========================================================

drop trigger if exists trg_podcasts_user_fields
on public.podcasts;

create trigger trg_podcasts_user_fields

before insert or update

on public.podcasts

for each row

execute function public.set_user_fields();


drop trigger if exists trg_podcasts_audit
on public.podcasts;

create trigger trg_podcasts_audit

after insert or update or delete

on public.podcasts

for each row

execute function public.audit_trigger();

-- ===========================================================
-- EVENTS
-- ===========================================================

drop trigger if exists trg_events_user_fields
on public.events;

create trigger trg_events_user_fields

before insert or update

on public.events

for each row

execute function public.set_user_fields();


drop trigger if exists trg_events_audit
on public.events;

create trigger trg_events_audit

after insert or update or delete

on public.events

for each row

execute function public.audit_trigger();