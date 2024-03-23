<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted, onUnmounted, watchEffect, computed } from "vue";
import { RouterLink } from "vue-router";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import OuterLayoutContainer from "@/components/OuterLayoutContainer.vue";
import ApplicationLogo from "@/components/ApplicationLogo.vue";
import ThemeToggleButton from "@/components/ThemeToggleButton.vue";
import Button from "primevue/button";

const authStore = useAuthStore();

const mainMenuItems = [
    {
        label: "Home",
        route: { name: "home" },
    },
    {
        label: "Dashboard",
        route: { name: "dashboard" },
    },
];
const userMenuItems = [
    {
        label: "Profile",
        route: { name: "profile" },
        icon: "pi pi-fw pi-user",
    },
    {
        label: "Log Out",
        callFunction: () => authStore.logout(),
        icon: "pi pi-fw pi-sign-out",
    },
];
const mobileMenuItems = [
    {
        label: "Dashboard",
        route: { name: "dashboard" },
        icon: "pi pi-fw pi-home",
    },
    {
        label: "Profile",
        route: { name: "profile" },
        icon: "pi pi-fw pi-user",
    },
    /* {
        label: "Log Out",
        callFunction: () => logout(),
        icon: "pi pi-fw pi-sign-out",
    }, */
];

const menu = ref(null);
const mobileMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

function toggleUserMenu(event) {
    menu.value.toggle(event);
}
const updateWidth = () => {
    windowWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
});
// Watch for windowWidth changes to close sidebar on larger screens if it was opened on mobile
watchEffect(() => {
    if (windowWidth.value > 992) {
        mobileMenuOpen.value = false;
    }
});
</script>

<template>
    <div>
        <header>
            <div class="border-bottom-1 surface-border surface-overlay">
                <OuterLayoutContainer class="pb-0">
                    <Menubar
                        :model="mainMenuItems"
                        class="border-noround border-none surface-overlay px-0"
                    >
                        <template #start>
                            <RouterLink
                                :to="{ name: 'home' }"
                                class="mr-3 h-0"
                            >
                                <ApplicationLogo class="h-3rem w-auto pt-1 surface-svg-fill" />
                            </RouterLink>
                        </template>
                        <template #item="{ item, props, hasSubmenu, root }">
                            <RouterLink
                                v-if="item.route"
                                :to="item.route"
                                class="p-menuitem-link"
                            >
                                <span
                                    v-show="item.icon"
                                    :class="[item.icon, 'mr-2']"
                                />
                                <span>{{ item.label }}</span>
                            </RouterLink>
                            <a
                                v-else
                                :href="item.url"
                                :target="item.target"
                                v-bind="props.action"
                            >
                                <span
                                    v-show="item.icon"
                                    :class="[item.icon, 'mr-2']"
                                />
                                <span>{{ item.label }}</span>
                                <span
                                    v-if="hasSubmenu"
                                    class="pi pi-fw pi-angle-down ml-2"
                                />
                            </a>
                        </template>
                        <template #end>
                            <div class="flex">
                                <ThemeToggleButton
                                    plain
                                    text
                                    class="inline-flex"
                                />
                                <div class="hidden sm:hidden md:hidden lg:flex">
                                    <Menu
                                        :model="userMenuItems"
                                        popup
                                        ref="menu"
                                        class="shadow-1 border-1 surface-border"
                                    >
                                        <template #item="{ item, props }">
                                            <li
                                                v-if="!item.route && item.callFunction"
                                                class="p-menuitem-link"
                                                @click="item.callFunction"
                                            >
                                                <span
                                                    v-show="item.icon"
                                                    :class="[item.icon, 'mr-2']"
                                                />
                                                <span>{{ item.label }}</span>
                                            </li>
                                            <li
                                                v-else
                                                class="p-menuitem"
                                            >
                                                <RouterLink
                                                    :to="item.route"
                                                    class="p-menuitem-link"
                                                >
                                                    <span
                                                        v-show="item.icon"
                                                        :class="[item.icon, 'mr-2']"
                                                    />
                                                    <span>{{ item.label }}</span>
                                                </RouterLink>
                                            </li>
                                        </template>
                                    </Menu>
                                    <Button
                                        v-if="authStore.user"
                                        plain
                                        text
                                        class="p-menuitem-text inline-flex"
                                        @click="toggleUserMenu($event)"
                                    >
                                        <span class="">{{ authStore.user.name }}</span>
                                        <i class="pi pi-angle-down ml-2"></i>
                                    </Button>
                                </div>
                                <Button
                                    plain
                                    text
                                    class="flex sm:flex lg:hidden xl:hidden"
                                    icon="pi pi-bars"
                                    @click="mobileMenuOpen = true"
                                />
                            </div>
                        </template>
                    </Menubar>
                </OuterLayoutContainer>
            </div>
            <!-- Mobile sidebar menu -->
            <!-- TODO: improve -->
            <Sidebar
                v-model:visible="mobileMenuOpen"
                header="Menu"
                position="right"
            >
                <ul class="list-none m-0 p-0">
                    <template
                        v-for="(item, index) in mobileMenuItems"
                        :key="index"
                    >
                        <li>
                            <RouterLink
                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-underline"
                                v-if="item.route"
                                :to="item.route"
                            >
                                <span
                                    v-show="item.icon"
                                    :class="[item.icon, 'mr-2']"
                                />
                                <span>{{ item.label }}</span>
                            </RouterLink>
                            <!-- <a
                                v-else
                                :href="item.url"
                                :target="item.target"
                                v-bind="props.action"
                            >
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                                <span
                                    v-if="hasSubmenu"
                                    class="pi pi-fw pi-angle-down ml-2"
                                />
                            </a> -->
                        </li>
                    </template>
                    <li
                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors no-underline"
                        @click="authStore.logout()"
                    >
                        <span class="pi pi-fw pi-sign-out mr-2" />
                        <span>Logout</span>
                    </li>
                </ul>
            </Sidebar>
        </header>
        <main>
            <slot name="header" />
            <OuterLayoutContainer :spaced-mobile="false">
                <slot />
            </OuterLayoutContainer>
        </main>
    </div>
</template>

<style scoped>
@media screen and (max-width: 992px) {
    :deep(.p-menubar .p-menubar-button) {
        display: none;
    }
}
</style>
