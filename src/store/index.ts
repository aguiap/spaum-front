import { BehaviorSubject } from "rxjs";
import {
  ImportDataProcessing,
  ModalManage,
  ToastRequestInterceptor,
  TokensAccess
} from "@/types";
import { ToastType } from "@/components/console/UploadFile/enum";

export const initialSession: TokensAccess = {
  accessToken: "",
  refreshToken: "",
  authenticated: false,
  username: ""
};

const initialLoading: boolean = false;

const initialToastRequest: ToastRequestInterceptor = {
  showToast: false,
  typeToast: ToastType.ERROR,
  message: "",
  clearToast: null,
  timestamp: 0
};

const initialModalManage: ModalManage = {
  showModal: false
};

export const initialImportDataProcessing: ImportDataProcessing = {
  totals: 0,
  totalsFoulsAlert: 0,
  totalsNoteAlert: 0,
  totalsFoulsBad: 0,
  totalsNoteBad: 0,
  totalsFoulsIntervention: 0,
  totalsNoteIntervention: 0,
  hasFouls: true,
  forEmail: "",
  path: ""
};

export const session$ = new BehaviorSubject(initialSession);

export const loading$ = new BehaviorSubject(initialLoading);

export const toastRequest$ = new BehaviorSubject(initialToastRequest);

export const modalManage$ = new BehaviorSubject(initialModalManage);

export const selectCoursesValue$ = new BehaviorSubject(null);

export const importCoursesRules$ = new BehaviorSubject([]);

export const importDataProcessing$ = new BehaviorSubject<ImportDataProcessing>(
  initialImportDataProcessing
);

export const importDataProcessingSubject$ = new BehaviorSubject<any>([]);

export const showImport$ = new BehaviorSubject<boolean>(false);
