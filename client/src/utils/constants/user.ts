import { Storage } from "storage";

// export const userId = JSON.parse(Storage.getItem("profile") || "null")?.result?._id;
// export const googleId = JSON.parse(Storage.getItem("profile") || "null")?.result?._googleId;
export const userData = JSON.parse(Storage.getItem("profile") || "null");
