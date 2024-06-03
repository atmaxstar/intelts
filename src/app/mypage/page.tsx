
import { getServerSession } from "next-auth"; // 2⃣
import { useSession } from "next-auth/react";
import Image from "next/image";
import Table from "./Table";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p>Profile Page</p>
      {!session ? (
        <p>ユーザー情報が取得できていません。。。</p>
      ) : (
        <Table/>
      )}
    </>
  );
}

export default page