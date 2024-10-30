import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import LeaderboardTable from "./LeaderboardTable";

const Top3 = () => {
  const leaderboard = [
    {
      user: "user1",
      score: 3200,
      userInfo: {
        name: "Alice",
      },
    },
    {
      user: "user2",
      score: 0,
      userInfo: {
        name: "Bob",
      },
    },
    {
      user: "user3",
      score: 0,
      userInfo: {
        name: "Charlie",
      },
    },
  ];
  if (!leaderboard || leaderboard.length < 3) {
    return;
  }

  let height2 = Math.floor((leaderboard[1].score / leaderboard[0].score) * 240);
  if (height2 < 130) {
    height2 = 130;
  }
  let height3 = Math.floor((leaderboard[2].score / leaderboard[0].score) * 240);
  if (height3 < 100) {
    height3 = 100;
  }

  //to trigger reanimation on data change
  const uniqueKey = leaderboard.map((item) => item.user + item.score).join("-");

  const top3 = leaderboard.slice(0, 3);
  return (
    <Card className="rounded-lg overflow-hidden h-full">
      <div
        key={uniqueKey}
        className="flex justify-center items-end mx-auto h-[350px] background "
      >
        <div className="relative w-24 sm:w-28 flex flex-col items-center ">
          <motion.div
            className="flex flex-col items-center absolute -top-14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <p className="font-semibold">#2</p>
            <img
              className="rounded-full w-1/2 ring border border-white mt-1 ring-zinc-600 "
              src={
                top3[1].userInfo.image
                  ? top3[1].userInfo.image
                  : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
              }
            />
            <p className="text-xs m-2 text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
              {top3[1].userInfo.name ? top3[1].userInfo.name : "Quiz Player"}
            </p>
          </motion.div>
          <motion.div
            className="rounded-t-3xl gradient-bg-1 w-full flex flex-col items-center justify-start pt-4"
            initial={{ height: 0 }}
            animate={{ height: `${height2}px` }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            {/* <span className="text-xl font-bold text-white">{top3[1]?.score}</span> */}
          </motion.div>
        </div>

        <div className="relative w-28 sm:w-32  flex flex-col items-center mx-4 lg:mx-6 ">
          <motion.div
            className="flex flex-col items-center absolute -top-32 sm:-top-36"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {/* <p className="font-semibold">#1</p> */}
            <img
              className="w-3/4 relative -bottom-[37px] rotate-2"
              src="https://png.pngtree.com/png-clipart/20230119/ourmid/pngtree-beutifull-gold-crown-clipart-vector-art-png-image_6566757.png"
              alt="Crown Image"
            />
            <img
              className="rounded-full w-1/2 ring border border-white mt-1 ring-zinc-600"
              src={
                top3[0].userInfo.image
                  ? top3[0].userInfo.image
                  : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
              }
            />
            <p className="text-sm m-2 text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
              {top3[0].userInfo.name ? top3[0].userInfo.name : "Quiz Player"}
            </p>
          </motion.div>
          <motion.div
            className="rounded-t-3xl gradient-bg-2 w-full flex flex-col items-center justify-start pt-4 shadow-lg "
            initial={{ height: 0 }}
            animate={{ height: "240px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* <span className="text-xl font-bold text-white">{top3[0]?.score}</span> */}
          </motion.div>
        </div>
        <div className="relative w-24 sm:w-28 flex flex-col items-center">
          <motion.div
            className="flex flex-col items-center absolute -top-14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <p className="font-semibold">#3</p>
            <img
              className="rounded-full w-1/2 ring border border-white mt-1 ring-zinc-600"
              src={
                top3[2].userInfo.image
                  ? top3[2].userInfo.image
                  : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
              }
              alt={"Third"}
            />
            <p className="text-xs m-2 text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
              {top3[2].userInfo.name ? top3[2].userInfo.name : "Quiz Player"}
            </p>
          </motion.div>
          <motion.div
            className="rounded-t-3xl gradient-bg-3 w-full flex flex-col items-center justify-start pt-4"
            initial={{ height: 0 }}
            animate={{ height: `${height3}px` }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {/* <span className="text-xl font-bold text-white">{top3[2]?.score}</span> */}
          </motion.div>
        </div>
      </div>
      <LeaderboardTable />
    </Card>
  );
};

export default Top3;
