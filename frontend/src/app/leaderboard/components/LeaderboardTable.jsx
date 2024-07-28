"use client";
import { getCookiesClient } from "@/clientSideFunctions";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { motion } from "framer-motion";

const LeaderboardTable = ({ leaderboard, isFetching, startFrom }) => {
  if (!leaderboard) {
    return;
  }
  console.log(leaderboard);

  const cookies = getCookiesClient();
  console.log(cookies);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className=" mx-auto my-4 w-full p-3 max-w-screen-lg rounded-[30px]  border-primary shadow-sm drop-shadow-sm shadow-black">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ paddingLeft: "5px", paddingRight: "0px" }}
                className="!font-semibold"
              >
                Rank
              </TableCell>
              <TableCell sx={{ paddingX: "15px" }} className="!font-semibold">
                User
              </TableCell>
              <TableCell
                sx={{ paddingRight: "5px", paddingLeft: "0px" }}
                className="!font-semibold"
                align="right"
              >
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                loading...
              </TableRow>
            )}
            {!isFetching &&
              leaderboard.map((item, index) => (
                <motion.tr
                  key={index + item.user}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="w-full font-semibold"
                >
                  <TableCell
                    sx={{ paddingLeft: "5px", paddingRight: "0px" }}
                    component="th"
                    scope="row"
                  >
                    # {index + startFrom}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      // display: "flex",
                    }}
                  >
                    <span className="flex gap-2 items-center">
                      <img
                        className="rounded-full w-6 sm:w-8 h-6 md:h-8 "
                        src={
                          item.userInfo.image
                            ? item.userInfo.image
                            : "http://res.cloudinary.com/dwjhsf65j/image/upload/v1722151225/profile_pictures/lvak9mh0vrp4kgr6loca.jpg"
                        }
                        alt={"Third"}
                      />
                      {item.userInfo.name
                        ? item.userInfo.name
                        : item.userInfo._id}
                    </span>
                  </TableCell>
                  <TableCell sx={{ paddingRight: "5px" }} align="right">
                    {item.score}
                  </TableCell>
                </motion.tr>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
