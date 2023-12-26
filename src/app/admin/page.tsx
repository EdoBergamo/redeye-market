import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies)

  if (!user || user?.role !== 'admin') {
    return redirect('/') // useRouter only works in Client Components
  }

  return (
    <MaxWidthWrapper>
      <div>
        {user?.email}
      </div>
    </MaxWidthWrapper>
  )
}

export default AdminPage