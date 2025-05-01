import { Header } from "@/modules/layout";
import {
  CreateUserRepositoryForm,
  UserRepositories,
} from "@/modules/user-repository";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="w-full grow flex flex-col items-center gap-8">
        <CreateUserRepositoryForm />
        <UserRepositories />
      </main>
    </div>
  );
}
