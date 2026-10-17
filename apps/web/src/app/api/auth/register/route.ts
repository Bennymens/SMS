import { NextResponse } from "next/server"
import crypto from "crypto"

// In-memory registered user cache for development when DB connection isn't initialized
const registeredUsers: Array<{
  id: string
  schoolId: string
  schoolName: string
  email: string
  name: string
  phone: string
  role: string
  createdAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { schoolName, adminName, email, phone, password, schoolType } = body

    // 1. Validation
    if (!schoolName || !schoolName.trim()) {
      return NextResponse.json(
        { error: "School name is required." },
        { status: 400 }
      )
    }

    if (!adminName || !adminName.trim()) {
      return NextResponse.json(
        { error: "Administrator name is required." },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid official email address is required." },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      )
    }

    // 2. Check for duplicate email
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      return NextResponse.json(
        { error: "An institution account with this email already exists." },
        { status: 409 }
      )
    }

    // 3. Generate tenant & user identifiers
    const schoolId = `sch_${crypto.randomUUID().slice(0, 8)}`
    const userId = `usr_${crypto.randomUUID().slice(0, 8)}`

    // Hash password using native crypto sha256 + salt
    const salt = crypto.randomBytes(16).toString("hex")
    const passwordHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex")

    const newUser = {
      id: userId,
      schoolId,
      schoolName: schoolName.trim(),
      email: email.trim().toLowerCase(),
      name: adminName.trim(),
      phone: phone ? phone.trim() : "",
      role: "SCHOOL_ADMIN",
      createdAt: new Date().toISOString(),
    }

    registeredUsers.push(newUser)

    // 4. Return success with session metadata
    const response = NextResponse.json(
      {
        success: true,
        message: "School account created successfully.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          schoolId: newUser.schoolId,
          schoolName: newUser.schoolName,
        },
        redirectUrl: "/admin",
      },
      { status: 201 }
    )

    // Set an auth cookie for the new session
    response.cookies.set("sms_auth_session", JSON.stringify({
      userId: newUser.id,
      email: newUser.email,
      role: "SCHOOL_ADMIN",
      schoolId: newUser.schoolId,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (err: any) {
    console.error("Sign up error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred while registering your school. Please try again." },
      { status: 500 }
    )
  }
}
