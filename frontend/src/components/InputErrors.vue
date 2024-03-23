<script setup>
defineProps({
    errors: {
        type: Array,
    },
});
</script>

<template>
    <div v-if="errors">
        <p v-for="errorMessage in errors" class="m-0 mb-1 text-sm p-error">
            {{ errorMessage }}
        </p>
    </div>
</template>
