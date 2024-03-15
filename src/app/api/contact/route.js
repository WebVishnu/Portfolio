import { NextResponse } from "next/server";

// initializeApp();

// const db = getFirestore();

export async function POST(req) {
  const { name, email, mobile, description } = await req.json();
  // const docRef = db.collection("users").doc("queries");
  // const res = await docRef.set({
  //   name,
  //   email,
  //   mobile,
  //   description,
  // });
  return NextResponse.json({ msg: "success" });
}
