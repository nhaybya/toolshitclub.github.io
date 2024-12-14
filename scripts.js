const password = "Nhayydzvcl";
let attemptCount = 0;
let capital = 0;
let currentGame = "Hit.Club 🤖"; // Chỉ có một trò chơi duy nhất

// Lấy các phần tử từ DOM
const screens = {
  login: document.getElementById('login-screen'),
  welcome: document.getElementById('welcome-screen'),
  capital: document.getElementById('capital-screen'),
  menu: document.getElementById('menu-screen'),
  dice: document.getElementById('dice-screen'),
  result: document.getElementById('result-screen'),
  capitalDisplay: document.getElementById('capital-display-screen'),
  success: document.getElementById('success-screen'),
  contact: document.getElementById('contact-screen')
};

const loginButton = document.getElementById('login-button');
const exitButton = document.getElementById('exit-button');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');

const proceedButton = document.getElementById('proceed-button');

const capitalConfirmButton = document.getElementById('capital-confirm-button');
const capitalExitButton = document.getElementById('capital-exit-button');
const capitalInput = document.getElementById('capital-input');
const capitalError = document.getElementById('capital-error');

const gameButtons = document.querySelectorAll('.game-button');
const menuExitButton = document.getElementById('menu-exit-button');

const diceConfirmButton = document.getElementById('dice-confirm-button');
const diceExitButton = document.getElementById('dice-exit-button');
const diceInput = document.getElementById('dice-input');
const diceError = document.getElementById('dice-error');

const resultMessage = document.getElementById('result-message');
const resultKeepButton = document.getElementById('result-keep-button');
const resultBrokeButton = document.getElementById('result-broke-button');

const capitalDisplayMessage = document.getElementById('capital-display-message');
const withdrawButton = document.getElementById('withdraw-button');
const continueButton = document.getElementById('continue-button');
const capitalExitMainButton = document.getElementById('capital-exit-main-button');

const successOkButton = document.getElementById('success-ok-button');

const contactButton = document.getElementById('contact-button');
const retryButton = document.getElementById('retry-button');

const clickSound = document.getElementById('click-sound');

// Hàm phát âm thanh khi nhấn nút
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// Hàm chuyển màn hình
function showScreen(screen) {
  if (!screens[screen]) {
    console.error(`Screen "${screen}" does not exist.`);
    return;
  }

  Object.values(screens).forEach(s => {
    if (s.classList.contains('active')) {
      s.classList.remove('active');
      s.style.animation = 'fadeOut 0.5s forwards';
    }
  });

  setTimeout(() => {
    Object.values(screens).forEach(s => {
      s.style.display = 'none';
      s.style.animation = '';
    });
    screens[screen].style.display = 'block';
    // Chờ hoạt hình fadeIn trước khi thêm class active
    setTimeout(() => {
      screens[screen].classList.add('active');
    }, 50);
  }, 500);
}

// Hàm khởi tạo ứng dụng
function main() {
  // Tránh gọi showScreen('login') khi đã ở màn hình login
  // Nếu muốn khởi tạo lại, hãy reset các màn hình khác
  Object.keys(screens).forEach(key => {
    if (key === 'login') {
      screens[key].classList.add('active');
      screens[key].style.display = 'block';
    } else {
      screens[key].classList.remove('active');
      screens[key].style.display = 'none';
    }
  });
}

// Bắt sự kiện đăng nhập
loginButton.addEventListener('click', () => {
  playClickSound();
  const enteredPassword = passwordInput.value;
  if (enteredPassword === password) {
    passwordInput.value = '';
    loginError.style.display = 'none';
    showScreen('welcome');
  } else {
    attemptCount++;
    if (attemptCount >= 3) { // Sửa lại số lần thử cho hợp lý (ví dụ: 3 lần)
      showScreen('contact');
    } else {
      loginError.textContent = "🔒 KEY không chính xác!";
      loginError.style.display = 'block';
    }
  }
});

exitButton.addEventListener('click', () => {
  playClickSound();
  // Thay thế alert bằng cách đóng tab hiện tại
  window.close();
  // Lưu ý: window.close() chỉ hoạt động nếu cửa sổ/tab được mở bằng JavaScript
  // Nếu bạn muốn chỉ thông báo, bạn có thể giữ alert hoặc đưa ra hướng dẫn khác
  // alert("Thoát ứng dụng."); 
});

// Bắt sự kiện tiếp tục sau khi chào mừng
proceedButton.addEventListener('click', () => {
  playClickSound();
  showScreen('capital');
});

// Bắt sự kiện xác nhận vốn
capitalConfirmButton.addEventListener('click', () => {
  playClickSound();
  const input = capitalInput.value.replace(/[^0-9]/g, '');
  const parsedCapital = parseFloat(input);
  if (!isNaN(parsedCapital) && parsedCapital > 0) {
    capital = parsedCapital;
    capitalInput.value = '';
    capitalError.style.display = 'none';
    showScreen('menu');
  } else {
    capitalError.textContent = "Số tiền không hợp lệ.";
    capitalError.style.display = 'block';
  }
});

capitalExitButton.addEventListener('click', () => {
  playClickSound();
  // Thay thế alert bằng cách đóng tab hiện tại
  window.close();
  // alert("Thoát ứng dụng.");
});

// Bắt sự kiện chọn trò chơi
gameButtons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound();
    currentGame = button.getAttribute('data-game');
    showScreen('dice');
  });
});

// Bắt sự kiện thoát menu
menuExitButton.addEventListener('click', () => {
  playClickSound();
  window.close();
  // alert("Thoát ứng dụng.");
});

// Hàm lấy số tiền cược ngẫu nhiên dựa trên vốn
function getRandomBet() {
  const maxBet = Math.floor(capital * 0.5); // 50% vốn
  if (maxBet < 5) return null; // Vốn tối thiểu để cược

  // Định nghĩa các mức cược dựa trên vốn
  let possibleBets = [];
  if (capital <= 1000) {
    possibleBets = [5, 15, 30];
  } else if (capital <= 3000) { // Sửa điều kiện để phù hợp
    possibleBets = [10, 25, 50];
  } else {
    possibleBets = [12, 28, 38];
  }

  // Lọc các cược không vượt quá maxBet
  const validBets = possibleBets.filter(bet => bet <= maxBet);

  if (validBets.length === 0) return null;

  // Chọn một cược ngẫu nhiên từ validBets
  const randomIndex = Math.floor(Math.random() * validBets.length);
  return validBets[randomIndex];
}

// Bắt sự kiện xác nhận xúc sắc
diceConfirmButton.addEventListener('click', () => {
  playClickSound();
  const input = diceInput.value;
  const numbers = input.split('-').map(num => parseInt(num.trim(), 10));

  // Kiểm tra định dạng và giá trị số
  if (
    numbers.length !== 3 ||
    numbers.some(isNaN) ||
    numbers.some(n => n < 1 || n > 6)
  ) {
    diceError.textContent = "Vui lòng nhập 3 số từ 1 đến 6, cách nhau bằng dấu '-'. Vd: 5-6-1";
    diceError.style.display = 'block';
    setTimeout(() => {
      diceError.style.display = 'none';
    }, 3000);
    return;
  }

  const [num1, num2, num3] = numbers;
  let sum = num1 - num2 + num3;
  let sumParity = (sum % 2 === 0) ? "chẳn" : "lẻ";

  // Kiểm tra xem có hai số giống nhau không
  const counts = {};
  numbers.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
  });
  const hasTwoSame = Object.values(counts).some(count => count === 2);

  if (hasTwoSame) {
    // Đảo ngược parity nếu có hai số giống nhau
    sumParity = (sumParity === "chẳn") ? "lẻ" : "chẳn";
  }

  const resultType = (sumParity === "chẳn") ? "Tài" : "Xỉu";

  // Random hóa tỷ lệ % từ 65 đến 100%
  const percentage = Math.floor(Math.random() * 36) + 65; // 65-100%

  // Lấy số tiền cược ngẫu nhiên
  const betAmount = getRandomBet();
  if (betAmount === null) {
    alert(`Không đủ vốn để đặt cược. Vốn của bạn là ${formatCurrency(capital)}, không thể đặt cược.`);
    return;
  }

  // Hiển thị kết quả theo định dạng "Xỉu 85% 8k" hoặc "Tài 75% 12k"
  const resultFormatted = `${capitalizeFirstLetter(resultType)} ${percentage}% ${betAmount}k`;

  resultMessage.textContent = `Kết quả soi cầu ${currentGame}: ${resultFormatted}`;
  showScreen('result');
  
  // Lưu thông tin kết quả và cược vào dataset
  resultMessage.dataset.betAmount = betAmount;
  resultMessage.dataset.type = resultType;
  resultMessage.dataset.percentage = percentage;
});

diceExitButton.addEventListener('click', () => {
  playClickSound();
  window.close();
  // alert("Thoát ứng dụng.");
});

// Bắt sự kiện lựa chọn "Liếm"
resultKeepButton.addEventListener('click', () => {
  playClickSound();
  const betAmount = parseFloat(resultMessage.dataset.betAmount);
  capital += betAmount;
  showCapital();
});

// Bắt sự kiện lựa chọn "Gãy"
resultBrokeButton.addEventListener('click', () => {
  playClickSound();
  const betAmount = parseFloat(resultMessage.dataset.betAmount);
  capital -= betAmount;
  if (capital < 0) capital = 0;
  checkCapital();
});

// Hàm kiểm tra và hiển thị số tiền còn lại
function checkCapital() {
  if (capital <= 0) {
    capital = 0;
    alert("Đã hết vốn. Nhayy xin lỗi bạn ??");
    showScreen('login');
  } else {
    showCapital();
  }
}

// Hàm hiển thị số tiền còn lại
function showCapital() {
  const formattedCapital = formatCurrency(capital);
  if (capital > 1000) {
    capitalDisplayMessage.innerHTML = `Bạn còn lại: <strong>${formattedCapital}</strong><br>Chúc mừng bạn đã về bờ!`;
    showScreen('capitalDisplay');
  } else {
    capitalDisplayMessage.innerHTML = `Bạn còn lại: <strong>${formattedCapital}</strong>`;
    showScreen('capitalDisplay');
  }
}

// Bắt sự kiện rút tiền
withdrawButton.addEventListener('click', () => {
  playClickSound();
  showScreen('success');
});

// Bắt sự kiện tiếp tục chơi
continueButton.addEventListener('click', () => {
  playClickSound();
  showScreen('dice');
});

// Bắt sự kiện thoát từ màn hình hiển thị số vốn
capitalExitMainButton.addEventListener('click', () => {
  playClickSound();
  window.close();
  // alert("Thoát ứng dụng.");
});

// Bắt sự kiện xác nhận rút tiền thành công
successOkButton.addEventListener('click', () => {
  playClickSound();
  alert("Rút tiền thành công.");
  capital = 0;
  showScreen('login');
});

// Bắt sự kiện liên hệ
contactButton.addEventListener('click', () => {
  playClickSound();
  window.open("https://facebook.com/Nhayydzvcll", "_blank");
});

// Bắt sự kiện thử lại
retryButton.addEventListener('click', () => {
  playClickSound();
  showScreen('login');
});

// Hàm định dạng số tiền
function formatCurrency(amount) {
  if (amount >= 1000000) {
    const million = Math.floor(amount / 1000000);
    const thousand = Math.floor((amount % 1000000) / 1000);
    return `${million}m${thousand > 0 ? thousand + "k" : ''}`;
  }
  return `${Math.floor(amount)}k`;
}

// Hàm để viết hoa chữ cái đầu
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Khởi động chương trình chính
main();
