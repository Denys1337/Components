import { PropType } from 'vue';

export const atFormBuilderAdvancedSettingsProps = {
  existingIds: {
    type: Map as PropType<Map<string, any>>,
    default: () => new Map(),
  },
  id: { type: String, required: true },
  // used for v-model for validation
  error: { type: Boolean },
};

export interface AtFormBuilderAdvancedSettingsProps {
  existingIds: string[];
  id?: string;
  error?: boolean;
}
