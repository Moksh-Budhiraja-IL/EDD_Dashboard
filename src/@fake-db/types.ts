import { WHOperationRows } from './table/static-data';
// Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import {
  CardStatsSquareProps,
  CardStatsVerticalProps,
  CardStatsHorizontalProps,
  CardStatsWithAreaChartProps,
  CardStatsHorizontalWithDetailsProps
} from 'src/@core/components/card-statistics/types'

// Template Search
//----------------
export type AppBarSearchType = {
  id: number
  url: string
  icon: string
  title: string
  category: string
}
export type AutocompleteType = {
  year: number
  title: string
}

// Faq Page
//-------------------
export type FaqQAndAType = {
  id: string
  answer: string
  question: string
}
export type FaqType = {
  [key: string]: {
    id: string
    icon: string
    title: string
    subtitle: string
    qandA: FaqQAndAType[]
  }
}

// Card Statistics Page
//-------------------------------
export type CardStatsType = {
  statsSquare: CardStatsSquareProps[]
  statsVertical: CardStatsVerticalProps[]
  statsHorizontal: CardStatsHorizontalProps[]
  statsWithAreaChart: CardStatsWithAreaChartProps[]
  statsHorizontalWithDetails: CardStatsHorizontalWithDetailsProps[]
}

// User Profile pages
//-------------------
export type ProjectTableRowType = {
  id: number
  date: string
  name: string
  leader: string
  status: number
  avatar?: string
  avatarGroup: string[]
  avatarColor?: ThemeColor
}
export type ProfileHeaderType = {
  fullName: string
  coverImg: string
  location: string
  profileImg: string
  joiningDate: string
  designation: string
  designationIcon?: string
}
export type ProfileAvatarGroupType = {
  name: string
  avatar: string
}
export type ProfileChipType = {
  title: string
  color: ThemeColor
}
export type ProfileTabCommonType = {
  icon: string
  value: string
  property: string
}
export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
export type ProfileConnectionsType = {
  name: string
  avatar: string
  isFriend: boolean
  connections: string
}
export type ProfileTeamsTechType = {
  title: string
  avatar: string
  members: number
  chipText: string
  ChipColor: ThemeColor
}
export type TeamsTabType = {
  title: string
  avatar: string
  description: string
  extraMembers: number
  chips: ProfileChipType[]
  avatarGroup: ProfileAvatarGroupType[]
}
export type ProjectsTabType = {
  hours: string
  tasks: string
  title: string
  budget: string
  client: string
  avatar: string
  members: number
  daysLeft: number
  comments: number
  deadline: string
  startDate: string
  totalTask: number
  budgetSpent: string
  description: string
  chipColor: ThemeColor
  completedTask: number
  avatarColor?: ThemeColor
  avatarGroup: ProfileAvatarGroupType[]
}
export type ConnectionsTabType = {
  name: string
  tasks: string
  avatar: string
  projects: string
  connections: string
  designation: string
  isConnected: boolean
  chips: ProfileChipType[]
}
export type ProfileTabType = {
  teams: ProfileTeamsType[]
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  overview: ProfileTabCommonType[]
  teamsTech: ProfileTeamsTechType[]
  connections: ProfileConnectionsType[]
}
export type UserProfileActiveTab = ProfileTabType | TeamsTabType[] | ProjectsTabType[] | ConnectionsTabType[]

// Data Grid page
//---------------
export type DataGridRowType = {
  id: number
  age: string
  post: string
  city: string
  email: string
  salary: number
  status: number
  avatar: string
  full_name: string
  start_date: string
  experience: string
}
export type PinCodeTableRowType = {
  [key: string]: any;
  cPin: number
  city: string
  state: string
  id: number
  stateFullName: string
}
export interface Weekday {
  id: number;
  weekday: string;
  weekdayBool: boolean;
}

export interface Courier {
  [key: string]: any;
  id: number;
  courierName: string;
  courierStatus: boolean;
  weekdays: Weekday[];
}

export interface WHOperationRowType {
  [key: string]: any;
  id: number;
  wh: string;
  whStatus: boolean;
  courier: Courier[];
}

export type SDD_NDD_Superfast_PincodesRowType = {
  [key: string]: any;
  id: number;
  cPin: string
  shipsCity: string
  priority: boolean
  LBD: boolean
  is2HourDelivery: boolean
};

export type SBDTableRowType = {
  [key: string]: any;
  id: number;
  WH: string
  SBD: boolean
  is2HourDelivery: boolean
};
export type DBDTableRowType = {
  [key: string]: any;
  id: number;
  cPin: number
  DBD: number
};
export type LBDTableRowType = {
  [key: string]: any;
  id: number;
  cPin: number
  wh: string
  minWt: number
  maxWt: number
  LBD: number
};
export type CutOffRowType = {
  [key: string]: any;
  id: number,
  WH: string,
  type: string,
  cutOff: string
};
export type WHConfigRowType = {
  [key: string]: any;
  id: number
  wh: string
  panIndiaStatus: boolean
  panIndiaEDDConfigCsv: File | null
  SDDStatus: boolean
  SDDPincodesCsv: File | null
  NDDStatus: boolean
  NDDPincodesCsv: File | null
  SuperfastStatus: boolean
  SuperfastPincodesCsv: File | null
  panIndiaCutOff: string
  SDDCutOff: string
  NDDCutOff: string
  SuperfastCutOff: string
  workingDays: number
  SBD: number
}

// Help Center
//------------
export type HelpCenterSubcategoryArticlesType = {
  slug: string
  title: string
  content: string
}
export type HelpCenterSubcategoriesType = {
  icon: string
  slug: string
  title: string
  articles: HelpCenterSubcategoryArticlesType[]
}
export type HelpCenterCategoriesType = {
  icon: string
  slug: string
  title: string
  avatarColor: ThemeColor
  subCategories: HelpCenterSubcategoriesType[]
}
export type HelpCenterArticlesOverviewType = {
  img: string
  slug: string
  title: string
  subtitle: string
}
