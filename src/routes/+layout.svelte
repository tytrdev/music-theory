<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    // Configure tailwind
    import "../app.css";

    // Handle theme changes
    import { onMount } from 'svelte';
    import { themeChange } from 'theme-change';
    onMount(() => themeChange(false));
</script>

<div class="flex flex-col items-center text-xl h-screen">
    <slot></slot>
</div>
