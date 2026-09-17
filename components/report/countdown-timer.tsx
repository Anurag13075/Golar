"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Clock } from "lucide-react";

interface CountdownTimerProps {
  damageDate: string | null;
}

export default function CountdownTimer({ damageDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean; totalSeconds: number }>({
    hours: 72, minutes: 0, seconds: 0, isExpired: false, totalSeconds: 72 * 3600
  });

  useEffect(() => {
    if (!damageDate) return;

    const calculateTime = () => {
      const damageTime = new Date(damageDate).getTime();
      const deadlineTime = damageTime + 72 * 60 * 60 * 1000;
      const now = new Date().getTime();
      const diff = deadlineTime - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, isExpired: false, totalSeconds: diff / 1000 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [damageDate]);

  if (!damageDate) {
    return (
      <div className="w-full bg-white rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center gap-2 shadow-sm">
        <Clock className="text-slate-400 w-6 h-6" />
        <p className="text-sm text-slate-500 text-center font-medium">Set damage date to start 72-hour timer</p>
      </div>
    );
  }

  const formatTime = (val: number) => val.toString().padStart(2, "0");
  
  const getStatusColor = () => {
    if (timeLeft.isExpired) return "text-red-600 bg-red-50 border-red-200";
    if (timeLeft.hours < 24) return "text-red-600 bg-red-50 border-red-200";
    if (timeLeft.hours < 48) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-emerald-700 bg-emerald-50 border-emerald-200";
  };

  const getBarColor = () => {
    if (timeLeft.isExpired) return "bg-red-600";
    if (timeLeft.hours < 24) return "bg-red-500";
    if (timeLeft.hours < 48) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const progressPercent = Math.min(100, Math.max(0, 100 - (timeLeft.totalSeconds / (72 * 3600)) * 100));

  return (
    <div className={`w-full rounded-2xl p-4 border flex flex-col items-center justify-center gap-3 shadow-sm ${getStatusColor()}`}>
      <div className="flex items-center gap-2 mb-1">
        <Clock className={`w-5 h-5 ${timeLeft.hours < 24 && !timeLeft.isExpired ? 'animate-pulse' : ''}`} />
        <h3 className="text-sm font-bold uppercase tracking-wider opacity-80">Time Remaining</h3>
      </div>
      
      {timeLeft.isExpired ? (
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="w-8 h-8 mb-2" />
          <div className="text-xl font-bold tracking-tight">EXPIRED — file appeal</div>
        </div>
      ) : (
        <motion.div 
          className="text-4xl font-black tabular-nums tracking-tight flex items-baseline gap-1"
          animate={timeLeft.hours < 24 ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:<span className="text-3xl opacity-80">{formatTime(timeLeft.seconds)}</span>
        </motion.div>
      )}

      <div className="w-full max-w-xs h-2 bg-black/10 rounded-full overflow-hidden mt-1 relative">
        <motion.div 
          className={`absolute top-0 bottom-0 left-0 ${getBarColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="text-xs text-center opacity-70 mt-1 font-semibold">
        to report under PMFBY Section 11.2
        <br />
        <span className="text-[10px]">PMFBY धारा 11.2 के तहत रिपोर्ट करने के लिए</span>
      </div>
    </div>
  );
}
