<script lang="ts">
  import { sessionStore } from '../../stores'
  import { uploadVCardToWNFS } from '$lib/vcards'

  import vCard from 'vcf'
  let card = new vCard()

  let name = 'Jess Martin'
  let org = 'ACME, Inc'
  let vCardString = ''

  const updateVCard = () => {
    card.set('fn', name)
    card.set('org', org)
    vCardString = card.toString('4.0')
  }

  const saveToIPFS = async () => {
    await uploadVCardToWNFS(card.toString('4.0'))
  }
</script>

<div
  class="min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)] pt-8 md:pt-16 flex flex-col items-start max-w-[690px] m-auto gap-10 pb-5 text-sm"
>
  <h1 class="text-xl">Welcome, {$sessionStore.username}!</h1>

  <div class="max-w-[590px]">
    <div class="mb-4">
      <span class="text-lg mb-4">Name</span>
      <input
        class="input input-bordered focus:outline-none w-full px-3 inline-block"
        type="text"
        name="name"
        bind:value={name}
        on:input={updateVCard}
      />
    </div>
    <!-- html form elements: name, organization, phone number -->
    <div class="mb-4">
      <span class="text-lg mb-4">Organization</span>
      <input
        class="input input-bordered focus:outline-none w-full px-3 inline-block"
        type="text"
        bind:value={org}
        on:input={updateVCard}
        name="organization"
      />
    </div>
    <!-- button to generate vCard -->
    <button class="btn btn-primary mb-4" on:click={saveToIPFS}>
      Save vCard to IPFS
    </button>

    <div class="mb-4">
      <span class="text-lg mb-4">vCard</span>
      <textarea
        class="input input-bordered focus:outline-none w-full h-48 px-3 inline-block"
        name="vcard"
        rows="10"
        bind:value={vCardString}
      />
    </div>
  </div>
</div>
