import { CoursesList } from "@/components/console/CoursesList";
import { CoursesSection } from "@/components/console/CoursesConfig/styled";
import { Title } from "@/components/console/AdminConfig/styled";
import { tx } from "@/utils/functions";
import React from "react";

export const CoursesConfig = () => {
  return (
    <CoursesSection>
      <article>
        <div>
          <Title>{tx("Console.Courses.pageCourses")}</Title>
          <hr />
        </div>
      </article>
      <CoursesList></CoursesList>
    </CoursesSection>
  );
};
