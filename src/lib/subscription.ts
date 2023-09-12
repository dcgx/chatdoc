import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { subscriptions } from "./db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const checkSubscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const _subscriptions = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));

  if (!_subscriptions[0]) {
    return false;
  }

  const userSubscription = _subscriptions[0];

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};