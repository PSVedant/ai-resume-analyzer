import React from 'react';

// --- Type Definitions ---
interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

// --- Component ---
const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    let gradientFromClass: string;
    let mainIconSrc: string;
    let subtitle: string;
    let explanation: string;
    let closingLine: string;

    // Logic to determine styles and content
    if (score > 69) {
        gradientFromClass = "from-green-100";
        mainIconSrc = "/icons/ats-good.svg";
        subtitle = "Excellent ATS Compatibility!";
        explanation = "Your resume is highly optimized for Applicant Tracking Systems. Great job!";
        closingLine = "Keep up the excellent work!";
    } else if (score > 49) {
        gradientFromClass = "from-yellow-100";
        mainIconSrc = "/icons/ats-warning.svg";
        subtitle = "Good Start on ATS Optimization.";
        explanation = "Your resume has a fair level of ATS compatibility, but there's room for improvement to stand out even more.";
        closingLine = "Consider the suggestions below to boost your score.";
    } else {
        gradientFromClass = "from-red-100";
        mainIconSrc = "/icons/ats-bad.svg";
        subtitle = "Needs Work on ATS Optimization.";
        explanation = "Your resume might face challenges with Applicant Tracking Systems. It's important to optimize it for better visibility.";
        closingLine = "Review the tips below to significantly improve your ATS score.";
    }

    return (
        // The component is set to w-full to align perfectly with its parent layout container.
        <div className={`
      w-full 
      my-4 p-4 sm:p-6 
      rounded-lg shadow-lg 
      bg-gradient-to-br ${gradientFromClass} via-white to-white
    `}>

            {/* Top Section */}
            <div className="flex items-center space-x-3 mb-4">
                <img src={mainIconSrc} alt="ATS Status Icon" className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    ATS Score - {score}/100
                </h2>
            </div>

            {/* Description Section */}
            <div className="mb-5">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">{subtitle}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {explanation}
                </p>
            </div>

            {/* Suggestions List */}
            <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-3">Suggestions for Improvement:</h4>
                <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 pt-1">
                                {/* Placeholder for Check/Warning Icon SVGs */}
                                {suggestion.type === "good" ?
                                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    :
                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.427 2.607-1.427 3.372 0l4.358 8.14A1.5 1.5 0 0115.153 14H4.847a1.5 1.5 0 01-1.336-2.763l4.358-8.14zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                }
                            </div>
                            <p className="text-gray-700 text-sm">{suggestion.tip}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Closing Line */}
            <p className="text-center text-gray-600 text-xs italic mt-4">
                {closingLine}
            </p>
        </div>
    );
};

export default ATS;