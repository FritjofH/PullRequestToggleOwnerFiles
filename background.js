function toggleFilesOwned() {
    let checkbox = document.getElementsByName("owned-by[]");
    if (checkbox.length > 0) {
        var filesChanged = parseInt(document.getElementById("files_tab_counter").textContent);
        const onlyOwned = filesChanged > Number(10);
        if (onlyOwned === true){
            checkbox.item(0).parentNode.click();
        }
    }
}

chrome.action.onClicked.addListener((tab) => {
    if(tab.url.includes("https://github.com/") 
    && tab.url.includes("/pull/")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: toggleFilesOwned
      });
    }
});