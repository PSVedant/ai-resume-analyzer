import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router"; // Assuming this path is correct for Link

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ProfileMint" },
        { name: "description", content: "Smart Feedback for your Dream Job!" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate= useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    },[auth.isAuthenticated, navigate]) // Added 'navigate' to dependencies for best practice

    useEffect(()=>{
        const loadResumes = async()=> {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            console.log("parsedResumes", parsedResumes);
            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }

        loadResumes();
    },[kv]); // Added kv to dependency array to ensure the effect has the latest instance if it ever changes

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
                        {/* H2 changes based on whether loading is done and resumes are present */}
                        {!loadingResumes && resumes.length === 0 ? (
                            <h2>No Resumes Found. Upload Your Resume to get Feedback.</h2>
                        ):(
                            <h2>AI-powered resume enhancer that builds character and delivers real-time feedback.</h2>
                        )}
                    </div>

                    {/* Display Loading Indicator when fetching data */}
                    {loadingResumes && (
                        <div className="flex flex-col items-center justify-center">
                            {/* Placeholder for a true loading spinner if available */}
                            <p>Loading resumes...</p>
                        </div>
                    )}


                    {/* Display Resume Cards when data is loaded and resumes exist */}
                    {!loadingResumes && resumes.length > 0 && (
                        <div className="resume-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    )}

                    {/* Display No Resumes Found/Upload CTA when loading is done and NO resumes exist */}
                    {/* FIX: Merged the GIF and Link logic here to ONLY show when empty */}
                    {!loadingResumes && resumes.length === 0 && (
                        <div className="flex flex-col items-center justify-center mt-10 gap-4">
                            {/* The GIF serves as a visual placeholder for the empty state */}
                            <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
                            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                                Upload Resume
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}