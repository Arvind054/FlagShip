import dotenv from "dotenv";

import {Queue} from "bullmq";
import { connection } from "./radis";
dotenv.config();

export const analyticsQueue = new Queue("Flagship_Analytics_Events", {
    connection
});

export const addToAnalyticsQueue = async (analyticsData: any)=>{
  try{
    await analyticsQueue.add("Flag_Analytics", JSON.stringify(analyticsData));
    console.log("Job Added to queue ✅");
      }catch(err){
        console.log("Error Adding to Queue.", err);
      }
}