<script setup>
import { ref } from "vue";
import { useNotesStore } from "../stores/notes";

import TrashSVG from "./svg/Trash.vue";

const notesStore = useNotesStore();

const isBeingEdited = ref(null);

const addNote = () => {
    const id = crypto.randomUUID();
    notesStore.addNote({ id });
    isBeingEdited.value = id;
};

const deleteNote = (e) => {
    const noteId = e.target.getAttribute("note-id");
    notesStore.deleteNote(noteId);
    closeNote();
};

const openNote = (e) => {
    const form = e.target;
    if (!form.classList.contains("note")) return;
    if (form.classList.contains("active")) return;
    isBeingEdited.value = form.id;
};

const closeNote = () => {
    isBeingEdited.value = null;
};
</script>

<template>
    <button type="button" @click="addNote" :disabled="isBeingEdited">+</button>
    <div class="list-wrapper">
        <form
            class="note"
            v-for="note in notesStore.notes"
            :key="note.id"
            :class="{ active: isBeingEdited === note.id }"
            :id="note.id"
            @click.stop="openNote"
        >
            <input
                type="text"
                name="note-title"
                autocomplete="off"
                placeholder="Title"
                v-model="note.title"
            />
            <textarea
                name="note-body"
                autocomplete="off"
                placeholder="body"
                v-model="note.body"
                v-if="isBeingEdited === note.id"
            ></textarea>
            <div class="controls">
                <button
                    type="button"
                    v-if="isBeingEdited === note.id"
                    @click="closeNote"
                >
                    Close
                </button>
                <!-- <button type="button" @click="deleteNote" :note-id="note.id">
                Delete
            </button> -->
                <TrashSVG @click="deleteNote" :note-id="note.id" />
            </div>
        </form>
    </div>
</template>
