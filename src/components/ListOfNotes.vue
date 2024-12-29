<script setup>
import { useNotesStore } from "../stores/notes";

const notesStore = useNotesStore();

const submit = (e) => {
    const formData = new FormData(e.target);

    const title = formData.get("note-title");
    const noteFound = notesStore.getNoteByTitle(title);

    if (noteFound) throw new Error("Note already exists!");

    const newNote = {
        title: formData.get("note-title"),
        body: formData.get("note-body"),
        category: "technology",
    };

    notesStore.addNote(newNote);
};

const deleteNote = (e) => {
    const noteId = e.target.getAttribute("note-id");
    console.log("Note Id: ", noteId);
    notesStore.deleteNote(noteId);
};
</script>

<template>
    <form @submit.prevent="submit">
        <input
            type="text"
            placeholder="Title"
            autocomplete="on"
            name="note-title"
        />
        <textarea
            placeholder="body"
            autocomplete="on"
            name="note-ody"
        ></textarea>
        <button type="submit">Add Note</button>
    </form>
    <div v-for="note in notesStore.notes" :key="note.id">
        <p>{{ note.title }}</p>
        <button type="button" @click="deleteNote" :note-id="note.id">
            Delete
        </button>
    </div>
</template>
