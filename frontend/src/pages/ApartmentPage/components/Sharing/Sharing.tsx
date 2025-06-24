import { hapticFeedback, shareURL } from '@telegram-apps/sdk-react';
import { useState } from 'react';
import {
    CopyOutlined,
    SendOutlined,
    ExportOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { BOT_USERNAME } from '@/constants';
import { Section, Button, Snackbar } from '@telegram-apps/telegram-ui';
import {useGetParameters} from "@/services/useGetParameters.ts";

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                share: (url: string) => Promise<void>;
            };
        };
    }
}

const Sharing = ({ apartmentId }: { apartmentId: string }) => {
    const { data: linkData } = useGetParameters()
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleCopyLink = async () => {
        try {
            const link = `https://t.me/${BOT_USERNAME}/app?startapp=${apartmentId}`;
            await navigator.clipboard.writeText(link);
            hapticFeedback.notificationOccurred('success');
            setShowSnackbar(true);
        } catch (error) {
            hapticFeedback.notificationOccurred('error');
        }
    }

    const handleShare = async () => {
        try {
            const link = `https://t.me/${BOT_USERNAME}/app?startapp=${apartmentId}`;
            shareURL(link, '');
            hapticFeedback.notificationOccurred('success');
        } catch (error) {
            hapticFeedback.notificationOccurred('error');
        }
    }

    return (
        <>
        <Section className='apartment-page__connect'>
                <div className="apartment-page__connect-content">
                    <div onClick={handleCopyLink} className="apartment-page__connect-top">
                        <p>{'Скопировать ссылку'}</p>
                        <CopyOutlined />
                    </div>
                    <div className="divider"/>
                    <div className="apartment-page__connect-bottom">
                    <Button
                        size='m'
                        mode='bezeled'
                        onClick={handleShare}
                    >
                        <ExportOutlined />
                    </Button>
                    <Button
                        style={{ width: '100%' }}
                        after={<SendOutlined/>}
                        Component='a'
                        href={linkData?.manager_link}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {'Написать'}
                    </Button>
                </div>
                </div>
            </Section>
            {showSnackbar && (
                <Snackbar
                    onClose={() => setShowSnackbar(false)}
                >
                    <div className="apartment-page__snack">
                        <p>{'Ссылка скопирована'}</p>
                        <CheckCircleOutlined />
                    </div>
                </Snackbar>
            )}
        </>
    )
}

export default Sharing;
