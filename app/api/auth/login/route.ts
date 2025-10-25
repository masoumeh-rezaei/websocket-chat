import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "@/lib/db";
import type { AuthResponse } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev_secret_change_me";
const JWT_EXPIRES_IN = "1h"; // یا '15m' برای کوتاه‌تر

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body as { email?: string; password?: string };

        if (!email || !password) {
            return NextResponse.json({ error: "ایمیل و رمز لازم است" }, { status: 400 });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "ایمیل یا رمز اشتباه است" }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: "ایمیل یا رمز اشتباه است" }, { status: 401 });
        }

        const payload = { id: user.id, email: user.email, name: user.name };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const res: AuthResponse = {
            user: { id: user.id, name: user.name, email: user.email },
            token,
        };

        return NextResponse.json(res);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}
