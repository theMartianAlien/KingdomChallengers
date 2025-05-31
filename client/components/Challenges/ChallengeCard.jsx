import { Link } from "react-router-dom";

export default function ChallengeCard({ challenge }) {
    return (
        <>
            <Link to={`/challenges/${challenge._id}`}>
                <div className="bg-[#2d2a26]
  border-2 border-[#a12525]
  rounded-[12px]   
  shadow-[0_0_15px_rgba(161,37,37,0.5)]  
  text-[#f0e6d2]      
  w-[320px]           
  p-5        
  hover:scale-[1.03] transition-transform duration-300 ease-in-out
  my-4  
  text-left">
                    <div className="p-5">
                        <span className="text-[#d4af37] mb-[10px]">{challenge.title}</span>
                        <p className="text-[14px] leading-[1.5] text-[#e0d3b8]">{challenge.statement}</p>
                    </div>
                    <div className="px-5 py-6">
                        {challenge.status !== 'locked' && (
                            <p className="no-underline text-[#007BFF] font-bold">
                                Challenge ends on <span>
                                    {new Date(challenge.challengeEndDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </>
    );
}