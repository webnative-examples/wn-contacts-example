import { get as getStore } from 'svelte/store'
import * as wn from 'webnative'

import { accountSettingsStore, filesystemStore } from '$src/stores'
import { addNotification } from '$lib/notifications'

export const uploadVCardToWNFS = async (vcard: string): Promise<void> => {
  try {
    // Set loading: true on the accountSettingsStore
    accountSettingsStore.update(store => ({ ...store, loading: true }))

    const fs = getStore(filesystemStore)

    // Create a sub directory and add the vcard
    await fs.write(
      wn.path.file('public', 'vcards', 'myCard.vcf'),
      new TextEncoder().encode(vcard)
    )

    // Announce the changes to the server
    await fs.publish()

    addNotification(`Your vCard has been added!`, 'success')
  } catch (error) {
    addNotification(error.message, 'error')
    console.error(error)
  }
}
