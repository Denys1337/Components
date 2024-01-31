import { ref, Ref } from 'vue';

import { AtFormQuestionNote, RepeatableNotes } from '../types';

export function useAddNotePopup(notes: AtFormQuestionNote[] | RepeatableNotes = []) {
  const isAddNotePopupVisible = ref(false);
  const stackRepeatableIndex: Ref<undefined | number> = ref(undefined);
  const handleAddNote = () => {
    isAddNotePopupVisible.value = false;
  };

  const showAddNotePopup = (index?: number) => {
    if (notes.length >= 50) {
      return;
    }
    stackRepeatableIndex.value = index ? index : undefined;
    isAddNotePopupVisible.value = true;
  };
  const hideAddNotePopup = () => {
    isAddNotePopupVisible.value = false;
  };
  return {
    isAddNotePopupVisible,
    handleAddNote,
    showAddNotePopup,
    hideAddNotePopup,
    stackRepeatableIndex,
  };
}
