import { Container, Stack, Box } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";


/** REDUX SLICE & SELECTOR **/
const TopUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({ topUsers })
);


export default function ActiveUsers() {
  const { topUsers } = useSelector(TopUsersRetriever); // Selector: Store dan => Data ni qabul qilib olish

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((ele: Member) => {
                  const imagePath = `${serverApi}/${ele.memberImage}`;
                  return (
                    <Card key={ele._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow>
                        <Typography className={"member-nickname"}>
                          {ele.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}