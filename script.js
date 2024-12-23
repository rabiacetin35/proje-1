document.getElementById('readButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        resultDiv.innerText = "Lütfen bir dosya seçin.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
        const imageBase64 = reader.result.split(',')[1];
        resultDiv.innerText = "Resim yükleniyor...";

        // OCR.space API'sine bağlan
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: {
                'apikey': 'YOUR_OCR_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                base64Image: `data:image/png;base64,${imageBase64}`
            })
        });

        const data = await response.json();

        if (data.ParsedResults) {
            resultDiv.innerText = "Etiket Metni: " + data.ParsedResults[0].ParsedText;
        } else {
            resultDiv.innerText = "Metin okunamadı.";
        }
    };

    reader.readAsDataURL(file);
});
