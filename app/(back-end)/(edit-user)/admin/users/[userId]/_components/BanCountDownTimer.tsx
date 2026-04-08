import { useEffect, useState } from "react";

type Props = {
  banned: boolean;
  banExpires?: Date;
};

export function BanCountDownTimer({ banned, banExpires }: Props) {
  const [time, setTime] = useState<number>(
    banned ? Math.floor(((banExpires?.getTime() || 0) - Date.now()) / 1000) : 0,
  );

  useEffect(() => {
    if (banned) {
      const interval = setInterval(() => {
        setTime(Math.max(0, time - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [banned, time]);

  return (
    <div className="flex items-center justify-center gap-3">
      {banned && (
        <div className="flex items-center gap-2">
          <div className="text-foreground text-xs font-semibold">
            Account will be active in
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-red-500">
              {`${Math.floor(time / 3600) % 24}:${String(`0${Math.floor(time / 60) % 60}`).slice(-2)}.${String(`0${time % 60}`).slice(-2)}`}
            </span>
            <span className="text-muted-foreground text-sm">seconds</span>
          </div>
        </div>
      )}
    </div>
  );
}
