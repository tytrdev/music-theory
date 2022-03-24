<script>
import Header from "../components/Header.svelte";

</script>
<div>
    <Header />
    <slot></slot>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
