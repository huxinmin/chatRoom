import {recUsersLoginSocket} from "./login";
import {recUsersLogoutSocket} from "./logout";

const recSockets = ()=>{
  recUsersLoginSocket();
  recUsersLogoutSocket();
};

export default recSockets;