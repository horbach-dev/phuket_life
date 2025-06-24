import { useNavigate } from 'react-router-dom';
import {hapticFeedback, hideBackButton, onBackButtonClick, showBackButton} from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';

export function Page({ children, back = true, backLink }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  backLink?: string | null
  back?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        hapticFeedback.impactOccurred('light')
        backLink ? navigate(backLink) : navigate(-1);
      });
    }
    hideBackButton();
  }, [back, backLink]);

  return <>{children}</>;
}
