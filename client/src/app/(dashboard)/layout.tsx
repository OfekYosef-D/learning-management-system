"use client";
import AppSideBar from "@/components/AppSideBar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathName
  );

  useEffect(() => {
    if (isCoursePage) {
      const match = pathName.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    }
    else {
      setCourseId(null);
    }
  }, [pathName, isCoursePage])

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSideBar />
        <div className="dashboard__content">
          { courseId && <ChaptersSidebar />}
          <div className={cn("dashboard__main",
            isCoursePage && "dashboard__main-not-course"
          )} style={{ height: "100vh" }}>
            <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
