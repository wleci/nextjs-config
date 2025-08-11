import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieStore = await cookies();
    const locale = cookieStore.get('lang')?.value || 'en';

    return {
        locale,
        messages: (await import(`../../locales/${locale}.json`)).default
    };
});
