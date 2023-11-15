import {
  BoxImage,
  BoxTypography,
  SectionBox
} from "@/components/token/SplashLoading/styled";
import { tx } from "@/utils/functions";

interface SplashLoadingProps {
  text: string;
}

export const SplashLoading = ({ text }: SplashLoadingProps) => {
  return (
    <>
      <SectionBox>
        <div>
          <BoxImage
            src="../images/logo-white.svg"
            alt={tx("logoWhite")}
            width={110}
            height={110}
          ></BoxImage>
          <aside>
            <BoxTypography>{text}</BoxTypography>
          </aside>
        </div>
      </SectionBox>
    </>
  );
};
