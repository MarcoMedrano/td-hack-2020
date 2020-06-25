import { observable } from "mobx";
import { SimpleEventDispatcher } from 'strongly-typed-events';

class AppStore {

  private _onMessageReceived = new SimpleEventDispatcher<string>();
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
