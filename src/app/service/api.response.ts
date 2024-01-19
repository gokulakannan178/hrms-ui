export class ApiResponse {
  statusCode: number;
  message: number;
  response: any;
  unApprovedContents: number;
  rejectedContents:number;
  contentsToTranslateCount:number;
  translationApprovalCount:number;
  unResolvedQueries:number;
  unPickedQueries:number;
  activeAdvisories:number;
  usersCount:number;
  activeFarmers:number;
  inactiveAdvisories:number;
  inActiveUsersCount:number;
  activeUsersCount:number;
  activeAggregators:number;
  inactiveAggregators:number;
  inactiveFarmers:number;
  currentVaccinations:any;
  latestFeedbacks: number;
  latestQueries:number;
  resolvedQueriesCount:number;
  nextMonthEvents:any;
  logs:any;
  total:any;
  result:any;
  weatherData:any;
  code:any;
}

export interface State {
  id: string;
}