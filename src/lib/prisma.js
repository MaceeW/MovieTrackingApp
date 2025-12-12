import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = globalThis;

let prisma;

if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
	// Use Turso for production
	const libsql = createClient({
		url: process.env.TURSO_DATABASE_URL,
		authToken: process.env.TURSO_AUTH_TOKEN,
	});
	
	const adapter = new PrismaLibSQL(libsql);
	prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
} else {
	// Fallback to local SQLite for development
	prisma = globalForPrisma.prisma || new PrismaClient();
}

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export { prisma };
export default prisma;
