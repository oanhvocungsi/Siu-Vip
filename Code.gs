/**
 * SIU ATTENDANCE SYSTEM - BACKEND GOOGLE APPS SCRIPT
 * File: Code.gs
 */

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('SIU VIP - Hệ Thống Điểm Danh')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 1. Hàm xác thực đăng nhập mã lớp & PIN
 * @param {string} classCode Mã lớp học phần
 * @param {string} pin Mã PIN 6 số
 */
function apiLogin(classCode, pin) {
  // Thay thế logic kiểm tra với Google Sheet thực tế của bạn
  // Ví dụ: kiểm tra mã PIN khớp với sheet Cấu hình / Danh sách lớp
  if (!classCode || !pin) {
    throw new Error('Vui lòng nhập đầy đủ mã lớp và mã PIN!');
  }

  // Demo kiểm tra PIN lỗi mẫu
  if (pin === '000000') {
    throw new Error('Mã PIN không đúng, vui lòng kiểm tra lại!');
  }

  // Lấy danh sách sinh viên từ Google Sheet
  // const ss = SpreadsheetApp.getActiveSpreadsheet();
  // const sheet = ss.getSheetByName(classCode);
  
  return {
    ok: true,
    cls: classCode,
    students: [
      { mssv: '21010001', name: 'Nguyễn Văn An' },
      { mssv: '21010002', name: 'Trần Thị Bích' },
      { mssv: '21010003', name: 'Lê Hoàng Cường' },
      { mssv: '21010004', name: 'Phạm Đức Duy' },
      { mssv: '21010005', name: 'Vũ Ngọc Hân' },
      { mssv: '21010006', name: 'Đặng Minh Khôi' },
      { mssv: '21010007', name: 'Bùi Gia Linh' },
      { mssv: '21010008', name: 'Hoàng Nhật Nam' }
    ]
  };
}

/**
 * 2. Hàm lưu dữ liệu điểm danh vào Google Sheet
 * @param {Object} payload Dữ liệu buổi học và danh sách vắng
 */
function apiSubmit(payload) {
  try {
    // const ss = SpreadsheetApp.getActiveSpreadsheet();
    // const sheet = ss.getSheetByName('DiemDanh');
    // Ghi dữ liệu payload.absent vào sheet...
    Logger.log('Received attendance payload: ' + JSON.stringify(payload));
    return { ok: true, message: 'Lưu điểm danh thành công' };
  } catch (error) {
    throw new Error('Không thể ghi vào Google Sheet: ' + error.message);
  }
}

/**
 * 3. Hàm phản ánh sai sót danh sách sinh viên
 * @param {string} classCode Mã lớp
 * @param {string} note Nội dung phản ánh
 */
function apiReportWrong(classCode, note) {
  Logger.log('Report error for class ' + classCode + ': ' + note);
  return { ok: true };
}
