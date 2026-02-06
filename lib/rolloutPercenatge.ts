import crypto from 'crypto';

export function isInRollout(userId: string, rolloutPercentage: number | any){
    
    if(rolloutPercentage === 100)return true;
    if(rolloutPercentage === 0) return false;
    
    const hash = crypto.createHash('sha256').update(userId).digest("hex");
    const bucket = parseInt(hash.substring(0, 8), 16)%100;
    return bucket < rolloutPercentage;
}