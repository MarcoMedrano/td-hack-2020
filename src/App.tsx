import React from "react";
import "react-chat-widget/lib/styles.css";
import "./App.css";
import ActionMessage from "./ActionMessage";
import SetupDialog from "./SetupDialog";
import AppStore from "./AppStore";
import HelpIcon from "@material-ui/icons/ContactSupport";
import PhoneIcon from "@material-ui/icons/PhoneEnabled";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";

import {
  Widget,
  addResponseMessage,
  toggleWidget,
  renderCustomComponent,
} from "react-chat-widget";

import {
  WithStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { observer } from "mobx-react";

import { MrtcFactory, IConnection, Logger } from "mark-ind-mrtc";
import { Fab } from "@material-ui/core";
import RemoteMouse from "./RemoteMouse";

Logger.configure({ level: "debug" });
const mrtc = MrtcFactory.build();


const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {}

@observer
class App extends React.Component<Props> {
  private connection?: IConnection;
  private mouse = new RemoteMouse();

  private handleToggle = async () => {
    toggleWidget();
    if (AppStore.mrtc_connected) return;

    await mrtc.connectServer(`td-customer-${AppStore.userName}`, {
      // host: "localhost",
      // port: 9000,
      // path: "/myapp",
      config: {
        iceServers: [{ urls: "stun:turn.tdx.sandcitadel.com:443" }],
        // sdpSemantics: "unified-plan",
      },
    });

    this.connection = await mrtc.connectRemote(
      `td-agent-${AppStore.agentName}`
    );
    console.log('Connected to', this.connection);
    this.connection.onData.sub((c, d: any) => {
      console.log("Peer message", d);
      switch (d.type) {
        case "screen-share":
          this.handleScreenShareRequest();
          break;
        case "mouse-click":
          this.mouse.move(d.x, d.y);
          this.mouse.click(d.x, d.y);
          break;
        case "mouse-move":
          this.mouse.move(d.x, d.y);
          break;
        case "mouse-draw":
          break;
        default:
          addResponseMessage(d.message);
      }
    });

    this.connection.onAudioShared.sub((c, m) => {
      console.info(`onAudioShared`, m);
      this.handlePhoneCallRequest(m.stream);
    });

    this.connection.onWebcamShared.sub((c, m) => {
      console.info(`onWebcamShared`, m);
      const video = document.getElementById("video") as HTMLMediaElement;
      video.srcObject = m.stream;
    });
    console.log('All initiated', this.connection);
    AppStore.mrtc_connected = true;
  };

  private handleScreenShareRequest() {
    const props = {
      disabled: false,
      message: "Share screen?",
      icon: <ScreenShareIcon />,
      onClick: () => {
        props.disabled = true;
        this.connection?.shareScreen({});
        this.mouse.show();
        this.forceUpdate();
      },
    };

    renderCustomComponent(ActionMessage, props, true);
  }

  private handlePhoneCallRequest(stream: MediaStream) {
    const props = {
      disabled: false,
      message: "Answer incoming call?",
      icon: <PhoneIcon />,
      onClick: () => {
        props.disabled = true;
        const audio = document.getElementById("audio") as HTMLMediaElement;
        audio.srcObject = stream;
        this.forceUpdate();
      },
    };

    renderCustomComponent(ActionMessage, props, true);
  }

  private handleNewUserMessage = (message: string) => {
    this.connection!.shareData({ message });
  };

  public componentDidMount() {
    addResponseMessage(
      "You need help? We are here to help! Connecting you with an agent right now."
    );
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <SetupDialog />
        <Widget
          title="talkdeskhelp"
          subtitle=""
          profileAvatar={AppStore.agentAvatarUrl}
          handleNewUserMessage={this.handleNewUserMessage}
          launcher={() => (
            <Fab
              color="primary"
              onClick={this.handleToggle}
              style={{ alignSelf: "flex-end" }}
            >
              <HelpIcon />
            </Fab>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
