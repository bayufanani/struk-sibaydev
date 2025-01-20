let canvas = document.getElementById("struk");
let ctx = canvas.getContext("2d");
canvas.height = 500;

document.addEventListener("DOMContentLoaded", () => {
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "18px Lucida Console";
    ctx.textAlign = "left";
    ctx.fillText("Erba Cell", 10, 50);

    //current date
    ctx.font = "14px Lucida Console";
    let date = new Date();
    ctx.fillText(date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear() + " " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0"), 10, 70);
    requestAnimationFrame(draw);

    ctx.font = "20px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillText("STRUK PEMBELIAN", canvas.width / 2, 120);

    ctx.font = "16px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillText("PULSA", canvas.width / 2, 140);

    ctx.textAlign = "left";
    ctx.fillText("ID TRX    : 123456789", 10, 170);
    ctx.fillText("PRODUK    : Pulsa 10 pulsa", 10, 200);
    ctx.fillText("NO. HP    : 082323232", 10, 230);
    ctx.fillText("HARGA     : Rp. 21.000", 10, 260);

    ctx.textAlign = "center";
    ctx.fillText("*Serial Number*", canvas.width / 2, 300);
    ctx.fillText("12312231313123123131312", canvas.width / 2, 320);

    // ctx.fillText("=== Terimakasih ===", canvas.width / 2, 360);
    // ctx.fillText("Butuh pulsa, token, top up game, top up e-money, transfer, dll. Hubungi No. HP : 082132148757", canvas.width / 2, 380, 400);

    let wrappedText = wrapText(ctx, "Butuh pulsa, token, top up game, top up e-money, transfer, dll. Hubungi No. HP : 082132148757", canvas.width / 2, 380, 270, 20);
    // wrappedTe
    wrappedText.forEach(function (item) {
        // item[0] is the text
        // item[1] is the x coordinate to fill the text at
        // item[2] is the y coordinate to fill the text at
        ctx.fillText(item[0], item[1], item[2]);
    })
}

async function share() {
    const dataUrl = canvas.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'struk.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}

const wrapText = function (ctx, text, x, y, maxWidth, lineHeight) {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for (var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if (n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
}