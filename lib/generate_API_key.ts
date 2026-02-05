import crypto from "crypto";

export function generateAPIKey(){
    return "flg_" + crypto.randomBytes(16).toString("hex");
}