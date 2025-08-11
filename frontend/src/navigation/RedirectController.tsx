import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Spinner from "@/components/Spinner";

interface RedirectControllerProps {
  launchParams?: any
}

const RedirectController = ({ launchParams }: RedirectControllerProps) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const id = launchParams?.tgWebAppStartParam

  // Если есть параметр startapp, делаем редирект на страницу апартамента
  useEffect(() => {
    const redirectUrl = id && id !== 'debug' ? `/apartments/${id}` : null
    const isFirstLaunch = sessionStorage.getItem('wasRedirected') !== 'true';

    if (redirectUrl && isFirstLaunch) {
      navigate(redirectUrl);
      sessionStorage.setItem('wasRedirected', 'true');
    } else if (!redirectUrl && isFirstLaunch) {
      sessionStorage.setItem('wasRedirected', 'true');
    }

    setLoaded(true);

  }, [pathname, launchParams]);

  return loaded ? null : <Spinner global/>
}

export default RedirectController;
