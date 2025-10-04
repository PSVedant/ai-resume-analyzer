import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ProfileMint" },
        { name: "description", content: "Smart Feedback for your Dream Job!" },
    ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate= useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    },[auth.isAuthenticated])
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Background Image Container */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/images/bg-main.svg')" }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />
                <section className="main-section relative">
                    <div className="page-heading py-16">
                        <h1>Track Your Applications & Resume Ratings</h1>
                        <h2>AI-powered resume enhancer that builds character and delivers real-time feedback.</h2>
                    </div>

                    {resumes.length > 0 && (
                        <div className="resume-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}