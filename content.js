
// --- 拖动功能全局变量 ---
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let draggablePopup = null; 
const PADDING = 20;

// 拖动逻辑：鼠标移动时更新位置
document.addEventListener('mousemove', (e) => {
    if (!isDragging || !draggablePopup) return;
    
    draggablePopup.style.left = (e.clientX - dragOffsetX) + 'px';
    draggablePopup.style.top = (e.clientY - dragOffsetY) + 'px';
    e.preventDefault(); 
});

// 拖动逻辑：鼠标释放时停止
document.addEventListener('mouseup', () => {
    if (isDragging && draggablePopup) {
        isDragging = false;
        draggablePopup.style.cursor = 'grab';
    }
});
// -----------------------


// 监听 't' 键按下事件
document.addEventListener('keydown', (e) => {
    // 触发条件：按下 't' 键，且没有按 Ctrl 或 Meta 键 (防止输入法或系统快捷键冲突)
    if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey) {
        const selection = window.getSelection();
        let rawText = selection.toString().trim();

        if (!rawText) return;

        e.preventDefault(); // 阻止浏览器默认行为（如果有的话）

        // --- 翻译和定位逻辑 ---
        
        // 300词截断
        const words = rawText.split(/\s+/);
        if (words.length > 300) {
            rawText = words.slice(0, 300).join(" ") + " ......";
        }

        // 公式过滤
        let processedText = processTextForTranslation(rawText);
        
        // 默认位置是右下角，但如果弹窗已被拖动，则保留当前位置
        const useCurrentPosition = document.getElementById('t-translate-popup') !== null;
        
        showPopup("Translating... / 翻译中...", useCurrentPosition, true);

        chrome.runtime.sendMessage({ action: "translate", text: processedText }, (response) => {
            if (response && response.status === "success") {
                showPopup(response.translation, useCurrentPosition, false); 
            } else {
                showPopup("❌ " + (response ? response.message : "Error"), useCurrentPosition, false);
            }
        });
    }
});


// 点击任意处关闭弹窗
document.addEventListener('mousedown', (e) => {
    const popup = document.getElementById('t-translate-popup');
    if (!isDragging && popup && !popup.contains(e.target)) {
        popup.remove();
        draggablePopup = null;
    }
});

function processTextForTranslation(text) {
    let cleanText = text.replace(/\$.*?\$/g, "···");
    cleanText = cleanText.replace(/[=<>+\-*/^]{2,}/g, "···");
    return cleanText;
}

// 接收一个布尔值 useCurrentPosition 来决定是固定到右下角还是保持原位
function showPopup(content, useCurrentPosition, isLoading) {
    const oldPopup = document.getElementById('t-translate-popup');
    
    // 如果存在旧弹窗且要求保持当前位置，则记录位置
    let initialTop = oldPopup ? oldPopup.style.top : null;
    let initialLeft = oldPopup ? oldPopup.style.left : null;
    
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement('div');
    popup.id = 't-translate-popup';
    popup.innerText = content;
    
    if (isLoading) popup.style.color = "#aaa";

    popup.style.opacity = "0"; 
    document.body.appendChild(popup);
    
    // --- 注册拖动监听器 ---
    popup.addEventListener('mousedown', (e) => {
        isDragging = true;
        draggablePopup = popup;
        dragOffsetX = e.clientX - popup.offsetLeft;
        dragOffsetY = e.clientY - popup.offsetTop;
        popup.style.cursor = 'grabbing';
        e.preventDefault(); 
        e.stopPropagation();
    });
    // -----------------------
    
    const popupRect = popup.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // --- 定位逻辑 ---
    if (useCurrentPosition && initialTop && initialLeft) {
        // 如果已拖动过，则保持原位
        popup.style.top = initialTop;
        popup.style.left = initialLeft;
    } else {
        // 默认定位到右下角
        let targetLeft = viewportWidth - popupRect.width - PADDING;
        let targetTop = viewportHeight - popupRect.height - PADDING;

        popup.style.left = targetLeft + 'px';
        popup.style.top = targetTop + 'px';
    }

    popup.style.opacity = "1"; 
    popup.style.cursor = 'grab';
}