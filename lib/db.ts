import fs from "fs/promises";
import path from "path";
import { User } from "./types";
import { randomUUID } from "crypto";

const DB_FILE = path.resolve(process.cwd(), "data", "db.json");

// Ensure data folder & file
async function ensureDbFile() {
    const dir = path.dirname(DB_FILE);
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch {}
    try {
        await fs.access(DB_FILE);
    } catch {
        // initialize with empty users array
        await fs.writeFile(DB_FILE, JSON.stringify({ users: [] }, null, 2), "utf-8");
    }
}

type DbShape = {
    users: User[];
};

async function readDb(): Promise<DbShape> {
    await ensureDbFile();
    const raw = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(raw) as DbShape;
}

async function writeDb(db: DbShape): Promise<void> {
    await ensureDbFile();
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

/**
 * Public helpers
 */
export async function findUserByEmail(email: string): Promise<User | undefined> {
    const db = await readDb();
    return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser({
                                     name,
                                     email,
                                     passwordHash,
                                 }: {
    name: string;
    email: string;
    passwordHash: string;
}): Promise<User> {
    const db = await readDb();

    // simple uniqueness check
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    const user: User = {
        id: randomUUID(),
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    await writeDb(db);
    return user;
}
