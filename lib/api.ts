const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api"

interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
}

// Get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

// Get admin token from localStorage
function getAdminToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminToken")
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }

    if (requiresAuth) {
      const token = getAuthToken()
      if (!token) {
        return {
          error: "Authentication required",
          status: 401,
        }
      }
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        error: data?.message || `Request failed with status ${response.status}`,
        status: response.status,
      }
    }

    return { data, status: response.status }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Network error",
      status: 0,
    }
  }
}

// Public API helpers (no auth required)
export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: "GET" })
}

export async function post<T>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

// Authenticated API helpers
export async function authGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: "GET" }, true)
}

export async function authPost<T>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> {
  return request<T>(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    true
  )
}

export async function authPut<T>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> {
  return request<T>(
    endpoint,
    {
      method: "PUT",
      body: JSON.stringify(body),
    },
    true
  )
}

// Admin authenticated request helper
async function adminRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getAdminToken()
    if (!token) {
      return {
        error: "Admin authentication required",
        status: 401,
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string>),
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        error: data?.message || `Request failed with status ${response.status}`,
        status: response.status,
      }
    }

    return { data, status: response.status }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Network error",
      status: 0,
    }
  }
}

// Admin API helpers
export async function adminGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  return adminRequest<T>(endpoint, { method: "GET" })
}

export async function adminPut<T>(
  endpoint: string,
  body?: unknown
): Promise<ApiResponse<T>> {
  return adminRequest<T>(endpoint, {
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  })
}

// ==================== TYPES ====================

// User types
export interface User {
  id: string
  name: string
  age?: number
  email?: string
  mobile?: string
  boardId?: string
  classId?: string
  isVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

// Auth types
export interface LoginOtpResponse {
  message: string
}

export interface VerifyOtpResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  message: string
  userId: string
}

// Academic types
export interface Board {
  id: string
  name: string
}

export interface Class {
  id: string
  name: string
  boardId: string
}

export interface Subject {
  id: string
  name: string
  classId: string
}

export interface Topic {
  id: string
  name: string
  subjectId: string
}

export interface SubTopic {
  id: string
  name: string
  topicId: string
}

// Tutor types
export interface TutorSession {
  id: string
  userId: string
  subjectId: string
  topicId: string
  createdAt: string
}

export interface TutorMessage {
  id: string
  sessionId: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}

export interface SendMessageResponse {
  userMessage: TutorMessage
  tutorMessage: TutorMessage
}

// User profile update types
export interface UpdateProfileResponse {
  message: string
  user: User
}

// ==================== API FUNCTIONS ====================

// Auth API functions
export const authApi = {
  loginOtp: (mobile: string) =>
    post<LoginOtpResponse>("/auth/login-otp", { mobile }),

  verifyOtp: (mobile: string, otp: string) =>
    post<VerifyOtpResponse>("/auth/verify-otp", { mobile, otp }),

  register: (data: {
    name: string
    age: number
    mobile: string
    email?: string
    password: string
    board_id: string
    class_id: string
  }) => post<RegisterResponse>("/auth/register", data),

  // Get current user (authenticated)
  me: () => authGet<User>("/auth/me"),
}

// Academic API functions (public - no auth required)
export const academicApi = {
  getBoards: () => get<Board[]>("/academic/boards"),

  getClassesByBoard: (boardId: string) =>
    get<Class[]>(`/academic/classes/${boardId}`),

  getSubjectsByClass: (classId: string) =>
    get<Subject[]>(`/academic/subjects/${classId}`),

  getTopicsBySubject: (subjectId: string) =>
    get<Topic[]>(`/academic/topics/${subjectId}`),

  getSubTopicsByTopic: (topicId: string) =>
    get<SubTopic[]>(`/academic/subtopics/${topicId}`),
}

// User API functions (authenticated)
export const userApi = {
  getProfile: () => authGet<User>("/user/me"),

  updateProfile: (data: { board_id?: string; class_id?: string }) =>
    authPut<UpdateProfileResponse>("/user/me", data),
}

// Tutor API functions (authenticated)
export const tutorApi = {
  // Create a new tutoring session
  createSession: (data: { subjectId: string; topicId: string }) =>
    authPost<TutorSession>("/tutor/session", data),

  // Get all sessions for the current user
  getSessions: () => authGet<TutorSession[]>("/tutor/sessions"),

  // Get messages for a specific session
  getMessages: (sessionId: string) =>
    authGet<TutorMessage[]>(`/tutor/messages/${sessionId}`),

  // Send a message and get AI response
  sendMessage: (data: { sessionId: string; content: string }) =>
    authPost<SendMessageResponse>("/tutor/message", data),
}

// ==================== ADMIN TYPES ====================

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export interface AdminLoginResponse {
  token: string
  user: AdminUser
}

export interface AdminStudentUser {
  id: string
  name: string
  age: number
  email: string | null
  mobile: string | null
  boardId: string | null
  classId: string | null
  boardName: string | null
  className: string | null
  role: string
  isActive: boolean
  isVerified: boolean
  createdAt: string
}

export interface AdminActionResponse {
  message: string
}

// ==================== ADMIN API FUNCTIONS ====================

export const adminApi = {
  // Admin login (email + password)
  login: (email: string, password: string) =>
    post<AdminLoginResponse>("/admin/login", { email, password }),

  // Get all users (requires admin auth)
  getUsers: () => adminGet<AdminStudentUser[]>("/admin/users"),

  // Get user by ID (requires admin auth)
  getUserById: (userId: string) =>
    adminGet<AdminStudentUser>(`/admin/users/${userId}`),

  // Deactivate a user
  deactivateUser: (userId: string) =>
    adminPut<AdminActionResponse>(`/admin/users/${userId}/deactivate`),

  // Activate a user
  activateUser: (userId: string) =>
    adminPut<AdminActionResponse>(`/admin/users/${userId}/activate`),
}
