import fs from "node:fs";

const unlinkFile = (path, retries = 3, delay = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const attempt = () => {
      fs.unlink(path, (err) => {
        if (err) {
          if (err.code === "EBUSY" && retries > 0) {
            setTimeout(() => {
              attempt();
            }, delay);
          } else {
            reject(err);
          }
        } else {
          resolve();
        }
      });
    };
    attempt();
  });
};

export const tryUnlinkFile = (path: string) => {
  try {
    if (fs.existsSync(path)) {
      if (fs.lstatSync(path).isFile()) {
        unlinkFile(path);
      }
    }
  } catch (error) {
    // Handle potential errors (e.g., file not found)
    console.log(`Failed to delete file at ${path}`);
    console.error(error);
  }
};
