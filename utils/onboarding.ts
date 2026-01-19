export const getOnboardingProgress = (step?: number): number => {
    const progressMap = [0, 10, 50, 100];
    return progressMap[Math.min(step ?? 0, 3)];
};