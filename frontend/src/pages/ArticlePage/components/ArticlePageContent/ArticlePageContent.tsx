import { MutableRefObject, useEffect, useRef } from "react";

interface IProps {
  pageRef: MutableRefObject<HTMLDivElement | null>
  page: string
}

export const ArticlePageContent = ({ page, pageRef }: IProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const video = contentRef.current?.querySelector('video')

    video?.setAttribute("playsinline", "");
    video?.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      if (triggeredRef.current) return;

      if (video) {
        video.play?.().then(() => {
          triggeredRef.current = true;
          console.log("Видео воспроизвелось после взаимодействия");
        }).catch((err) => {
          console.error("Не удалось воспроизвести видео:", err);
        });
      }

      // Чистим после первого скролла
      window.removeEventListener("scroll", tryPlay);
      pageRef.current?.addEventListener('touchend', tryPlay);
    };

    // Подписка на скролл
    pageRef.current?.addEventListener('touchend', tryPlay);
    pageRef.current?.addEventListener('scroll', tryPlay);
    return () => {
      window.removeEventListener("scroll", tryPlay);
      pageRef.current?.addEventListener('touchend', tryPlay);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className='article-page__page'
      dangerouslySetInnerHTML={{
        __html: page
      }}
    />
  )
}
