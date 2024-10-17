

import { connectDB } from "./../../../app/util/database.js";

export default async function handler(req, res) {
    const client = await connectDB;
    const db = client.db("teamproject");

    if (req.method === 'POST') {
        let result = await db.collection('list').find({ check: props.data.check }).toArray();
        if (result) {
            console.log('result', result);
            
            result.check += 1;
            await result.save();
            return res.status(200).json({ likes: result.check });
        }
        return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(405).json({ message: 'Method not allowed' });
}