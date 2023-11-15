import { IconButton, Tooltip } from "@mui/material";
import { createContext, useState } from "react";
import {
  InputCourse,
  UlCourses
} from "@/components/console/CoursesList/styled";
import ApiSpaum from "@/services/spaum";
import {
  callToast,
  equalsNullOrUndefined,
  isEmpty,
  isNotEmpty,
  tx
} from "@/utils/functions";
import { useQuery } from "react-query";
import { MultiTagsDefault } from "@/components/MultiTagsDeafult";
import Image from "next/image";
import { BehaviorSubject } from "rxjs";
import BasicModal from "@/components/BasicModal";
import { modalManage$ } from "@/store";
import { useObservableState } from "observable-hooks";
import { ToastType } from "@/components/console/UploadFile/enum";
import { ModalManage } from "@/types";

const createOption = (label: string) => ({
  label,
  value: label
});

const rulesContext$ = new BehaviorSubject<any>([]);

export const RulesContext = createContext(rulesContext$);

export const CoursesList = () => {
  const modal = useObservableState(modalManage$);
  const [courses, setCourses] = useState<any>([]);

  const initialCreateCourse = {
    name: "",
    rulesCourses: []
  };

  const fetchCourses = (isInitialQuery: boolean = true) => {
    if (isInitialQuery) {
      if (isEmpty(courses)) {
        ApiSpaum.getAllCourses().then((res: any) => {
          let data = res.data;
          let initialValue = data.map((c: any) =>
            c.rulesCourses.map((r: any) => createOption(r.name))
          );
          initialValue.push([]);
          rulesContext$.next(initialValue);
          data.push(initialCreateCourse);
          setCourses(data);
        });
      }
    }
  };

  useQuery({ queryKey: ["fetchCourses"], queryFn: () => fetchCourses(true) });

  const handleSaveChange = (key: number) => {
    courses[key].rulesCourses = rulesContext$
      .getValue()
      [key]?.map((r: any) => r.label);
    if (!validationsInputs(courses[key])) {
      if (courses[key].id) ApiSpaum.editCourse(courses[key]).then(() => {});
      else {
        ApiSpaum.createCourse(courses[key]).then((res) => {
          courses[key].id = res.data;
          let rulesGet = rulesContext$.getValue();
          rulesGet.push([]);
          rulesContext$.next(rulesGet);
          setCourses((prev: any) => [...prev, initialCreateCourse]);
        });
      }
    }
  };

  const validationsInputs = (course: any) => {
    if (course.name === "" || equalsNullOrUndefined(course.name)) {
      callToast(ToastType.WARN, "Console.Courses.requiredName");
      return true;
    }
    if (course.email === "" || equalsNullOrUndefined(course.email)) {
      callToast(ToastType.WARN, "Console.Courses.requiredEmail");
      return true;
    }
    if (
      !course.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      callToast(ToastType.WARN, "Console.Courses.invalidEmail");
      return true;
    }
    if (isEmpty(course.rulesCourses)) {
      callToast(ToastType.WARN, "Console.Courses.rulesNotEmpty");
      return true;
    }
    return false;
  };

  const handleDelete = (key: number) => {
    if (courses[key].id) {
      ApiSpaum.deleteCourse(courses[key].id).then(() => {
        rulesContext$.next([
          ...rulesContext$.getValue().slice(0, key),
          ...rulesContext$
            .getValue()
            .slice(key + 1, rulesContext$.getValue().length)
        ]);
        let saveCourses = courses;
        setCourses([]);
        setTimeout(() => {
          setCourses([
            ...saveCourses.slice(0, key),
            ...saveCourses.slice(key + 1, saveCourses.length)
          ]);
        }, 300);
      });
    }
  };

  const handleEdit = (key: number) => {
    if (courses[key].id) {
      let modalManage: ModalManage = {
        showModal: true,
        id: courses[key].id
      };
      modalManage$.next(modalManage);
    }
  };

  return (
    <>
      {isNotEmpty(courses) && (
        <UlCourses>
          {courses.map((value: any, key: number) => {
            return (
              <>
                <li>
                  <InputCourse
                    placeholder={tx("Console.Courses.enterCourseName")}
                    defaultValue={value.name}
                    onChange={(e) => (courses[key].name = e.target.value)}
                  />
                  <hr />
                  <InputCourse
                    placeholder={tx("Console.Courses.coordinatorEmail")}
                    defaultValue={value.email}
                    onChange={(e) => (courses[key].email = e.target.value)}
                  />
                  <hr />
                  <MultiTagsDefault
                    options={[]}
                    keyRule={key}
                  ></MultiTagsDefault>
                  <div>
                    <Tooltip
                      title={courses[key].id ? tx("saveChange") : tx("add")}
                      arrow
                    >
                      <IconButton onClick={() => handleSaveChange(key)}>
                        <Image
                          src={
                            courses[key].id
                              ? "../images/confirm-green.svg"
                              : "../images/add-circle.svg"
                          }
                          alt={courses[key].id ? tx("saveChange") : tx("add")}
                          width={courses[key].id ? 25 : 30}
                          height={courses[key].id ? 25 : 30}
                        ></Image>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div hidden={!courses[key].id}>
                    <Tooltip title={tx("remove")} arrow>
                      <IconButton onClick={() => handleDelete(key)}>
                        <Image
                          src="../images/delete.svg"
                          alt={tx("remove")}
                          width={25}
                          height={25}
                        ></Image>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div hidden={!courses[key].id}>
                    <Tooltip title={tx("add")} arrow>
                      <IconButton onClick={() => handleEdit(key)}>
                        <Image
                          src="../images/edit.svg"
                          alt={tx("add")}
                          width={25}
                          height={25}
                        ></Image>
                      </IconButton>
                    </Tooltip>
                  </div>
                </li>
              </>
            );
          })}
        </UlCourses>
      )}
      {modal.showModal && <BasicModal></BasicModal>}
    </>
  );
};
