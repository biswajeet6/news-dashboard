import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}