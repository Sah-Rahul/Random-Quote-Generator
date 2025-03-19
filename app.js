const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const copyButton = document.getElementById("copy-clipboard");
const shareButton = document.getElementById("share-twitter");
const exportButton = document.getElementById("export-quote");
const quoteContainer = document.getElementsByClassName("quote-container")[0];
const bdy = document.querySelector("body");
const heading = document.querySelector("h1");
const Api = " https://api.freeapi.app/api/v1/public/quotes/quote/random";

const fetchquote = async () => {
  try {
    const res = await fetch(Api);
    const data = await res.json();
    const quoteData = data.data;
    const author = data.data.author;
    if (!quoteData) {
      quoteElement.innerHTML = "Loading...";
    } else {
      quoteElement.style.color = "white";
      authorElement.style.color = "white";
      quoteContainer.style.backgroundColor = "transparent";
      heading.style.color = "white";
    }
    const contain = quoteData.content;
    quoteElement.innerHTML = contain;
    authorElement.innerHTML = author;
  } catch (error) {
    console.log(error);
  }
  const randomImages = [
    "https://imgs.search.brave.com/hEDTwiaHPDD8O1O6kiatQE6Xabf3gUf8cFY0oxsvmEk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzUzLzc1LzU5/LzM2MF9GXzM1Mzc1/NTk0NV8zbkRTTG51/MFl1S2taQzBVNXlG/TlRaM0NSREx6MUNK/dS5qcGc",
    "https://imgs.search.brave.com/aQLEt000h9UC0V_21Jcqrr6ZQIbMk2jzeIEdUTI9fRE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/d2Rha2Y5ZHVubnlh/MS5qcGc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9MmMzZDdmZjc4/ZWE5YTMzZTdhYWY1/ZjU1OWQ2Y2Y0ZWZj/MGU3NTllOA",
    "https://imgs.search.brave.com/zGqpZFj8l9R1FDFmHpp30jP23vUlr023i4E29uTZWT4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDg5NzU5/NTMuanBn",
    "https://imgs.search.brave.com/HApzni20TD02s72ItJfjrngaN7dBCAVf6N7CvoCy9iY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDg5NzM3/NDAuanBn",
  ];
  const randomIndex = Math.floor(Math.random() * randomImages.length);
  bdy.style.backgroundSize = "cover";
  bdy.style.backgroundPosition = "center";
  bdy.style.backgroundRepeat = "no-repeat";
  bdy.style.backgroundImage = `url(${randomImages[randomIndex]})`;
};
newQuoteButton.addEventListener("click", fetchquote);

// copy quote to Clipboard
const clipboard = () => {
  const copytext = `${quoteElement.textContent},${authorElement.textContent}`;
  navigator.clipboard
    .writeText(copytext)
    .then(() => alert("Quote copied to clipboard!"))
    .then((error) => console.log(error));
};
copyButton.addEventListener("click", clipboard);

// share on twitter
const shareTwitter = () => {
  const share = `${quoteElement.textContent},${authorElement.textContent}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    share
  )}`;
  window.open(twitterUrl, "_blank");
};
shareButton.addEventListener("click", shareTwitter);

// export quote and background-images
const exportQuote = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 600;

  const quoteText = quoteElement.textContent;
  const authorText = `- ${authorElement.textContent}`;

  const backgroundUrl = bdy.style.backgroundImage.slice(5, -2);

  const background = new Image();
  background.src = backgroundUrl;
  background.crossOrigin = "anonymous";

  background.onload = function () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";
    context.font = "30px Arial";
    context.textAlign = "center";

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
          context.fillText(line, x, y);
          line = words[i] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
    }

    wrapText(context, quoteText, canvas.width / 2, 250, 700, 40);

    context.font = "20px Arial";
    context.fillText(authorText, canvas.width / 2, 450);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "quote.png";
    link.click();
  };
};

exportButton.addEventListener("click", exportQuote);
