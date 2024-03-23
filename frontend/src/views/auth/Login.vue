<script setup>
import { ref, reactive } from "vue";
import { useErrorHandling } from "@/composables/useErrorHandling";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import GuestLayout from "@/views/layouts/GuestLayout.vue";
import Checkbox from "primevue/checkbox";
import InputErrors from "@/components/InputErrors.vue";
import Toast from "primevue/toast";

const toast = useToast();
const authStore = useAuthStore();
const { errors, handleAxiosError, clearErrors, hasNoErrors } = useErrorHandling();

const loginForm = reactive({
    submitting: false,
    data: {
        email: "",
        password: "",
        remember: false,
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
    loginForm.submitting = true;
    authStore
        .login(loginForm.data)
        .catch((error) => {
            handleAxiosError(error);
            if (errors.critical || errors.other) {
                showErrorToast();
            }
        })
        .finally(() => {
            loginForm.submitting = false;
            // TODO
            /* if (hasNoErrors) {
                clearErrors();
            } */
        });
}
</script>

<template>
    <GuestLayout>
        <Toast />
        <div class="surface-card p-4 shadow-1 border-round-lg w-full sm:w-12 md:w-30rem">
            <form @submit.prevent="submit">
                <!-- Email field -->
                <div class="mb-4">
                    <label
                        for="email"
                        class="block mb-2"
                        >Email</label
                    >
                    <InputText
                        required
                        ref="emailInput"
                        id="email"
                        type="email"
                        v-model="loginForm.data.email"
                        class="w-full"
                        :class="errors.validation?.email ? 'p-invalid' : ''"
                        autocomplete="username"
                        autofocus
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.email"
                    />
                </div>

                <!-- Password field -->
                <div class="mb-4">
                    <label
                        for="password"
                        class="block mb-2"
                        >Password</label
                    >
                    <InputText
                        required
                        id="password"
                        type="password"
                        v-model="loginForm.data.password"
                        class="w-full"
                        :class="errors.validation?.password ? 'p-invalid' : ''"
                        autocomplete="current-password"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="errors.validation?.password"
                    />
                </div>

                <!-- Remember Me -->
                <div class="mb-5">
                    <div class="flex align-items-center justify-content-between">
                        <div class="flex align-items-center">
                            <Checkbox
                                id="remember"
                                :binary="true"
                                v-model="loginForm.data.remember"
                                class="mr-2"
                            ></Checkbox>
                            <label for="remember">Remember me</label>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex justify-content-end align-items-center">
                    <!-- TODO forgot password -->
                    <RouterLink
                        :to="{ name: 'register' }"
                        class="mr-3 text-color-secondary hover:text-color"
                        >Don't have an account?</RouterLink
                    >
                    <Button
                        raised
                        type="submit"
                        :loading="loginForm.submitting"
                        label="Log In"
                        severity="contrast"
                    />
                </div>
            </form>
        </div>
        <!-- TODO -->
        <!-- <div class="text-center mt-4">
            <RouterLink
                to="/forgot-pw"
                class="mr-3 text-color-secondary hover:text-color"
            >
            Forgot your password?
            </RouterLink>
        </div> -->
    </GuestLayout>
</template>
