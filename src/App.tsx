import React from "react";
import "react-chat-widget/lib/styles.css";
import "./App.css";
import CallMessage from "./CallMessage";
import SetupDialog from "./SetupDialog";
import AppStore from "./AppStore";


import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  renderCustomComponent,
} from "react-chat-widget";

import {
  WithStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { observer } from "mobx-react";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  });

interface Props extends WithStyles<typeof styles> {}

@observer
class App extends React.Component<Props> {
  private handleScreenShare() {}

  private handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  public componentDidMount() {
    const props = {
      disabled: false,
      onClick: () => {
        props.disabled = true;
        this.forceUpdate();
      },
    };

    renderCustomComponent(CallMessage, props, true);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <SetupDialog />
        <Widget
          title="talkdeskhelp"
          subtitle=""
          profileAvatar={AppStore.avatarUrl}
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
