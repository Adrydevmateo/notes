<script setup>
import { useNotesStore } from "../stores/notes";

const notesStore = useNotesStore();

const deleteNote = (e) => {
    const noteId = e.target.getAttribute("note-id");
    notesStore.deleteNote(noteId);
};
</script>

<template>
    <form v-for="note in notesStore.notes" :key="note.id">
        <input
            type="text"
            placeholder="Title"
            autocomplete="on"
            name="note-title"
            v-model="note.title"
        />
        <textarea
            placeholder="body"
            autocomplete="on"
            name="note-ody"
            v-model="note.body"
        ></textarea>
        <button type="button" @click="deleteNote" :note-id="note.id">
            Delete
        </button>
    </form>
</template>
