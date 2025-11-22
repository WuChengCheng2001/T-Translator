# T-Translate (Full-Featured Web Translator)

**全功能即时网页翻译插件，支持拖动与自定义触发。**
** 我负责写Prompt，具体代码工作全部由Gemini完成 **
** I am responsible for writing the prompts, while all the actual coding work is handled by Gemini. **

## 🌐 Introduction (English)

T-Translate is a lightweight browser extension for Microsoft Edge and Chrome designed for an ergonomic and customizable translation experience.

### ✨ Key Features

1.  **Simple Trigger**: The translation is triggered instantly by selecting text and pressing the **`t` key**.
2.  **Default Placement**: The translation box initially appears in the **bottom-right corner** of the screen (with padding) but remembers its position if the user moves it.
3.  **Free Dragging and Repositioning**: Users can click and drag the translation box anywhere on the screen, allowing them to customize their reading layout and move the box out of the way.
4.  **Unobstructed Global Visibility**: The translation box is guaranteed to appear on top of all webpage elements (fixed headers, sticky sidebars) and is designed to remain visible within the browser viewport.
5.  **Content Optimization**:
    * **Text Limit**: Automatically truncates selections longer than 300 words to ensure rapid response times.
    * **Formula Filter**: Automatically filters out mathematical expressions (e.g., LaTeX syntax) to prevent inaccurate translations.

### 🛠 Installation
1.  Download and unzip the extension folder (e.g., `T-Translate_v7.zip`).
2.  Open **Edge** (or Chrome) and navigate to `edge://extensions` (or `chrome://extensions`).
3.  Enable **Developer mode**.
4.  Click **"Load unpacked"** and select the unzipped folder.

### 🖱️ Usage
1.  **Select** any text on a webpage.
2.  **Press the `t` key** on your keyboard.
3.  The translation appears in the bottom-right corner. Click and drag the box to move it.

---

## 🇨🇳 核心功能 (中文)

### ✨ 核心功能介绍

1.  **触发机制（简洁高效）**：翻译功能由按下键盘上的 **`t` 键** 瞬间触发。
2.  **默认位置**：翻译框默认出现在屏幕的 **右下角**。一旦用户拖动它，插件会记住并保持用户设置的位置。
3.  **自由拖动与移动**：翻译框出现后，用户可以随时用鼠标点击并拖动它，将其移动到屏幕上的任意位置，实现个性化的阅读布局。
4.  **全局最高可见性**：翻译框始终浮动在所有网页元素（包括固定的导航栏和侧边栏）之上，**绝不会被网页上的栏目遮挡**。
5.  **内容优化**：
    * **300词限制**：自动截断超过 300 词的长文本，保证翻译的实时性。
    * **公式过滤**：自动忽略 $E=mc^2$ 等格式的公式，保证译文纯净。

### 🛠 安装教程
1.  下载并解压 `T-Translate_v7.zip` 文件。
2.  打开 Edge 或 Chrome，在地址栏输入 `edge://extensions` 或 `chrome://extensions`。
3.  开启 **“开发人员模式”**。
4.  点击 **“加载解压缩的扩展”** 按钮，选择解压后的文件夹。

### 🖱️ 使用方法
1.  选中网页上的一段英文。
2.  **按下 `t` 键**。
3.  翻译框出现后，点击翻译框的任意位置即可拖动。

