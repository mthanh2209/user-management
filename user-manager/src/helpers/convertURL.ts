/**
 * Converts a File object to a Data URL asynchronously.
 * @param file - The File object to convert.
 * @returns A Promise that resolves with the Data URL of the file or rejects with an error message.
 */
export const convertToDataURL = (file?: File) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('File is missing');
      return;
    }

    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onloadend = (event) => {
      const imageUrl = event.target?.result;
      if (imageUrl) {
        resolve(imageUrl.toString());
      } else {
        reject('Error converting file to data URL');
      }
    };

    fileReader.onerror = () => {
      reject('Error reading the file');
    };
  });
};
