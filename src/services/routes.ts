export const authApiRoutes = {
  login: "/auth/login",
  signUp: "/auth/signup",
  refreshToken: "/auth/refresh-token",
  verifyOtp: "/auth/verify-otp",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  sendOtp: "/auth/send-otp"
}

export const squadApiRoutes = {
  getAllSquads: "/ajosquad/squad",
  getSquad: (id: string) => `/ajosquad/squad/${id}`,
  createSquad: "/ajosquad/squad",
  joinSquad: (id: string) => `/ajosquad/squad/${id}/join`,
  addNewSquadPosition: (id: string) => `/ajosquad/squad/${id}/add-position`
}

export const userApiRoutes = {
  user: {
    getMe: "/user/me",
    getUserById: (userId: string) => `/user/${userId}`,
    getAllUsers: "/user",
    updateUser: (userId: string) => `/user/${userId}`
  },
  kyc: {
    getKYC: (userId: string) => `/user/${userId}/kyc`,
    createKYC: (userId: string) => `/user/${userId}/kyc`,
    updateKYC: (userId: string) => `/user/${userId}/kyc`
  },
  bank: {
    getAllBanks: (userId: string) => `/user/${userId}/bank`,
    getBank: (userId: string, bankId: string) => `/user/${userId}/bank/${bankId}`,
    createBank: (userId: string) => `/user/${userId}/bank`,
  }
}

export const guarantorApiRoutes = {
  getAllGuarantors: "/guarantor/query",
  getGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`,
  addGuarantor: "/guarantor",
  updateGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`
}