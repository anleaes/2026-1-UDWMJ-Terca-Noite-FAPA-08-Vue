<template>
  <div class="form-card-container">
    <div class="form-header">
      <h2 class="form-title">{{ title }}</h2>
      <p v-if="subtitle" class="form-subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="form-body">
      <slot></slot>
    </div>

    <div class="form-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.form-card-container {
  background-color: #1F1F1F;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto 40px auto;
}

.form-header {
  margin-bottom: 30px;
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
}

.form-title {
  font-family: 'Calistoga', serif;
  font-size: 32px;
  color: #FFF;
  margin-bottom: 10px;
}

.form-subtitle {
  color: #999;
  font-size: 16px;
}

.form-body {
  margin-bottom: 30px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

/* Global Form Styles for Slots */
:global(.form-group) {
  margin-bottom: 25px;
}

:global(.form-label) {
  display: block;
  color: #CCC;
  margin-bottom: 8px;
  font-weight: 500;
}

:global(.form-input), :global(.form-select) {
  width: 100%;
  background-color: #2B2B2B;
  color: #FFF;
  border: 1px solid #333;
  padding: 12px 15px;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;
}

:global(.form-input:focus), :global(.form-select:focus) {
  border-color: #FE6A0F;
}

:global(.btn-submit) {
  background-color: #FE6A0F;
  color: #FFF;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s;
}

:global(.btn-submit:hover) {
  opacity: 0.8;
}

:global(.btn-cancel) {
  background-color: transparent;
  color: #999;
  border: 1px solid #555;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

:global(.btn-cancel:hover) {
  background-color: #2B2B2B;
  color: #FFF;
  border-color: #FFF;
}
</style>
