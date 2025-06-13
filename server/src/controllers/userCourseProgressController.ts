import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";
import { calculateOverallProgress } from "../utils/utils";
import { mergeSections } from "../utils/utils";

export const getUserEnrolledCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const auth = getAuth(req);

  if (!auth || auth.userId !== userId) {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  try {
    console.log("Fetching enrolled courses for userId:", userId);
    
    const enrolledCourses = await UserCourseProgress.query("userId")
      .eq(userId)
      .exec();
    
    console.log("Found enrolled courses progress:", enrolledCourses.length);
    
    const courseIds = enrolledCourses.map((item: any) => item.courseId);
    console.log("Course IDs to fetch:", courseIds);

    // Handle case when user has no enrolled courses
    if (courseIds.length === 0) {
      res.json({
        message: "No enrolled courses found",
        data: [],
      });
      return;
    }

    // Filter out any invalid courseIds (null, undefined, empty strings)
    const validCourseIds = courseIds.filter(id => id && typeof id === 'string' && id.trim().length > 0);
    console.log("Valid course IDs:", validCourseIds);

    if (validCourseIds.length === 0) {
      res.json({
        message: "No valid course IDs found",
        data: [],
      });
      return;
    }

    const courses = await Course.batchGet(validCourseIds);
    console.log("Successfully fetched courses:", courses.length);
    
    res.json({
      message: "Enrolled courses retrieved successfully",
      data: courses || [],
    });
  } catch (error) {
    console.error("Error in getUserEnrolledCourses:", error);
    res
      .status(500)
      .json({ 
        message: "Error retrieving enrolled courses", 
        error: error instanceof Error ? error.message : error 
      });
  }
};

export const getUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;

  try {
    const progress = await UserCourseProgress.get({ userId, courseId });
    if (!progress) {
      res
        .status(404)
        .json({ message: "Course progress not found for this user" });
      return;
    }
    res.json({
      message: "Course progress retrieved successfully",
      data: progress,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user course progress", error });
  }
};

export const updateUserCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    let progress = await UserCourseProgress.get({ userId, courseId });

    if (!progress) {
      // If no progress exists, create initial progress
      progress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: progressData.sections || [],
        lastAccessedTimestamp: new Date().toISOString(),
      });
    } else {
      // Merge existing progress with new progress data
      progress.sections = mergeSections(
        progress.sections,
        progressData.sections || []
      );
      progress.lastAccessedTimestamp = new Date().toISOString();
      progress.overallProgress = calculateOverallProgress(progress.sections);
    }

    await progress.save();

    res.json({
      message: "",
      data: progress,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({
      message: "Error updating user course progress",
      error,
    });
  }
};