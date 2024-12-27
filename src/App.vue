<script setup>
import { useNotesStore } from "./stores/notes";

const notesStore = useNotesStore();

const addNote = () => {
    notesStore.addNote({
        title: "New note",
        body: "This is the body",
        category: "technology",
    });
};
</script>

<template>
    <h1>Home Page</h1>
    <button type="button" @click="addNote">Add Note</button>
    <div v-for="note in notesStore.notes" :key="note.id">
        <p>{{ note.title }}</p>
    </div>
</template>

<style scoped></style>
