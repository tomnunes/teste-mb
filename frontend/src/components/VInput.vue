<script setup>
defineEmits(['update:modelValue']);

const props = defineProps({
  id: {
    type: String
  },
  name: {
    type: String
  },
  label: {
    type: String
  },
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "password", "email", "date", "tel"].includes(value);
    }
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String
  },
  pattern: {
    type: String
  },
  placeholder: {
    type: String
  },
  min: {
    type: String
  },
  max: {
    type: String
  },
});
</script>

<template>
  <div class="input-box">
    <label :for="props.id">{{ props.label }}</label>
    <input
      class="input-style"
      :type="props.type"
      :id="props.id"
      :placeholder="props.placeholder"
      :name="props.name"
      :required="props.required"
      :value="props.modelValue"
      :pattern="props.pattern"
      :min="props.min"
      :max="props.max"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>

</style>
