export const authApiRoutes = {
  login: "/auth/login",
  signUp: "/auth/signup",
  refreshToken: "/auth/refresh-token",
  verifyOtp: "/auth/verify-otp",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  sendOtp: "/auth/send-otp",
  // google: "/auth/login/google"
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
  },
  guarantor: {
    getAllGuarantors: (userId: string) => `/guarantor/query?id=${userId}`,
    getGuarantor: (userId: string, guarantorId: string) => `/guarantor/${guarantorId}`,
    addGuarantor: (userId: string) => `/user/${userId}/guarantor`,
    updateGuarantor: (userId: string, guarantorId: string) => `/user/${userId}/guarantor/${guarantorId}`
  }
}