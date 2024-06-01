'use client'

import { getServerSession } from "next-auth"; // 2⃣
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const session = useSession();

  return (
    <>
      <p>Profile Page</p>
      {!session ? (
        <p>ユーザー情報が取得できていません。。。</p>
      ) : (
        <>
          <div>
          </div>
          <div className="mt-8">
            <p className="mb-3">Name: {session.data?.user?.name}</p>
            <p className="mb-3">Email: {session.data?.user?.email}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Profile