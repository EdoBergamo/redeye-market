import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatDistanceToNow } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);

  if (!user) {
    return redirect('/login');
  }

  const formatUserDate = (date: string) => formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <MaxWidthWrapper>
      <div className="py-8 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white dark:bg-black rounded-lg shadow-md">
            <div className="text-gray-800 bg-gray-100 dark:bg-gray-900 rounded-t-lg px-6 py-4 border-b border-gray-300">
              <h2 className="text-2xl font-bold dark:text-white">Account</h2>
            </div>
            <nav className="p-4">
              <ul>
                <li className="mb-3">
                  <a href="/account" className="block text-black dark:text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-200 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-red-600">Account</a>
                </li>
                <li className="mb-3">
                  <a href="/account/orders" className="block text-black dark:text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-200 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-red-600">Orders</a>
                </li>
                <li>
                  <button className="block w-full text-start text-black dark:text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-200 hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-red-600">Sign Out</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="md:col-span-2 bg-white dark:bg-black p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Account Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="font-semibold">Email:</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Role:</p>
                  <p>{user.role === 'admin' ? 'Admin' : 'Customer'}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <p className="font-semibold">Signed Up:</p>
                  <p>{formatUserDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="font-semibold">Last Login:</p>
                  <p>{formatUserDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
