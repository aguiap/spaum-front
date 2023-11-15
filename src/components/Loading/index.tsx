import { HrLoading } from "@/components/Loading/styled";
import { useObservableState } from "observable-hooks";
import { loading$ } from "@/store";
import { useRouter } from "next/router";

export const Loading = () => {
  const showLoading = useObservableState(loading$);
  const router = useRouter();

  return (
    <HrLoading
      hidden={router.pathname === "/token" || !showLoading}
    ></HrLoading>
  );
};
