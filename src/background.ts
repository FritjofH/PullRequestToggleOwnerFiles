function toggleFilesOwned() {
  let checkbox = document.getElementsByName("owned-by[]");
  if (checkbox.length > 0) {
    var filesChangedElement = document.getElementById("files_tab_counter")
    if (filesChangedElement != null){
      var filesChangedString = filesChangedElement.textContent
      if (filesChangedString != null){
        var filesChanged = parseInt(filesChangedString);
        const onlyOwned = filesChanged > Number(10);
        if (onlyOwned === true){
          if (checkbox.item(0).parentElement != null){
            checkbox.item(0).parentElement?.click()
          }
        }
      }
    }
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab:chrome.tabs.Tab) {
  chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
      if (tab.url != null){
        if (changeInfo.status == 'complete'
        && (tab.url.includes("/pull")
        && tab.url.includes("/files")
        && !tab.url.includes("file-filters"))) {
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: toggleFilesOwned
          });
        }
      }
    }
  })
});

chrome.tabs.onCreated.addListener(function (tab:chrome.tabs.Tab) {
  chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
      if (tab.url != null && tab.id != null){
        if (tab.url.includes("/pull")
        && tab.url.includes("/files")
        && !tab.url.includes("file-filters")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: toggleFilesOwned
          });
        }
      }
    }
  })
});