import BackIcon from '../../assets/Icon/back.svg';
import MoreIcon from '../../assets/Icon/more.svg';
import FavIcon from '../../assets/Icon/favourite.svg'
import ShuffleIcon from '../../assets/Icon/shuffle.svg'
import PrevIcon from '../../assets/Icon/previous.svg'
import PauIcon from '../../assets/Icon/pause.svg'
import PlayIcon from '../../assets/Icon/play.svg'
import NexIcon from '../../assets/Icon/next.svg'
import RepeatIcon from '../../assets/Icon/repeat.svg'
import SearchIcon from '../../assets/Icon/search.svg'
import UserIcon from '../../assets/Icon/user.svg';
import DevIcon from '../../assets/Icon/developer.svg';
import SettingIcon from '../../assets/Icon/settings.svg';
import InfoIcon from '../../assets/Icon/information.svg';
import NotifiIcon from '../../assets/Icon/notification.svg';
import LockIcon from '../../assets/Icon/lock.svg';
import VolIcon from '../../assets/Icon/volume.svg';
import LinkIcon from '../../assets/Icon/link.svg'
import MusicBarIcon from '../../assets/Icon/musicbars.svg';
import GoogleIcon from "../../assets/Icon/google.svg";
import SpotifyIcon from "../../assets/Icon/spotify.svg";
import AppleIcon from "../../assets/Icon/apple.svg";
import PreLoader from "../../assets/pre.svg";
import VerifiedIcon from "../../assets/Icon/verified.svg";



// Page
import HomeScreen from '../HomeScreen/Home';
import SignupScreen from '../Auth/SignupScreen';
import SplashScreen from '../SplashScreen';
import OnboardingScreen from '../OnboardingScreen';
import NavBar from '../Component/NavBar';
import PlayScreen from '../PlayScreen/PlayScreen';
import SignUpInScreen from '../Auth/Signin_upScreen';
import Dev from '../Profile/Developer';
import Profile from '../Profile/Profile';
import LibraryScreen from '../Library/Library';
import SettingScreen from '../Profile/Setting/Setting';
import AboutScreen from '../Profile/Setting/About';
import SignUp from '../Auth/SignUp';
import LoginScreen from '../Auth/LoginScreen';
import ProfileEdit from '../Profile/ProfileEdit';
import RecentlyPlayed from '../HomeScreen/RecentlyPlayed';
import ArtistProfile from '../Component/artistProfile';
import PlayerContext from '../../PlayerContext';


// Logo
const logo = require('../../assets/AppImage/logo4.png');
const DevImage = require('../../assets/AppImage/Vishnu.jpg')
const Stack = require('../../assets/stack.json');

import React, {useState, useEffect} from 'react';

import {Dimensions} from 'react-native';

const { width: ScreenW, height: ScreenH } = Dimensions.get('window');

export {BackIcon, MoreIcon, VerifiedIcon, FavIcon, ShuffleIcon, PrevIcon, PauIcon, PlayIcon, NexIcon, RepeatIcon, SearchIcon, logo,UserIcon,DevIcon, PlayerContext, ProfileEdit, RecentlyPlayed, SignupScreen,SplashScreen,OnboardingScreen, NavBar, PlayScreen, Dev, Profile, LibraryScreen, DevImage, Stack, ScreenW, ScreenH, SettingIcon, SettingScreen, HomeScreen,VolIcon, LockIcon,NotifiIcon,InfoIcon, AboutScreen, LinkIcon, MusicBarIcon, SignUp, React, useState, useEffect,GoogleIcon, SpotifyIcon, AppleIcon, SignUpInScreen, LoginScreen, ArtistProfile,
}