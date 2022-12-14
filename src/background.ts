function toggleFilesOwned() {
  const maxFilesChanged = Number(10);
  const maxRowsChanged = Number(150);

  let checkbox = document.getElementsByName("owned-by[]");
  var filesChangedElement = document.getElementById("files_tab_counter");
  var alreadyClicked = false;

  var filesChangedString = filesChangedElement?.textContent;
  if (filesChangedString != null){
    var filesChanged = parseInt(filesChangedString);
    const onlyOwned = filesChanged > maxFilesChanged;
    if (onlyOwned === true){
      checkbox.item(0).parentElement?.click();
      alreadyClicked = true;
    }
  }

  let additions = document.getElementById("diffstat")?.children.item(0);
  let removals = document.getElementById("diffstat")?.children.item(1);
  if (alreadyClicked === false
    && additions?.textContent != null
    && removals?.textContent != null) {
    var numOfAdditions = parseInt(additions.textContent.trim().replace('+', ''))
    var numOfRemovals = parseInt(removals.textContent.trim().replace('−', ''))

    if (numOfAdditions + numOfRemovals > maxRowsChanged){
      checkbox.item(0).parentElement?.click();
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