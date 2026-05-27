import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth.middleware";

export const getMeService = async (req) => {
  const authUser = await authMiddleware(req);

  if (!authUser) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: authUser.id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,

      profile: {
        select: {
          fullName: true,
          phone: true,
        },
      },

      company: {
        select: {
          name: true,
          category: true,
          gstNumber: true,
          experience: true,
          city: true,
          state: true,
          verificationStatus: true,
        },
      },

      subscriptions: {
        where: {
          status: "ACTIVE",
        },
        select: {
          id: true,
          planName: true,
          status: true,
          startDate: true,
          endDate: true,
        },
        take: 1,
      },
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  let accessStatus = {
    profileCompleted: true,
    hasActiveSubscription: true,
    verificationStatus: "VERIFIED",
    nextStep: "DASHBOARD_ALLOWED",
    dashboardAccess: true,
  };

  if (user.role !== "ADMIN") {
    const profileCompleted = !!user.profile && !!user.company;
    const hasActiveSubscription = user.subscriptions.length > 0;
    const verificationStatus =
      user.company?.verificationStatus || "PROFILE_PENDING";

    let nextStep = "DASHBOARD_ALLOWED";
    let dashboardAccess = true;

    if (!profileCompleted) {
      nextStep = "COMPLETE_PROFILE";
      dashboardAccess = false;
    } else if (!hasActiveSubscription) {
      nextStep = "PAY_MEMBERSHIP";
      dashboardAccess = false;
    } else if (verificationStatus === "PENDING_APPROVAL") {
      nextStep = "PENDING_APPROVAL";
      dashboardAccess = false;
    } else if (verificationStatus === "REJECTED") {
      nextStep = "REJECTED";
      dashboardAccess = false;
    } else if (verificationStatus !== "VERIFIED") {
      nextStep = "COMPLETE_PROFILE";
      dashboardAccess = false;
    }

    accessStatus = {
      profileCompleted,
      hasActiveSubscription,
      verificationStatus,
      nextStep,
      dashboardAccess,
    };
  }

  return {
    user,
    accessStatus,
  };
};