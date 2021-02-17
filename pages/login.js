import { useAuth } from '@/utils/auth';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const { getApprovedRequestToken, createSession } = useAuth();

  useEffect(() => {
    const { approved, request_token } = router.query;
    (async () => {
      await createSession(approved, request_token);
    })();
    console.log(router.query);
  });

  const handleClick = () => {
    getApprovedRequestToken();
  };
  return <button onClick={handleClick}>login</button>;
}
