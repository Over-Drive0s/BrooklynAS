import AdminLoginForm from "@/components/AdminLoginForm";
import BackLink from "@/components/BackLink";

export const metadata = { title: "Admin Login | Brooklyn Auto Sales" };

export default function AdminPage() {
  return (
    <section className="flex flex-1 items-center py-10 md:py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-red">Client Login</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">Admin +</h1>
          <p className="mt-3 text-sm text-gray-600">Sign in to access your account.</p>
        </div>
        <AdminLoginForm />
        <div className="mt-6 text-center">
          <BackLink className="text-sm font-semibold text-brand-red hover:underline" />
        </div>
      </div>
    </section>
  );
}
