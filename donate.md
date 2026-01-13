---
layout: default
title: donate
description: send monero if you want
---

<div class="donate-container">
  <div class="donate-content" markdown="1">

## donate

gronka is free. no ads, no tracking, no premium tiers, no paywalled features.

if you use gronka and want to show some appreciation, donations help keep me motivated to add new features and keep things running smooth.

## what donations go toward

- new platform support and features
- keeping the bot online and responsive

## monero only

gronka accepts **monero (xmr)** only. if you don't have any, you can buy from [kraken](https://www.kraken.com/) or swap btc to xmr with [trocador](https://trocador.app/).

  </div>
  <div class="donate-sidebar">
    <div class="donate-card">
      <h3>monero (xmr)</h3>
      <div class="qr-code">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=monero:49CkXdcA9Lh4zAH2M6JcxBehgudsgRmkBboaieSeN1jcREHw1HrqYhw2kSUWtWoWuGYadTH3NZ6By4PpFmf2Hx4JKqnR8br&bgcolor=2a2a2a&color=e0e0e0" alt="XMR QR Code" />
      </div>
      <div class="xmr-address-wrapper">
        <code class="xmr-address" id="xmr-address" data-full="49CkXdcA9Lh4zAH2M6JcxBehgudsgRmkBboaieSeN1jcREHw1HrqYhw2kSUWtWoWuGYadTH3NZ6By4PpFmf2Hx4JKqnR8br">49CkXdcA9Lh4z...4JKqnR8br</code>
        <button class="copy-xmr-btn" onclick="copyXmrAddress()" aria-label="Copy XMR address">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="10" height="10" rx="2" ry="2"></rect><path d="M11 5V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path></svg>
          <span id="copy-text">copy</span>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
function copyXmrAddress() {
  var address = document.getElementById('xmr-address').dataset.full;
  var copyText = document.getElementById('copy-text');
  var btn = document.querySelector('.copy-xmr-btn');

  navigator.clipboard.writeText(address).then(function() {
    copyText.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(function() {
      copyText.textContent = 'copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy:', err);
  });
}
</script>
