const defaultKey = "Lyr1cjust4nct";
    let lastDecoded = "";

    function rc4(key, data) {
      let s = [], j = 0, x, res = [];
      for (let i = 0; i < 256; i++) s[i] = i;
      for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        [s[i], s[j]] = [s[j], s[i]];
      }
      i = j = 0;
      for (let y = 0; y < data.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        [s[i], s[j]] = [s[j], s[i]];
        x = s[(s[i] + s[j]) % 256];
        res.push(data[y] ^ x);
      }
      return res;
    }

    function hexToBytes(hex) {
      const bytes = [];
      for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
      }
      return bytes;
    }

    function decryptInput() {
      const fileInput = document.getElementById("fileInput");
      const hexInput = document.getElementById("hexInput").value.trim().replace(/\s+/g, '');
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          const hexStr = e.target.result.replace(/\s+/g, '').trim();
          handleHexDecrypt(hexStr);
        };
        reader.readAsText(file);
      } else if (hexInput.length > 0) {
        handleHexDecrypt(hexInput);
      }
    }

    function handleHexDecrypt(hexStr) {
      if (!hexStr || hexStr.length % 2 !== 0) {
        document.getElementById("output").innerText = "????";
        return;
      }
      const data = hexToBytes(hexStr);
      const resultBytes = rc4(defaultKey, data);
      const decoded = new TextDecoder().decode(new Uint8Array(resultBytes));
      lastDecoded = decoded;
      document.getElementById("output").innerText = decoded;
    }

    function downloadResult() {
      if (!lastDecoded) {
        alert("muốn tải cái gì?");
        return;
      }
      const blob = new Blob([lastDecoded], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lyrics.txt";
      a.click();
      URL.revokeObjectURL(url);
      }
const audio = document.getElementById("myAudio");
  const playBtn = document.getElementById("playBtn");
  const progress = document.getElementById("progress");
  const sliderWrapper = document.getElementById("sliderWrapper");

  let isPlaying = false;

  function togglePlay() {
    if (!isPlaying) {
      audio.play();
      sliderWrapper.style.display = "block";
      playBtn.innerText = "⏸";
      isPlaying = true;
    } else {
      audio.pause();
      playBtn.innerText = "▶";
      isPlaying = false;
    }
  }

  // Cập nhật thanh trượt theo thời gian
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // Cho phép tua
  progress.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // Khi nhạc kết thúc
  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.innerText = "▶";
  });
