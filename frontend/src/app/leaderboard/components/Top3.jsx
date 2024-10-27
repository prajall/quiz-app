import { motion } from "framer-motion";

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
    <div
      key={uniqueKey}
      className="flex justify-center items-end mx-auto mt-2 h-full background"
    >
      <div className="relative w-24 sm:w-28 lg:w-32 flex flex-col items-center ">
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
          {/* <p className="text-xs m-2 text-[#19528A] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {top3[1].userInfo.name ? top3[1].userInfo.name : "Quiz Player"}
          </p> */}
        </motion.div>
        <motion.div
          className="rounded-t-3xl gradient-bg-1 w-full flex flex-col items-center justify-start pt-4"
          initial={{ height: 0 }}
          animate={{ height: `${height2}px` }}
          transition={{ duration: 0.5, delay: 0.06 }}
        >
          <span className="text-xl font-bold text-white">{top3[1]?.score}</span>
        </motion.div>
      </div>

      <div className="w-28 sm:w-32 lg:w-36 flex flex-col items-center mx-6 lg:mx-10 ">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <img
            className="w-3/4 relative top-6 sm:top-7 lg:top-8 rotate-2  "
            src={
              "https://png.pngtree.com/png-clipart/20230119/ourmid/pngtree-beutifull-gold-crown-clipart-vector-art-png-image_6566757.png"
            }
            alt="Crown Image"
          />
          <img
            className="rounded-full w-3/4 ring-4 border border-white ring-[#4298ED9a] "
            // src="https://images.pexels.com/photos/20094341/pexels-photo-20094341/free-photo-of-portrait-of-man-wearing-brown-cap.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            src={
              top3[0].userInfo.image
                ? top3[0].userInfo.image
                : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
            }
          />
          <p className="text-xs m-2 text-[#19528A] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {top3[0].userInfo.name ? top3[0].userInfo.name : "Quiz Player"}
          </p>
        </motion.div>
        {/* <p className="font-semibold text-white">3212</p> */}
        <motion.div
          className="rounded-t-3xl gradient-bg-2  w-full sm:w-28 lg:w-32 h-60  flex flex-col items-center justify-start pt-4"
          initial={{ height: 0 }}
          animate={{ height: "240px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-xl font-bold text-white ">
            {top3[0]?.score}
          </span>
        </motion.div>
      </div>
      <div className="w-24 sm:w-28 lg:w-32 flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <p className="font-semibold">#3</p>

          <img
            className="rounded-full w-3/4 ring-[3px] border mt-1 border-white ring-[#0436699a]"
            src={
              top3[2].userInfo.image
                ? top3[2].userInfo.image
                : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
            }
            alt={"Third"}
          />
          <p className="text-xs m-2 text-[#19528A] font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            {top3[2].userInfo.name ? top3[2].userInfo.name : "Quiz Player"}
          </p>
        </motion.div>
        {/* <p className="font-semibold text-primary">3212</p> */}
        <motion.div
          className="rounded-t-3xl gradient-bg-3 bg-opacity-75 w-full  flex flex-col items-center justify-start pt-4"
          initial={{ height: 0 }}
          animate={{ height: `${height3}px` }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <span className="text-xl font-bold text-white">{top3[2]?.score}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Top3;
