import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([
    {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      category: "",
    },
    {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      category: "",
    },
    {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      category: "",
    },
    {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      category: "",
    },
  ]);

  const notesByCategory = computed((category) =>
    notes.value.filter((f) => f.category === category),
  );

  const addNote = (note) => {
    const newNote = {
      id: note.id || crypto.randomUUID(),
      title: note.title || "",
      body: note.body || "",
      category: note.category || "",
    };
    notes.value.unshift(newNote);
    console.log(newNote);
  };

  const getNoteByTitle = (noteTitle) =>
    notes.value.find((f) => f.title === noteTitle);

  const updateNote = (note) => {
    notes.value = notes.value.map((m) => {
      if (m.id === note.id) {
        m.title = note.title;
        m.body = note.body;
        m.category = note.category;
      }
      return m;
    });
  };

  const deleteNote = (id) => {
    notes.value = notes.value.filter((f) => f.id !== id);
  };

  return {
    notes,
    notesByCategory,
    addNote,
    getNoteByTitle,
    updateNote,
    deleteNote,
  };
});
