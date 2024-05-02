document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const resultText = document.getElementById("resultText");
  const successMessage = document.getElementById("successMessage");
  const encryptButton = document.getElementById("encryptButton");
  const decryptButton = document.getElementById("decryptButton");
  const secretKeyInput = document.getElementById("secretKeyInput");
  const clearButton = document.getElementById("clearButton");

  function generateRandomIV() {
    return CryptoJS.lib.WordArray.random(16);
  }

  function encrypt(text, secretKey) {
    const iv = generateRandomIV();
    const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
      iv: iv,
    }).toString();
    return `${iv.toString(CryptoJS.enc.Base64)}:${encrypted}`;
  }

  function decrypt(encrypted, secretKey) {
    const parts = encrypted.split(":");
    const iv = CryptoJS.enc.Base64.parse(parts[0]);
    const encryptedText = parts[1];
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey, {
      iv: iv,
    });
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  function clearText() {
    inputText.value = "";
    resultText.value = "";
    secretKeyInput.value = "";
    successMessage.classList.add("hidden");
  }

  encryptButton.addEventListener("click", () => {
    const text = inputText.value.trim();
    const secretKey = secretKeyInput.value.trim();
    if (secretKey !== "") {
      const encrypted = encrypt(text, secretKey);
      resultText.value = encrypted;
      successMessage.classList.add("hidden");
    } else {
      alert("Please enter a secret key.");
    }
  });

  decryptButton.addEventListener("click", () => {
    const text = inputText.value.trim();
    const secretKey = secretKeyInput.value.trim();
    if (secretKey !== "") {
      const decrypted = decrypt(text, secretKey);
      resultText.value = decrypted;
      successMessage.classList.add("hidden");
    } else {
      alert("Please enter a secret key.");
    }
  });
  clearButton.addEventListener("click", clearText);
});
