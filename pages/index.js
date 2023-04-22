import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Layout title="Home">
        <section className="bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                윈도우 및 리눅스 서버
                <strong className="font-extrabold text-teal-600 sm:block">취약점 자동 분석 및 관리</strong>
              </h1>

              <p className="mt-4 sm:text-xl sm:leading-relaxed">가나다라마바사</p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  className="block w-full rounded-lg bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500-500 sm:w-auto"
                  href="/signin"
                >
                  Sign In
                </Link>

                <Link
                  className="block w-full rounded-lg px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
                  href="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
