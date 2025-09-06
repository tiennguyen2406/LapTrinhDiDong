function downloadFile(filename: string) {
  console.log(`Starting download: ${filename}...`);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Download finished: ${filename}`);
      resolve();
    }, 3000);
  });
}

downloadFile("example.zip");