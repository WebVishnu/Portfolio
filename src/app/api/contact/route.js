import { NextResponse } from "next/server";

// initializeApp();

// const db = getFirestore();

export async function POST(req) {
  try {
    const { name, email, mobile, description } = await req.json();

    // Validation
    if (!name || !email || !mobile || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Basic phone validation (at least 10 digits)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(mobile)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // TODO: Save to database
    // const docRef = db.collection("users").doc("queries");
    // const res = await docRef.set({
    //   name,
    //   email,
    //   mobile,
    //   description,
    // });

    return NextResponse.json({ msg: "success" });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
