import { MongoClient, ServerApiVersion } from "mongodb"

// Connection URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/synaptiq"

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// Connection promise
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect()
}

export async function getDb() {
  const client = await clientPromise
  return client.db("synaptiq")
}

export async function getCollection(name: string) {
  const db = await getDb()
  return db.collection(name)
}

export default clientPromise
