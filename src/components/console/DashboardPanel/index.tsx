import {
  ArticleShowPanel,
  Panel,
  PanelAccordion,
  PanelAccordionDetails,
  PanelAccordionSummary,
  PanelFlex,
  PanelImage,
  PanelTitle,
  PanelTitles
} from "@/components/console/DashboardPanel/styled";
import { useState } from "react";
import { Collapse, Grow, Slide } from "@mui/material";
import { equalsNullOrUndefined, tx } from "@/utils/functions";
import { useRouter } from "next/router";
import { useObservableState } from "observable-hooks";
import { importDataProcessing$ } from "@/store";

export const DashboardPanel = () => {
  const dataProcessing = useObservableState(importDataProcessing$);
  const [expandPanel, setExpandPanel] = useState(false);
  const [showTitle, setShowTitle] = useState(0);
  const [showPanel, setShowPanel] = useState(true);
  const router = useRouter();

  const handleNavigation = (page: string) => {
    router.replace(page).then(() => {});
  };

  return (
    <>
      <div
        hidden={router.pathname === "/login" || router.pathname === "/token"}
      >
        <Slide direction="right" in={!showPanel}>
          <ArticleShowPanel
            title={tx("Console.showPanel")}
            onClick={() => setShowPanel(true)}
          ></ArticleShowPanel>
        </Slide>
        <Slide direction="right" in={showPanel}>
          <PanelFlex>
            <PanelTitles hidden={!expandPanel}>
              <Collapse orientation="horizontal" in={showTitle === 1}>
                <PanelTitle hidden={!expandPanel}>
                  {tx("Console.hidePanel")}
                </PanelTitle>
              </Collapse>
              <Collapse orientation="horizontal" in={showTitle === 4}>
                <PanelTitle hidden={!expandPanel}>
                  {tx("Console.admin")}
                </PanelTitle>
              </Collapse>
              <Collapse orientation="horizontal" in={showTitle === 2}>
                <PanelTitle hidden={!expandPanel}>
                  {tx("Console.courses")}
                </PanelTitle>
              </Collapse>
              {!equalsNullOrUndefined(dataProcessing.dataProcessing) && (
                <Collapse orientation="horizontal" in={showTitle === 5}>
                  <PanelTitle hidden={!expandPanel}>
                    {tx("Console.charts")}
                  </PanelTitle>
                </Collapse>
              )}
              <Collapse orientation="horizontal" in={showTitle === 3}>
                <PanelTitle hidden={!expandPanel}>
                  {tx("Console.importData")}
                </PanelTitle>
              </Collapse>
            </PanelTitles>
            <Panel>
              <PanelAccordion
                style={{
                  boxShadow: "none",
                  borderRadius: "100px"
                }}
              >
                <PanelAccordionSummary
                  onClick={() => setExpandPanel(!expandPanel)}
                >
                  <Grow in={expandPanel}>
                    <PanelImage
                      hidden={!expandPanel}
                      alt={tx("close")}
                      src="../images/close-circle.svg"
                      width={30}
                      height={30}
                    ></PanelImage>
                  </Grow>
                  <Grow in={!expandPanel}>
                    <PanelImage
                      hidden={expandPanel}
                      alt={tx("dashboard")}
                      src="../images/dashboard.svg"
                      width={18}
                      height={18}
                    ></PanelImage>
                  </Grow>
                </PanelAccordionSummary>
                <PanelAccordionDetails>
                  <div
                    onMouseLeave={() => setShowTitle(0)}
                    onMouseEnter={() => setShowTitle(3)}
                    onClick={() => handleNavigation("/console/import")}
                  >
                    <PanelImage
                      alt={tx("buttonPanel")}
                      src="../images/excel-file.svg"
                      width={25}
                      height={25}
                    ></PanelImage>
                  </div>
                </PanelAccordionDetails>
                {!equalsNullOrUndefined(dataProcessing.dataProcessing) && (
                  <PanelAccordionDetails>
                    <div
                      onMouseLeave={() => setShowTitle(0)}
                      onMouseEnter={() => setShowTitle(5)}
                      onClick={() => handleNavigation("/console/charts")}
                    >
                      <PanelImage
                        alt={tx("buttonPanel")}
                        src="../images/chart.svg"
                        width={25}
                        height={25}
                      ></PanelImage>
                    </div>
                  </PanelAccordionDetails>
                )}
                <PanelAccordionDetails>
                  <div
                    onMouseLeave={() => setShowTitle(0)}
                    onMouseEnter={() => setShowTitle(2)}
                    onClick={() => handleNavigation("/console/courses")}
                  >
                    <PanelImage
                      alt={tx("buttonPanel")}
                      src="../images/courses.svg"
                      width={25}
                      height={25}
                    ></PanelImage>
                  </div>
                </PanelAccordionDetails>
                <PanelAccordionDetails>
                  <div
                    onMouseLeave={() => setShowTitle(0)}
                    onMouseEnter={() => setShowTitle(4)}
                    onClick={() => handleNavigation("/console/admin")}
                  >
                    <PanelImage
                      alt={tx("buttonPanel")}
                      src="../images/person.svg"
                      width={23}
                      height={23}
                    ></PanelImage>
                  </div>
                </PanelAccordionDetails>
                <PanelAccordionDetails>
                  <div
                    onMouseLeave={() => setShowTitle(0)}
                    onMouseEnter={() => setShowTitle(1)}
                    onClick={() => setShowPanel(false)}
                  >
                    <PanelImage
                      alt={tx("buttonPanel")}
                      src="../images/hide.svg"
                      width={30}
                      height={30}
                    ></PanelImage>
                  </div>
                </PanelAccordionDetails>
              </PanelAccordion>
            </Panel>
          </PanelFlex>
        </Slide>
      </div>
    </>
  );
};
