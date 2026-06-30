"use client"

import { useState, useEffect } from "react"



import {
    createPodcast,
    updatePodcast,
    deletePodcast,
    getPodcasts
} from "./actions"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function PodcastsPage() {


    const [podcasts, setPodcasts] = useState<any[]>([])

    useEffect(() => {

        async function load() {

            const data = await getPodcasts()

            setPodcasts(data ?? [])

        }


        load()

    }, [])


    const [form, setForm] = useState({

        video_url: "",
        episode_code: "",
        title: "",
        short_description: "",
        modal_description: "",
        topics: [],
        footer_text: "",
        channel_link_text: "",
        channel_link_url: ""

    })


    const [editing, setEditing] = useState(false)

    const [selectedId, setSelectedId] = useState<string | null>(null)


    const [openForm, setOpenForm] = useState(false)


    function updateField(
        field: string,
        value: string
    ) {

        setForm({
            ...form,
            [field]: value
        })

    }



    return (

        <div>


            <h1 className="text-3xl font-bold">
                PIERCAST
            </h1>


            <p className="text-muted-foreground mt-2">
                Gerencie os episódios do podcast.
            </p>



            <Button
                className="mt-6"
                onClick={() => {

                    setEditing(false)
                    setSelectedId(null)

                    setOpenForm(true)

                }}
            >
                + Adicionar episódio
            </Button>

            {openForm && (

                <div className="mt-8 border rounded-xl p-6 space-y-5">


                    <div>
                        <Label>
                            Link YouTube
                        </Label>

                        {form.video_url && (

                            <div className="mt-4">

                                <Label>
                                    Pré-visualização
                                </Label>

                                <iframe
                                    src={
                                        `https://www.youtube.com/embed/${form.video_url.split("v=")[1]?.split("&")[0]
                                        }?origin=${window.location.origin}`
                                    }
                                    className="w-full h-64 rounded-xl mt-2"
                                    allow="
    accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture"
                                    allowFullScreen
                                />

                            </div>

                        )}


                    </div>



                    <div>
                        <Label>
                            Código do episódio
                        </Label>

                        <Input
                            value={form.episode_code}
                            onChange={(e) =>
                                updateField(
                                    "episode_code",
                                    e.target.value
                                )
                            }
                            placeholder="EP-001"
                        />

                    </div>



                    <div>
                        <Label>
                            Título
                        </Label>

                        <Input
                            value={form.title}
                            onChange={(e) =>
                                updateField(
                                    "title",
                                    e.target.value
                                )
                            }
                        />

                    </div>



                    <div>
                        <Label>
                            Descrição curta
                        </Label>

                        <Textarea
                            value={form.short_description}
                            onChange={(e) =>
                                updateField(
                                    "short_description",
                                    e.target.value
                                )
                            }
                        />

                    </div>



                    <div>
                        <Label>
                            Descrição do modal
                        </Label>

                        <Textarea
                            value={form.modal_description}
                            onChange={(e) =>
                                updateField(
                                    "modal_description",
                                    e.target.value
                                )
                            }
                        />

                    </div>



                    <Button
                        onClick={async () => {

                            try {


                                if (editing && selectedId) {

                                    await updatePodcast(
                                        selectedId,
                                        form
                                    )


                                    alert("Episódio atualizado!")


                                } else {


                                    const result = await createPodcast(form)


                                    alert("Episódio criado!")

                                }


                                const data = await getPodcasts()

                                setPodcasts(data ?? [])


                                setOpenForm(false)


                                setEditing(false)

                                setSelectedId(null)


                            } catch (error) {

                                console.error(error)

                                alert("Erro ao salvar episódio")

                            }

                        }}
                    >
                        {editing
                            ? "Atualizar episódio"
                            : "Salvar episódio"
                        }
                    </Button>


                </div>

            )}

            <div className="mt-8 space-y-4">

                {podcasts.map((item) => (

                    <div
                        key={item.id}
                        className="border rounded-xl p-5 space-y-3"
                    >

                        <h2 className="font-bold text-xl">
                            {item.title}
                        </h2>


                        <p className="text-muted-foreground">
                            {item.episode_code}
                        </p>


                        <p>
                            {item.short_description}
                        </p>


                        {item.video_url && (

                            <iframe
                                src={
                                    item.video_url.replace(
                                        "watch?v=",
                                        "embed/"
                                    )
                                }
                                className="w-full h-64 rounded-lg"
                            />

                        )}


                        <div className="flex gap-3">

                            <Button
                                onClick={() => {

                                    setEditing(true)

                                    setSelectedId(item.id)


                                    setForm({

                                        video_url: item.video_url,
                                        episode_code: item.episode_code,
                                        title: item.title,
                                        short_description: item.short_description,
                                        modal_description: item.modal_description,
                                        topics: item.topics,
                                        footer_text: item.footer_text,
                                        channel_link_text: item.channel_link_text,
                                        channel_link_url: item.channel_link_url,

                                    })


                                    setOpenForm(true)

                                }}
                            >
                                Editar
                            </Button>


                            <Button
                                variant="destructive"
                                onClick={async () => {

                                    await deletePodcast(item.id)

                                    const data = await getPodcasts()

                                    setPodcasts(data ?? [])

                                }}
                            >
                                Excluir
                            </Button>

                        </div>

                    </div>

                ))}

            </div>


        </div>

    )

}