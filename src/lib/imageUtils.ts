// Compresses an uploaded image into a WebP data URL that gets stored
// directly on the Firestore product document (no Firebase Storage /
// Blaze plan needed — same approach already used on Arslan's CMS).
export function compressImageToWebP(file: File, maxWidth = 1000, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Görsel okunamadı.'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Dosya okunamadı.'));
    reader.readAsDataURL(file);
  });
}
