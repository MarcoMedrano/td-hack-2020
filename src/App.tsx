import React from "react";
import "react-chat-widget/lib/styles.css";
import "./App.css"
import CallMessage from './CallMessage'

import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  renderCustomComponent
} from "react-chat-widget";

import {
  WithStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  });
  
const avatar = 'https://secure.gravatar.com/avatar/68b4ced53058ee78731b20ae62b86874?s=64';

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  
  private handleScreenShare() {}

  private handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  public componentDidMount() {
    const props = { disabled: false, onClick: ()=>{props.disabled = true; this.forceUpdate()} };

    renderCustomComponent(CallMessage, props, true);
  }


  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Widget
          title="talkdeskhelp"
          subtitle=""
          profileAvatar={avatar}
          handleNewUserMessage={this.handleNewUserMessage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
