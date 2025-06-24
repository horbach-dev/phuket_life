import { useEffect } from "react";
import { mainButton, openTelegramLink } from "@telegram-apps/sdk-react";
import { useLocation } from "react-router-dom";
import {useGetParameters} from "@/services/useGetParameters.ts";

const ScrollToTop = () => {
  const { data: linkData } = useGetParameters()
  const { pathname } = useLocation();
  const isPostsPage = pathname?.includes('/article');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let clickHandler: (() => void) | undefined;

    if (isPostsPage && linkData?.manager_link) {
      mainButton?.mount();
      mainButton.setParams({
        text: 'Написать',
        isVisible: true
      });
      clickHandler = () => {
        openTelegramLink(linkData.manager_link);
      };
      mainButton.onClick(clickHandler);
    }

    return () => {
      if (isPostsPage && linkData?.manager_link) {
        mainButton?.setParams({ isVisible: false });
        if (clickHandler) {
          mainButton?.offClick(clickHandler);
        }
        mainButton?.unmount();
      }
    }
  }, [isPostsPage, linkData?.manager_link]);

  return null;
};

export default ScrollToTop;
