import { SetupContext } from 'vue';

export default function useAtFormQuestionListeners(context: SetupContext) {
  return {
    'status-change': (event: Event) => context.emit('status-change', event),
    next: (event: Event) => context.emit('next', event),
    back: (event: Event) => context.emit('back', event),
    submit: (event: Event) => context.emit('submit', event),
    'show-add-note-popup': (event: Event) => context.emit('show-add-note-popup', event),
    'load-file-src': (event: Event) => context.emit('load-file-src', event),
  };
}
