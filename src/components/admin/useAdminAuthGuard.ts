'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuthGuard() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch('/api/admin/check');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
      } catch {
        router.push('/admin/login');
        return;
      }

      setCheckingAuth(false);
    };

    check();
  }, [router]);

  return { checkingAuth };
}
