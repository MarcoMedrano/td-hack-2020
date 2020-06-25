import * as React from "react";
import { IconButton, ChatIcon } from "@livechat/ui-kit";
import AppStore from './AppStore';

const Minimized = () => (
  <div
    onClick={()=> {AppStore.panelExpanded = true}}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      background: "#0093FF",
      color: "#fff",
      borderRadius: "50%",
      cursor: "pointer",
    }}
  >
    <IconButton color="#fff">
      <ChatIcon />
    </IconButton>
  </div>
);

export default Minimized;
