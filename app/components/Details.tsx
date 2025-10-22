import React, { useState } from 'react';

// --- Type Definitions ---

interface Tip {
    type: 'good' | 'improve';
    tip: string;
    explanation: string;
}

interface CategoryData {
    score: number;
    tips: Tip[];
}

interface Feedback {
    toneAndStyle: CategoryData;
    content: CategoryData;
    structure: CategoryData;
    skills: CategoryData;
}

interface DetailsProps {
    feedback: Feedback;
}

// --- Placeholder for External Utilities/Components ---

const cn = (...classes: (string | boolean | undefined)[]): string => classes.filter(Boolean).join(' ');

// Placeholder Accordion Components
const Accordion = ({ children }: { children: React.ReactNode }) => <div className="space-y-4">{children}</div>;
const AccordionItem = ({ children }: { children: React.ReactNode }) => <div className="border border-gray-200 rounded-lg">{children}</div>;
const AccordionHeader = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick} className="flex justify-between items-center w-full p-4 font-semibold bg-gray-50 hover:bg-gray-100 rounded-t-lg">
        {children}
    </button>
);
const AccordionContent = ({ children, isOpen }: { children: React.ReactNode, isOpen: boolean }) => (
    <div className={cn("overflow-hidden transition-all duration-300", isOpen ? 'max-h-[1000px] p-4' : 'max-h-0')}>
        {isOpen && <div className="pt-2">{children}</div>}
    </div>
);
const IconCheck = () => <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const IconImprove = () => <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.427 2.607-1.427 3.372 0l4.358 8.14A1.5 1.5 0 0115.153 14H4.847a1.5 1.5 0 01-1.336-2.763l4.358-8.14zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;

// --- Helper Component 1: ScoreBadge ---

interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeClasses: string;
    let textClasses: string;
    let textLabel: string;
    let isStrong: boolean = false;

    if (score > 69) {
        badgeClasses = 'bg-green-500';
        textClasses = 'text-green-500';
        textLabel = 'Strong';
        isStrong = true;
    } else if (score > 39) {
        badgeClasses = 'bg-yellow-500';
        textClasses = 'text-yellow-500';
        textLabel = 'Good Start';
    } else {
        badgeClasses = 'bg-red-500';
        textClasses = 'text-red-500';
        textLabel = 'Needs Work';
    }

    return (
        <div className="flex items-center space-x-2">
            {isStrong && (
                <span className={cn('flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white', badgeClasses)}>
          {textLabel}
        </span>
            )}
            <span className={cn('font-bold', textClasses)}>
        {score}/100
      </span>
        </div>
    );
};

// --- Helper Component 2: CategoryHeader ---

interface CategoryHeaderProps {
    title: string;
    categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => (
    <>
        <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
        <ScoreBadge score={categoryScore} />
    </>
);

// --- Helper Component 3: CategoryContent ---

interface CategoryContentProps {
    tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
    const tipList = tips.map((tip, index) => (
        <div key={`tip-${index}`} className="flex items-start space-x-3">
            {tip.type === 'good' ? <IconCheck /> : <IconImprove />}
            <p className="text-gray-700 text-sm">{tip.tip}</p>
        </div>
    ));

    const explanationList = tips.map((tip, index) => (
        <div
            key={`explanation-${index}`}
            className={cn(
                "p-3 rounded-lg text-sm mb-3",
                tip.type === 'good'
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
            )}
        >
            <p className="font-semibold">{tip.tip}</p>
            <p>{tip.explanation}</p>
        </div>
    ));

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
                {tipList}
            </div>

            <div className="mt-4 border-t pt-4">
                <h5 className="text-md font-medium text-gray-800 mb-3">Detailed Feedback:</h5>
                {explanationList}
            </div>
        </div>
    );
};

// --- Main Component: Details ---

const Details: React.FC<DetailsProps> = ({ feedback }) => {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const categories = [
        { key: 'toneAndStyle', title: 'Tone & Style', data: feedback.toneAndStyle },
        { key: 'content', title: 'Content', data: feedback.content },
        { key: 'structure', title: 'Structure', data: feedback.structure },
        { key: 'skills', title: 'Skills', data: feedback.skills },
    ];

    const toggleAccordion = (key: string) => {
        setOpenItem(openItem === key ? null : key);
    };

    return (
        <Accordion>
            {categories.map(({ key, title, data }) => (
                <AccordionItem key={key}>
                    <AccordionHeader onClick={() => toggleAccordion(key)}>
                        <CategoryHeader title={title} categoryScore={data.score} />
                    </AccordionHeader>
                    <AccordionContent isOpen={openItem === key}>
                        <CategoryContent tips={data.tips} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default Details;