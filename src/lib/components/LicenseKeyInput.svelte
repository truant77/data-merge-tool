<script>
    import { tick } from 'svelte';
    
    // --- PROPS ---
    // We'll pass in these two functions from our app page
    let { onsuccess, oncancel } = $props();

    // --- STATE ---
    let licenseKey = $state(''); // Binds to the input field
    let status = $state(''); // Shows 'Loading...', 'Invalid key', etc.
    let isLoading = $state(false);

    /**
     * This is the main function. It calls our backend.
     */
    async function activateKey() {
        if (isLoading) return; // Prevent double-clicks
        isLoading = true;
        status = 'Verifying License Key...';

        try {
            // This is the "API endpoint" for our future Netlify Function.
            const response = await fetch('/.netlify/functions/validate-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: licenseKey })
            });

            const result = await response.json();

            if (response.status === 200 && result.valid === true) {
                // --- SUCCESS ---
                status = 'Success! Your Pro pass is now active.';
                
                // Save the key to the browser's long-term memory
                localStorage.setItem('vennaro_license_key', licenseKey);
                
                // Tell the main app page that we are now a Pro user
                onsuccess();
                
                // Wait 2 seconds, then close the modal
                await tick();
                setTimeout(oncancel, 2000); // oncancel() closes the modal

            } else {
                // --- FAILURE (Key is not valid) ---
                status = result.error || 'This license key is not valid. Please check and try again.';
                isLoading = false;
            }

        } catch (error) {
            // --- FAILURE (Network error, etc.) ---
            console.error("Error validating key:", error);
            status = 'An error occurred. Please check your internet and try again.';
            isLoading = false;
        }
    }
</script>

<form onsubmit={(event) => {
    event.preventDefault();
    activateKey();
}} class="license-form">
    <h3>Activate Your Pro Pass</h3>
    <p>Please enter the license key you received via email to unlock your Pro features.</p>

    <input 
        type="text" 
        placeholder="PRO-XXXX-XXXX-XXXX" 
        bind:value={licenseKey}
        disabled={isLoading}
        required
    />

    <div class="actions">
        <button 
            type="button" 
            class="button-secondary" 
            onclick={oncancel}
            disabled={isLoading}
        >
            Cancel
        </button>
        <button 
            type="submit" 
            class="button-primary"
            disabled={isLoading || licenseKey.length < 5}
        >
            {#if isLoading}
                Checking...
            {:else}
                Activate
            {/if}
        </button>
    </div>

    {#if status}
        <p class="status {status.startsWith('Success') ? 'success' : 'error'}">
            {status}
        </p>
    {/if}
</form>

<style>
    .license-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h3 {
        margin: 0;
        text-align: center;
    }
    p {
        margin: 0;
        text-align: center;
        font-size: 0.9rem;
    }
    input {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        text-align: center;
        font-family: monospace;
    }
    .actions {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 0.75rem;
        margin-top: 0.5rem;
    }
    
    /* --- Base button styles --- */
    .button-primary, .button-secondary {
        font-size: 1rem;
        font-weight: 600;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s ease, opacity 0.2s ease;
    }
    
    .button-primary {
        background-color: #3498db;
        color: white;
    }
    .button-primary:hover {
        background-color: #2980b9;
    }
    
    .button-secondary {
        background-color: #ecf0f1;
        color: #34495e;
        border: 1px solid #bdc3c7;
    }
    .button-secondary:hover {
        background-color: #e2e6e8;
    }

    /* Disabled state for all buttons */
    :global(button:disabled) {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* --- Status messages --- */
    .status {
        text-align: center;
        font-weight: 600;
        padding: 0.75rem;
        border-radius: 6px;
    }
    .error {
        background-color: #fbebee;
        color: #c0392b;
    }
    .success {
        background-color: #e8f5e9;
        color: #217346;
    }
</style>