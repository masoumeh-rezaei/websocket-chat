import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/db";
import type { AuthResponse } from "@/lib/types";

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body as {
            name?: string;
            email?: string;
            password?: string;
        };

        if (!name || !email || !password) {
            return NextResponse.json({ error: "فیلدها ناقص‌اند" }, { status: 400 });
        }

        // check existing
        const existing = await findUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: "ایمیل قبلاً ثبت شده" }, { status: 409 });
        }

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await createUser({ name, email, passwordHash: hash });

        // no token here — we can create token on register or require login.
        const res: AuthResponse = {
            user: { id: user.id, name: user.name, email: user.email },
            token: "", // optionally return a token (see login route)
        };

        return NextResponse.json(res, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}
