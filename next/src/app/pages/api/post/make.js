import { connectDB } from "./../../../app/util/database.js";

export default async function handler(요청, 응답) {
    if (요청.method == "POST") {
        if (요청.body.title == '') {
            return 응답.status(500).json('제목쓰셈')
        }
        const client = await connectDB;
        const db = client.db("behind")
        let result = await db.collection('ask').insertOne(요청.body) //insertOne DB에 전송
        return 응답.status(200).redirect('/')
        
        
    }
}