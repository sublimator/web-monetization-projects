import { WextApi } from '../types/wextApi'

export function openTab(api: WextApi, url: string) {
  api.tabs.query({ currentWindow: true }, tabs => {
    const existingTab = tabs.find(el => {
      return el.url === url
    })

    if (existingTab == null) {
      api.tabs.create({ url })
    } else if (existingTab.id != null) {
      api.tabs.get(existingTab.id, tab => {
        api.tabs.highlight({ tabs: tab.index })
      })
    }
  })
}
