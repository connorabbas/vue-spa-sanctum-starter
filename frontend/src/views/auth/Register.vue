<script setup>
import { ref, reactive } from "vue";
import { useErrorHandling } from "@/composables/useErrorHandling";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import GuestLayout from "@/views/layouts/GuestLayout.vue";
import InputErrors from "@/components/InputErrors.vue";
import Toast from "primevue/toast";

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError } = useErrorHandling();

const registerForm = reactive({
    submitting: false,
    data: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    },
});

const showErrorToast = () => {
    toast.add({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred, please try again later.",
        life: 3000,
    });
};
function submit() {
    registerForm.submitting = true;
    authStore
        .register(registerForm.data)
        .catch((error) => {
            handleAxiosError(error);
            if (errors.critical || errors.other) {
                showErrorToast();
            }
        })
        .finally(() => {
            registerForm.submitting = false;
        });
}
</script>

<template>
    <GuestLayout>
        <Toast />
        <div class="surface-card p-4 shadow-1 border-round-lg w-full sm:w-12 md:w-30rem">
            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label
                        for="name"
                        class="block mb-2"
                        >Name</label
                    >
                    <InputText
                        ref="nameInput"
                        id="name"
                        type="text"
                        v-model="registerForm.data.name"
                        class="w-full"
                        :class="errors.validation?.name ? 'p-invalid' : ''"
                        required
                        autocomplete="name"
                        autofocus
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.name"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="email"
                        class="block mb-2"
                        >Email</label
                    >
                    <InputText
                        id="email"
                        type="email"
                        v-model="registerForm.data.email"
                        class="w-full"
                        :class="errors.validation?.email ? 'p-invalid' : ''"
                        required
                        autocomplete="username"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.email"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="password"
                        class="block mb-2"
                        >Password</label
                    >
                    <InputText
                        id="password"
                        type="password"
                        v-model="registerForm.data.password"
                        class="w-full"
                        :class="errors.validation?.password ? 'p-invalid' : ''"
                        required
                        autocomplete="new-password"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.password"
                    />
                </div>

                <div class="mb-4">
                    <label
                        for="password_confirmation"
                        class="block mb-2"
                        >Confirm Password</label
                    >
                    <InputText
                        id="password_confirmation"
                        type="password"
                        v-model="registerForm.data.password_confirmation"
                        class="w-full"
                        :class="errors.validation?.password_confirmation ? 'p-invalid' : ''"
                        required
                        autocomplete="new-password"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.password_confirmation"
                    />
                </div>

                <div class="flex justify-content-end align-items-center">
                    <RouterLink
                        :to="{ name: 'login' }"
                        class="mr-3 text-color-secondary hover:text-color"
                        >Already registered?</RouterLink
                    >
                    <Button
                        raised
                        type="submit"
                        :loading="registerForm.submitting"
                        label="Register"
                        severity="contrast"
                    />
                </div>
            </form>
        </div>
    </GuestLayout>
</template>
