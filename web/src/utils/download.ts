export const downloadFilesByALink = async ({
  url,
  name,
}: {
  name: string;
  url: string;
}) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = blobUrl;

      a.download = name;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(blobUrl);
    })
    .catch(console.error);
};
