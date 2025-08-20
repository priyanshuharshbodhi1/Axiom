"use client"
import React from 'react'
import {usePrivy} from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';

const page = () => {
    const {ready, authenticated, login, logout} = usePrivy();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);
    const disableLogout = !ready || (ready && !authenticated);
  
    return (
        <>
      <Button disabled={disableLogin} onClick={login}>
        Log in
      </Button>
       <Button disabled={disableLogout} onClick={logout}>
       Log out
     </Button>
     </>
    );
}

export default page