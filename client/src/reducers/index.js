import { combineReducers } from 'redux';
import ActiveEvent from './reducer_active_event';
import SearchEvents from './reducer_search_events';
import SaveEvent from './reducer_save_event';
import GetEvents from './reducer_get_events';
import GetUserInfo from './reducer_get_userinfo';
import GetFriends from './reducer_get_friends';
import SignUp from './reducer_sign_up';
import LogIn from './reducer_log_in';
import RemoveEvent from './reducer_remove_event';
import SearchArtists from './reducer_search_artists';
import SearchUsers from './reducer_search_users';
import Unfollow from './reducer_unfollow';
import UserEvents from './reducer_get_user_events';

const rootReducer = combineReducers({
  activeEvent: ActiveEvent,
  searchEvents: SearchEvents,
  saveEvent: SaveEvent,
  getEvents: GetEvents,
  getUserInfo: GetUserInfo,
  getFriends: GetFriends,
  signUp: SignUp,
  logIn: LogIn,
  removeEvent: RemoveEvent,
  searchArtists: SearchArtists,
  searchUsers: SearchUsers,
  unfollow: Unfollow,
  userEvents: UserEvents,
});

export default rootReducer;
