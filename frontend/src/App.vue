<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "@/composables/useTheme.js";

const { currentTheme, setTheme } = useTheme();

onMounted(() => {
    setTheme(currentTheme.value);
});
</script>

<template>
    <!-- Use key to re-generate the page view component on each navigation :key="$route.path" -->
    <!-- Alteratively, use a watch() on each component to re-render dynamic data as needed -->
    <!-- TODO: router view inside layout views to have sidebar/nav preserve state -->
    <RouterView />
</template>
