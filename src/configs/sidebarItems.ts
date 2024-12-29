import { HomeIcon } from '@heroicons/react/16/solid';
import { ClipboardDocumentIcon } from '@heroicons/react/16/solid';
import { UserIcon } from '@heroicons/react/16/solid';
import { EnvelopeIcon } from '@heroicons/react/16/solid';
import { CogIcon } from '@heroicons/react/16/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid';

interface SidebarItem {
    label: string;
    path: string;
    icon: React.ElementType;
}

const getSidebarItems = (t: (key: string) => string): SidebarItem[] => {
    return [
        {
            label: t('sidebar-1'),
            path: '/homepage',
            icon: HomeIcon
        },
        {
            label: t('sidebar-2'),
            path: '/anket',
            icon: ClipboardDocumentIcon
        },
        {
            label: t('sidebar-3'),
            path: '/profile',
            icon: UserIcon
        },
        {
            label: t('sidebar-4'),
            path: '/contact',
            icon: EnvelopeIcon
        },
        {
            label: t('sidebar-5'),
            path: '/settings',
            icon: CogIcon
        },
        {
            label: t('sidebar-6'),
            path: '/help',
            icon: QuestionMarkCircleIcon
        }
    ];
};

export default getSidebarItems;
