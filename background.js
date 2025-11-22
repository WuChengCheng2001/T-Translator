chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
        const text = request.text;
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let translatedText = "";
                if (data && data[0]) {
                    data[0].forEach(item => {
                        if (item[0]) translatedText += item[0];
                    });
                }
                sendResponse({ status: "success", translation: translatedText });
            })
            .catch(error => {
                console.error("Translation Error:", error);
                sendResponse({ status: "error", message: "Network Error / 网络请求失败" });
            });
        return true;
    }
});