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
        {user?.products!.map((product) => (
          // @ts-ignore
          <div key={product.id}>
            {/* id, user, name, description, price, category, product_files, approvedForSale, images, createdAt, updatedAt */}
            {/* @ts-ignore */}
            {product.id}<br />
            {/* @ts-ignore */}
            {product.name}<br />
            {/* @ts-ignore */}
            {product.description}<br />
            {/* @ts-ignore */}
            {product.price}<br />
            {/* @ts-ignore */}
            {product.category}
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default AdminPage