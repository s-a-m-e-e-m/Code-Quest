// user routes links
export const signup = 'http://localhost:3000/api/user/signup';
export const login = 'http://localhost:3000/api/user/signin';
export const logoutLink = 'http://localhost:3000/api/user/logout';
export const getUser = 'http://localhost:3000/api/user/getuser';
export const getUserById = 'http://localhost:3000/api/user';
export const sendOtpLink = 'http://localhost:3000/api/user/send/otp';
export const verifyOtpLink = 'http://localhost:3000/api/user/verify/otp';
export const editUserDescriptionLink = 'http://localhost:3000/api/user/update/description';

// comments
export const createComment = 'http://localhost:3000/api/comments/create';
export const updateComment = 'http://localhost:3000/api/comments/update';
export const deleteComment = 'http://localhost:3000/api/comments/delete';
export const getCommentsByUsers = 'http://localhost:3000/api/comments'

// issue route link
export const solveIssue = 'http://localhost:3000/api/problems/issue/solve';
export const getAllissue = 'http://localhost:3000/api/problems/issue/fetch';
export const getIssue = 'http://localhost:3000/api/problems/issue'

// store and leader board
export const storeLink = 'http://localhost:3000/api/utils/store/buy';
export const bountyLeaderBoardLink = 'http://localhost:3000/api/utils/leaderboard/bounty';
export const streakLeaderBoardLink = 'http://localhost:3000/api/utils/leaderboard/streak';
export const getAllAvatarsLink = 'http://localhost:3000/api/utils/avatars';
export const updateUserAvatarLinkPrefix = 'http://localhost:3000/api/utils';
export const updateUserAvatarLinkSuffix = 'choose-avatar';