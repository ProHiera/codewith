import StudyCheatsheet from "../../components/StudyCheatsheet";
import PageHeader from "../../components/PageHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <PageHeader />
        <main className="mt-6">
          <StudyCheatsheet initialLevel={"beginner"} />
        </main>
      </div>
    </div>
  );
}
