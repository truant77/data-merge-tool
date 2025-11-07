<form name="PayFastPayNowForm" action="https://payment.payfast.io/eng/process" method="post" target="_blank">
    <input required type="hidden" name="cmd" value="_paynow">
    <input required type="hidden" name="receiver" pattern="[0-9]" value="12862173">
    <input required type="hidden" name="amount" value="79.99">
    <input required type="hidden" name="item_name" maxlength="255" value="DataMerge Pro">
    <input required type="hidden" name="subscription_type" pattern="1" value="1">
    <input required type="hidden" name="recurring_amount" value="79.99">
    <input required type="hidden" name="cycles" pattern="[0-9]" value="0">
    <input required type="hidden" name="frequency" pattern="[0-Next payment in 3]" value="3">

    <button type="submit" class={$$props.class}>
        <slot>Subscribe Now</slot> </button>
</form>

<style>
    /* By default, a form adds extra margins. 
      This 'inline' style makes it behave like a simple button or link.
    */
    form {
        display: inline;
        margin: 0;
        padding: 0;
    }
</style>