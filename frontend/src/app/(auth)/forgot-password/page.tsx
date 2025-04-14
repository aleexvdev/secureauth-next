import { Suspense } from 'react';
import ForgotPassword from './_forgotpassword';

const page = () => {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  )
}

export default page;
