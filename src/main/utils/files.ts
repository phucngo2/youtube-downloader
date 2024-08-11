import fs from "node:fs";

const unlinkFile = (path: string, retries = 3, delay = 300) => {
  return new Promise<void>((resolve, reject) => {
    const attempt = (remainingRetries: number) => {
      fs.unlink(path, (err) => {
        if (err) {
          if (err.code === "EBUSY" && remainingRetries > 0) {
            console.log("a");
            setTimeout(() => {
              attempt(remainingRetries - 1);
            }, delay);
          } else {
            reject(err);
          }
        } else {
          resolve();
        }
      });
    };
    attempt(retries);
  });
};

export const tryUnlinkFile = async (path: string) => {
  try {
    if (fs.existsSync(path)) {
      if (fs.lstatSync(path).isFile()) {
        await unlinkFile(path);
      }
    }
  } catch (error) {
    // Handle potential errors (e.g., file not found)
    console.error(`Failed to delete file at ${path}`);
    console.error(error);
  }
};
