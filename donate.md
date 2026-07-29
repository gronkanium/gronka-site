---
layout: default
title: donate
description: gronka is free and stays free. if it has saved you some hassle you can send a little monero — optional, no perks, no strings.
permalink: /donate/
---

# donate

gronka is free. no ads, no tracking, no premium tier, nothing locked behind a paywall — and that holds whether anyone donates or not.

if the bot has saved you some hassle and you feel like throwing something back, monero is the way to do it. it's optional, it buys you nothing, and it doesn't put you on a list anywhere.

<div class="donate-card">
  <div class="donate-qr">
    {%- include xmr-qr.svg -%}
  </div>
  <div class="donate-fields">
    <p class="donate-label">monero (xmr)</p>
    <code class="xmr-address" id="xmr-address">{{ site.monero_address }}</code>
    <div class="donate-actions">
      <button type="button" class="donate-btn donate-btn-primary" id="copy-xmr" hidden>copy address</button>
      <a class="donate-btn donate-btn-secondary" href="monero:{{ site.monero_address }}">open in wallet</a>
    </div>
    <p class="donate-status" id="copy-status" role="status" aria-live="polite"></p>
  </div>
</div>

<p class="donate-verify">
  scan the code, or copy the address and check it against
  <a href="https://github.com/thedorekaczynski/gronka-site/blob/main/_config.yml">the copy in this site's source</a>
  before sending anything.
</p>

## where it goes

donations mostly keep me interested in maintaining this thing. concretely:

- **keeping it online** — the server the bot runs on, and the bandwidth it chews through
- **new platforms** — adding sources to [`/download`](/commands/download/) as people ask for them
- **keeping downloads working** — sites change how they serve video constantly, and every break needs a fix

## no monero yet?

1. buy some on an exchange that lists it — [kraken](https://www.kraken.com/) is the usual pick
2. or swap coins you already hold using [trocador](https://trocador.app/), which doesn't need an account
3. send it to the address above, then close the tab and forget about it

any amount is fine. there's no minimum, and no tier that unlocks anything.

## why monero only

it settles in minutes, the fees are cents rather than dollars, and it doesn't need a payment processor in the middle collecting names and card numbers. for what is essentially a tip jar, that felt like the wrong trade.

worth saying plainly: crypto payments are one-way. there is no refund button and i can't reverse a mistake, so check the address before you hit send.

## other ways to help

plenty of people would rather not send money, which is completely fine. these are worth just as much:

- [**star the repo**](https://github.com/thedorekaczynski/gronka) — it's most of how anyone finds the bot
- [**add gronka to a server**]({{ site.discord_invite }}){: #invite-donate .cta-invite} — actually using it is the point
- [**open an issue**](https://github.com/thedorekaczynski/gronka/issues) — bug reports and "please support this site" requests both help

<script>
  (function () {
    var button = document.getElementById('copy-xmr');
    var address = document.getElementById('xmr-address');
    var status = document.getElementById('copy-status');

    // The button ships hidden and is only revealed here, so a browser without the
    // clipboard API never shows a control that cannot work. The address itself is
    // always in the page, selectable, with no JS involved.
    if (!button || !address || !status || !navigator.clipboard) {
      return;
    }

    button.hidden = false;
    var resetTimer;

    button.addEventListener('click', function () {
      // Read the address off the rendered element rather than a second copy of it, so
      // what lands on the clipboard is always what the visitor can see and verify.
      navigator.clipboard
        .writeText(address.textContent.trim())
        .then(function () {
          button.textContent = 'copied';
          button.classList.add('is-copied');
          status.classList.remove('has-error');
          status.textContent = 'monero address copied to clipboard';

          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            button.textContent = 'copy address';
            button.classList.remove('is-copied');
            status.textContent = '';
          }, 2000);
        })
        .catch(function () {
          // Left on screen rather than timed out: the visitor has to act on it.
          clearTimeout(resetTimer);
          status.classList.add('has-error');
          status.textContent = 'copy failed — select the address above and copy it manually';
        });
    });
  })();
</script>
