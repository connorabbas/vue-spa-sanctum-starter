<script setup>
import AuthLayout from "@/views/layouts/AuthLayout.vue";
import OuterLayoutContainer from "@/components/OuterLayoutContainer.vue";
</script>

<template>
    <AuthLayout>
        <template #header>
            <div class="surface-overlay py-4 shadow-1">
                <OuterLayoutContainer>
                    <h2 class="m-0">Profile</h2>
                </OuterLayoutContainer>
            </div>
        </template>
        <div class="my-6 surface-overlay p-5 shadow-1 border-noround sm:border-round-lg">
            <div>
                <p class="m-0">Profile Page - WIP</p>
            </div>
        </div>
    </AuthLayout>
</template>
