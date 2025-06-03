import { clerkMiddleware, createRouteMatcher, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  if (!userId) {
    // User is not authenticated, let them through
    return;
  }

  try {
    // Get the current user object which includes metadata
    const user = await currentUser();
    const userRole = user?.publicMetadata?.userType as "student" | "teacher" || "student";

    console.log("🔍 MIDDLEWARE DEBUG for:", req.nextUrl.pathname);
    console.log("👤 User Role from publicMetadata:", userRole);
    console.log("🎯 Is Teacher Route:", isTeacherRoute(req));
    
    if (isStudentRoute(req)) {
      if (userRole !== "student") {
        console.log("🔄 REDIRECTING: Student route but user is", userRole);
        const url = new URL("/teacher/courses", req.url);
        return NextResponse.redirect(url);
      }
    }

    if (isTeacherRoute(req)) {
      if (userRole !== "teacher") {
        console.log("🔄 REDIRECTING: Teacher route but user is", userRole);
        const url = new URL("/user/courses", req.url);
        return NextResponse.redirect(url);
      }
    }

    console.log("✅ No redirect needed - user is", userRole, "accessing", req.nextUrl.pathname);
  } catch (error) {
    console.error("❌ Error getting user in middleware:", error);
    // If we can't get user data, don't redirect
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};