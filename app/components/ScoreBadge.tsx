import React from 'react';
interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeStyles= '';
    let label='';

    if (score > 70) {
        // Green badge for Strong score
        badgeStyles = "bg-green-100 text-green-700 border-green-400";
        label = "Strong";
    } else if (score > 49) {
        // Yellow badge for Good Start score
        badgeStyles = "bg-yellow-100 text-yellow-700 border-yellow-400";
        label = "Good Start";
    } else {
        // Red badge for Needs Work score
        badgeStyles = "bg-red-100 text-red-700 border-red-400";
        label = "Needs Work";
    }

    // 2. Combine base and dynamic styles
    const baseStyles = "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium border";
    const finalStyles = `${baseStyles} ${badgeStyles}`;

    // The component returns a styled div with a single p element inside
    return (
        <div className={finalStyles}>
            <p>{label}</p>
        </div>
    );
};

export default ScoreBadge;
