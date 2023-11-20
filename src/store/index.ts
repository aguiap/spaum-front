import { BehaviorSubject } from "rxjs";
import {
  ImportDataProcessing,
  ModalManage,
  TokensAccess
} from "@/types";
import {ToastType} from "@/components/console/UploadFile/enum";

export const initialSession: TokensAccess = {
  accessToken: "",
  refreshToken: "",
  authenticated: false,
  username: "",
  expiration: ""
};

const initialLoading: boolean = false;

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

const initialToast = {
  showToast: false,
  message: '',
  toastType: ToastType.SUCCESS
}

export const session$ = new BehaviorSubject(initialSession);

export const loading$ = new BehaviorSubject(initialLoading);

export const modalManage$ = new BehaviorSubject(initialModalManage);

export const selectCoursesValue$ = new BehaviorSubject(null);

export const importCoursesRules$ = new BehaviorSubject([]);

export const importDataProcessing$ = new BehaviorSubject<ImportDataProcessing>(
  initialImportDataProcessing
);

export const importDataProcessingSubject$ = new BehaviorSubject<any>([]);

export const showImport$ = new BehaviorSubject<boolean>(false);

export const toast$ = new BehaviorSubject<typeof initialToast>(initialToast);
