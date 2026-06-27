
import {Queue} from "bullmq";
import { connection } from "./radis";

export const analyticsQueue = new Queue("Flagship_Analytics_Events", {
    connection
});

export const addToAnalyticsQueue = async (analyticsData: any)=>{
      try{
        await analyticsQueue.add("Flag_Analytics", JSON.stringify(analyticsData))
      }catch(err){
        console.log("Error Adding to Queue.");
      }
}