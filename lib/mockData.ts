export const mockUser = {
  id: "1",
  name: "John Doe",
  phone: "+1234567890",
  school: "Tech High School",
  profileImage: null,
};

export const mockSubjects = [
  {
    id: "1",
    name: "Mathematics",
    slug: "mathematics",
    icon: "📐",
    color: "#8b5cf6",
    order: 1,
  },
  {
    id: "2",
    name: "Science",
    slug: "science",
    icon: "🔬",
    color: "#10b981",
    order: 2,
  },
  {
    id: "3",
    name: "English",
    slug: "english",
    icon: "📚",
    color: "#f59e0b",
    order: 3,
  },
  {
    id: "4",
    name: "History",
    slug: "history",
    icon: "🏛️",
    color: "#ef4444",
    order: 4,
  },
  {
    id: "5",
    name: "Geography",
    slug: "geography",
    icon: "🌍",
    color: "#3b82f6",
    order: 5,
  },
  {
    id: "6",
    name: "Computer Science",
    slug: "computer-science",
    icon: "💻",
    color: "#06b6d4",
    order: 6,
  },
  {
    id: "7",
    name: "Physics",
    slug: "physics",
    icon: "⚛️",
    color: "#ec4899",
    order: 7,
  },
];

export const mockCourses = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description: "Learn the fundamentals of algebraic expressions and equations",
    subject: mockSubjects[0],
    difficulty: "beginner",
    thumbnail: null,
  },
  {
    id: "2",
    name: "Biology Basics",
    description: "Explore the building blocks of life and living organisms",
    subject: mockSubjects[1],
    difficulty: "beginner",
    thumbnail: null,
  },
  {
    id: "3",
    title: "Creative Writing",
    description: "Develop your storytelling and creative writing skills",
    subject: mockSubjects[2],
    difficulty: "intermediate",
    thumbnail: null,
  },
];

export const mockMessages = [
  {
    id: "1",
    role: "assistant" as const,
    content: "Hello! I'm your AI tutor. How can I help you today?",
    createdAt: new Date(),
  },
  {
    id: "2",
    role: "user" as const,
    content: "Can you help me understand quadratic equations?",
    createdAt: new Date(),
  },
  {
    id: "3",
    role: "assistant" as const,
    content:
      "Of course! A quadratic equation is a polynomial equation of degree 2. The standard form is ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0. Would you like me to explain how to solve them?",
    createdAt: new Date(),
  },
];
