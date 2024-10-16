import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://admin:dnstjq13@unseop.be9440o.mongodb.net/'
let connectDB

// 개발중일때 저장하거나 새로고침만 해도 해당 DB를 계속 불러오는데 과데이터 보호를 위해 전에 저장했던 데이터가 변경사항이 없으면 그대로 사용
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}

export { connectDB }