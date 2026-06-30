-- ===========================================================
-- PIERSEC CMS
-- Inicialização do Banco
-- ===========================================================

-- Extensões
create extension if not exists "pgcrypto";

-- ===========================================================
-- Atualiza automaticamente o campo updated_at
-- ===========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- ===========================================================
-- Converte URL do YouTube em Embed
-- ===========================================================

create or replace function public.youtube_embed(video text)
returns text
language plpgsql
immutable
as $$
declare
    video_id text;
begin

    if video is null then
        return null;
    end if;

    if position('youtu.be/' in video) > 0 then

        video_id :=
            split_part(video,'youtu.be/',2);

        video_id :=
            split_part(video_id,'?',1);

        return
            'https://www.youtube.com/embed/' || video_id;

    end if;

    if position('watch?v=' in video) > 0 then

        video_id :=
            split_part(video,'watch?v=',2);

        video_id :=
            split_part(video_id,'&',1);

        return
            'https://www.youtube.com/embed/' || video_id;

    end if;

    if position('/embed/' in video) > 0 then
        return video;
    end if;

    return null;

end;
$$;

-- ===========================================================
-- Gera slug automaticamente
-- ===========================================================

create or replace function public.slugify(input text)
returns text
language sql
immutable
as $$
select lower(
    regexp_replace(
        regexp_replace(
            translate(
                input,
                'ÁÀÃÂÄáàãâäÉÈÊËéèêëÍÌÎÏíìîïÓÒÕÔÖóòõôöÚÙÛÜúùûüÇç',
                'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCc'
            ),
            '[^a-zA-Z0-9]+',
            '-',
            'g'
        ),
        '(^-|-$)',
        '',
        'g'
    )
);
$$;

-- ===========================================================
-- Trigger para gerar slug
-- ===========================================================

create or replace function public.generate_slug()
returns trigger
language plpgsql
as $$
begin

    if new.slug is null
    or trim(new.slug) = '' then

        new.slug :=
            public.slugify(new.title);

    end if;

    return new;

end;
$$;