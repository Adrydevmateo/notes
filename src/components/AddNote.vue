<script setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";

const isAddingNote = ref(false);

const notesStore = useNotesStore();

const submit = (e) => {
    const form = e.target;
    const formData = new FormData(form);

    const title = formData.get("note-title");

    if (!title) throw new Error("Title not provided");

    const noteFound = notesStore.getNoteByTitle(title);

    if (noteFound) throw new Error("Note already exists!");

    const newNote = {
        title: formData.get("note-title"),
        body: formData.get("note-body"),
        category: "technology",
    };

    notesStore.addNote(newNote);
    form.reset();
    toggleIsAddingNote();
};

const toggleIsAddingNote = () => (isAddingNote.value = !isAddingNote.value);
</script>

<template>
    <form @submit.prevent="submit" :hidden="!isAddingNote">
        <input
            type="text"
            placeholder="Title"
            autocomplete="on"
            name="note-title"
        />
        <textarea
            placeholder="body"
            autocomplete="on"
            name="note-body"
        ></textarea>
        <button type="submit">Add Note</button>
        <button type="button" @click="toggleIsAddingNote">Cancel</button>
    </form>
    <button type="button" @click="toggleIsAddingNote" :disabled="isAddingNote">
        +
    </button>
</template>
