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
  addNewSquadPosition: (id: string) => `/ajosquad/squad/${id}/update-position`,
  connectBank : "/ajosquad/payments/connect-bank"
}

export const userApiRoutes = {
  user: {
    getMe: "/user/me",
    getUserById: (userId: string) => `/user/${userId}`,
    getAllUsers: "/user",
    updateUserPersonal: (userId: string) => `/user/${userId}/personal-info`,
    updateUserEmployer: (userId: string) => `/user/${userId}/employer-info`,
    changePassword: (userId: string) => `/user/${userId}/update-password`

  },
  kyc: {
    getKYC: (userId: string) => `/user/${userId}/kyc`,
    createKYC: (userId: string) => `/user/${userId}/kyc`,
    updateKYC: (userId: string) => `/user/${userId}/kyc`
  },
  bank: {
    getAllBanks: "/ajosquad/bank",
    getBank: (bankId: string) => `/ajosquad/bank/${bankId}`,
    createBank: "/ajosquad/bank",
    updateBank: (bankId: string) => `/ajosquad/bank/${bankId}`,
    deleteBank: (bankId: string) => `/ajosquad/bank/${bankId}`
  },
  guarantor: {
    getAllGuarantors: (userId: string) => `/guarantor/query?id=${userId}`,
    getGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`,
    addGuarantor: "/guarantor",
    updateGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`,
    deleteGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`
  }
}

export const guarantorApiRoutes = {
  getAllGuarantors: "/guarantor/query",
  getGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`,
  addGuarantor: "/guarantor",
  updateGuarantor: (guarantorId: string) => `/guarantor/${guarantorId}`
}