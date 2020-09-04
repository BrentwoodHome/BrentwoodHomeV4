(function() {
  var cartContainer = document.getElementById("CartContainer");
  var checkout = document.getElementsByClassName('order-summary__section--discount')[0];

  var idme = `<div class="idme-shopify">
    <span class='idme-btn-affinity'>Brentwood Home cares for our heroes. Medical Providers, Military, Nurses, First Responders and Teachers receive $250 off the Oceano, Cedar and Crystal Cove mattresses. <a href="/pages/service-discount" target="_blank">See details</a></span>
    <span class="idme-btn-unify">
      <a href="https://discountify.id.me/oauth/checkpoint/brentwood-home" >
        <img src="https://s3.amazonaws.com/idme/buttons/v4/verify-with-idme.png" alt="ID.me" style="height:37px"/>
      </a>
    </span>
  </div>`;


  checkout && checkout.insertAdjacentHTML("afterend", idme);
})();

