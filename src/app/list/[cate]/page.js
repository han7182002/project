import { connectDB } from "../../util/database.js";
import ListCompo from "../../component/listcompo.js";

export default async function ListPageServer(props) {
    const client = await connectDB;
    const db = client.db("teamproject");

    let result = await db.collection('list').find({ category: props.params.cate }).toArray();

    result = result.map((a)=>{
        a._id = a._id.toString()
        return a
    })


    const resultWithStringDates = result.map(item => ({
        ...item,
        date: item.date instanceof Date ? item.date.toISOString() : item.date
       
    }));

    return (
        <div>
            <ListCompo data={resultWithStringDates} />
        </div>
    )
}

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())
   
//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }

