export const downloadFilesByALink = async ({
  url,
  name,
}: {
  name?: string | null;
  url: string;
}) => {
  try {
    if (!url) {
      throw new Error("url is null");
    }

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", name || "");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    return Promise.resolve(["success", null]);
  } catch (error) {
    return Promise.resolve([null, error]);
  }
};
