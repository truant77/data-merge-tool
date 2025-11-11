<script>
    import { tick } from 'svelte';

    // This 'open' prop controls visibility
    let { open = false, children } = $props();

    // This lets us bind the dialog element
    let dialog = $state(null);

    // This is a "rune" that watches the 'open' prop
    $effect(() => {
        if (dialog) {
            if (open) {
                dialog.showModal(); // Use the built-in HTML <dialog>
            } else {
                dialog.close();
            }
        }
    });

    // This allows us to close the modal from the inside
    function close() {
        open = false;
    }
</script>

<dialog bind:this={dialog} onclose={() => open = false}>
    {@render children()}
</dialog>

<style>
    dialog {
        border: none;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        min-width: 400px;
        max-width: 90vw;
    }

    /* This is the dark overlay */
    dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>