// Tạo menu chuột phải
chrome.contextMenus.create({
    id: "openInTelegramApp",
    title: "Open in Telegram App",
    contexts: ["page", "link"],
    documentUrlPatterns: ["https://web.telegram.org/*"]
  });
  
  // Hàm xử lý sự kiện khi người dùng chọn menu ngữ cảnh
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openInTelegramApp") {
      let telegramUrl;
  
      // Kiểm tra xem người dùng nhấp chuột phải trên trang hay liên kết
      if (info.linkUrl) {
        telegramUrl = info.linkUrl;
      } else {
        telegramUrl = tab.url;
      }
  
      // Kiểm tra và xử lý URL của Telegram Web
      if (telegramUrl.includes("web.telegram.org/k/#")) {
        let appUrl;
  
        // Lấy phần định danh (ID số hoặc tên kênh)
        const idPart = telegramUrl.split("#")[1];
  
        // Loại bỏ dấu @ nếu có
        const cleanIdPart = idPart.replace("@", "");
  
        // Tạo URL giao thức tg://resolve
        appUrl = `tg://resolve?domain=${cleanIdPart}`;
  
        // Mở Telegram app với URL đã chuyển đổi
        chrome.tabs.create({ url: appUrl }, () => {
          console.log("Opened in Telegram app: " + appUrl);
        });
      } else {
        console.log("This is not a valid Telegram chat or group URL.");
      }
    }
  });
  