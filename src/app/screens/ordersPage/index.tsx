import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, Paper, InputBase } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import "../../../css/orders.css"
import LocationOn from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enum/order.enum";
import OrderService from "../../services/OrderService";


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data))
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch())
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then(data => setPausedOrders(data)) //redux storage ga yuklaymiz
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then(data => setProcessOrders(data)) //redux storage ga yuklaymiz
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then(data => setFinishedOrders(data)) //redux storage ga yuklaymiz
      .catch((err) => console.log(err));
  }, [orderInquiry]);

  /* HANDLERS */
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table-list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Stack className={"order-right-1"}>
            <Box className={"order-info-box"}>
              <Box className={"member-box"}>
                <div className={"order-user-img"}>
                  <img
                    src={"/icons/default-user.svg"}
                    className={"order-user-avatar"}
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={"/icons/user-badge.svg"}
                      className={"order-user-prof-img"}
                    />
                  </div>
                </div>
                <Box className={"user-title"}>Kevin</Box>
                <Box className={"user-title-desc"}>User</Box>
              </Box>
              <Box className={"just-line"}></Box>
              <Box className={"location"}><LocationOn />South Korea, Busan</Box>
            </Box>
          </Stack>
          <Stack className={"order-right-2"}>
            <Box className={"order-info-box"}>
              <Paper
                className={"card-info"}
                component="form">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Card number: 8600 3946 5304 0023"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Paper>
              <Box className={"card-row"}>
                <Paper
                  className={"card-info-1"}
                  component="form">
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="07/24"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </Paper>
                <Paper
                  className={"card-info-2"}
                  component="form">
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="CVV: 010"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </Paper>
              </Box>
              <Paper
                className={"card-info-3"}
                component="form">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Kamoliddin Khalilov"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Paper>
            </Box>
            <Stack className={"cards-icon"}>
              <img src="/icons/western-card.svg" />
              <img src="/icons/master-card.svg" />
              <img src="/icons/paypal-card.svg" />
              <img src="/icons/visa-card.svg" />
            </Stack>
          </Stack>
        </Stack>
      </Container >;
    </div >)
}