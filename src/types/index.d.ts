import { ToastType } from "@/components/console/UploadFile/enum";

interface TokensAccess {
  accessToken: string;
  refreshToken: string;
  expiration: string;
  created?: string;
  authenticated: boolean;
  username: string;
}

interface ToastRequestInterceptor {
  showToast: boolean;
  typeToast: ToastType;
  message: string;
  clearToast?: any;
  timestamp: number;
}

interface Option {
  readonly label: string;
  readonly value: string;
}

interface ModalManage {
  showModal: boolean;
  id?: bigint;
}

interface ImportDataProcessing {
  totals: number;
  totalsFoulsAlert: number;
  totalsNoteAlert: number;
  totalsFoulsBad: number;
  totalsNoteBad: number;
  totalsFoulsIntervention: number;
  totalsNoteIntervention: number;
  dataProcessing?: any;
  noteType?: string;
  hasFouls: boolean;
  forEmail: string;
  path: string;
  course?: string;
  typeAnalyses?: string;
}