import { connectDB } from "./../../../app/util/database.js";

export default async function handler(req, res) {
    if (req.method == "POST") {
        
        const client = await connectDB;
        const db = client.db("teamproject");


        console.log(res.body);
        
        // let result = await db.collection('list').insertOne(req.body) //insertOne DB에 전송
        return res.status(200).json({"message":"파일 업로드 성공"})
        
        
    }
}