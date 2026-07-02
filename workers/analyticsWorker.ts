import "dotenv/config";

import { Worker } from "bullmq";
import { connection } from "@/lib/radis";
import updateFlagMetrices from "@/utils/flagMetrices";

const worker = new Worker("Flagship_Analytics_Events", async(job)=>{
      const body = job.data;
      try{
          const flagInfo = await JSON.parse(body);
          await updateFlagMetrices(flagInfo);
          console.log("Inserted Successfully ✅", job.id);
      }catch(err){
         console.log("Error while inserting metrices", err);
      }

}, 
 {
    connection,
    concurrency: 5,
  }
);


worker.on("completed", (job)=>{
    console.log(`Job: ${job.id} completed`);    
});

worker.on("failed", (job,err)=>{
    console.log(`Failled to Complete: `, err);
})