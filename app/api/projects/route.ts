import { auth } from "@/lib/auth";
import { generateAPIKey } from "@/lib/generate_API_key";
import { db } from "@/src/DB";
import { projects, user } from "@/src/DB/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
   try{

     const {name} = await req.json();
     if(!name){
          return NextResponse.json({ error: "Project Name Not Found" }, { status: 404 });
     }
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [userData] = await db
        .select()
        .from(user)
        .where(eq(user.id, session.user.id))
        .limit(1);
    if (!userData || !userData.email) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
      const apiKey = generateAPIKey();
      const project = await db.insert(projects).values({name, userId: userData?.id,apiKey}).returning();
      return NextResponse.json(project, {status:201});
     
   }catch(err){
    return NextResponse.json({error: "Failed to Create Project"},{status:500});
   }
}