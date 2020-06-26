import { observable } from "mobx";
import { SimpleEventDispatcher } from 'strongly-typed-events';

class AppStore {

  private _onMessageReceived = new SimpleEventDispatcher<string>();
  
  @observable public setupDialogOpened = true;
  @observable public userName = "Marco";
  @observable public avatarUrl = "https://secure.gravatar.com/avatar/68b4ced53058ee78731b20ae62b86874?s=64";
  @observable public pageUrl = "https://www.dx.com";

  @observable public panelExpanded = true;
  @observable public connected = false;

  @observable public currentMessage = "";
  @observable public uiMessages = observable([]) as any;

  public get onMessageReceived() { return this._onMessageReceived.asEvent() }


  connect = async () => {
    this.connected = true;
  }

  sendCurrentMessage = async () => {

  }

}

export default new AppStore();
