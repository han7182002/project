import { connectDB } from "./../../../app/util/database.js";

export default async function handler(req, res) {
    if (req.method == "POST") {
        if (req.body.title == '') {
            return res.status(500).json('제목을 입력하세요')
        }
        console.log(req.body.formData);
        
        const client = await connectDB;
        const db = client.db("teamproject");

        // 해쉬 처리
        req.body.check = req.body.check.split(',').map(value => value.trim());
         

        let result = await db.collection('list').insertOne(req.body) //insertOne DB에 전송
        return res.status(200).redirect('/join');
        
        
    }
}