"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useGames } from "@/hooks/useGames";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Dashboard Components
import { UserWelcome } from "@/components/dashboard/user-welcome";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { AchievementCard } from "@/components/dashboard/achievement-card";
import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { NavigationMenu } from "@/components/dashboard/navigation-menu";

// Charts
import { ProgressChart } from "@/components/charts/progress-chart";
import { SkillsRadar } from "@/components/charts/skills-radar";
import { SubjectBarChart } from "@/components/charts/subject-bar-chart";

// Game-related components
import { GameCard } from "@/components/games/game-card";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const { progress, fetchProgress, isLoading: isProgressLoading } = useProgress();
  const { recommendedGames, fetchRecommendedGames, isLoading: isGamesLoading } = useGames();

  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAuthLoading && isAuthenticated && user?.role !== "student") {
      router.push(`/${user?.role}`);
      return;
    }

    // Fetch data
    if (isAuthenticated && user) {
      fetchProgress(user.id);
      fetchRecommendedGames(user.id);
    }
  }, [isAuthLoading, isAuthenticated, user, router, fetchProgress, fetchRecommendedGames]);

  const isLoading = isAuthLoading || isProgressLoading || isGamesLoading;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Welcome Section */}
      <UserWelcome 
        name={user?.name || "Student"} 
        avatarUrl={user?.avatarUrl} 
        lastLoginTime={user?.lastLoginAt}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Points" 
          value={progress?.totalPoints || 0} 
          change={progress?.pointsChange || 0} 
          icon="trophy" 
        />
        <StatsCard 
          title="Completed Activities" 
          value={progress?.completedActivities || 0} 
          change={progress?.activitiesChange || 0} 
          icon="check-circle" 
        />
        <StatsCard 
          title="Streak Days" 
          value={progress?.streakDays || 0} 
          change={0} 
          icon="flame" 
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-4 h-full">
                <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
                <ProgressChart data={progress?.weeklyProgress || []} />
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => router.push("/analytics/progress")}>
                    View Detailed Progress
                  </Button>
                </div>
              </Card>
            </div>
            <div>
              <Card className="p-4 h-full">
                <h3 className="text-lg font-medium mb-4">Skills Overview</h3>
                <SkillsRadar data={progress?.skills || []} />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Skills based on your recent activities.</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <RecentActivities activities={progress?.recentActivities || []} />
            </div>
            <div className="md:col-span-2">
              <Card className="p-4 h-full">
                <h3 className="text-lg font-medium mb-4">Recommended For You</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedGames?.slice(0, 4).map((game) => (
                    <GameCard 
                      key={game.id}
                      id={game.id}
                      title={game.title}
                      description={game.description}
                      imageUrl={game.imageUrl}
                      difficulty={game.difficulty}
                      onClick={() => router.push(`/learning/games/${game.id}`)}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => router.push("/learning/games")}>
                    See All Games
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="space-y-6">
            <ProgressOverview progress={progress} />
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Subject Performance</h3>
              <SubjectBarChart data={progress?.subjectPerformance || []} />
            </Card>
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities">
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Available Activities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedGames?.map((game) => (
                  <GameCard 
                    key={game.id}
                    id={game.id}
                    title={game.title}
                    description={game.description}
                    imageUrl={game.imageUrl}
                    difficulty={game.difficulty}
                    onClick={() => router.push(`/learning/games/${game.id}`)}
                  />
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {progress?.achievements?.map((achievement) => (
              <AchievementCard 
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                imageUrl={achievement.imageUrl}
                earnedAt={achievement.earnedAt}
                progress={achievement.progress}
                isLocked={achievement.isLocked}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation Menu */}
      <NavigationMenu 
        items={[
          { label: "Learning Games", href: "/learning/games", icon: "gamepad" },
          { label: "Chat with Advisor", href: "/chatbot", icon: "message-circle" },
          { label: "My Profile", href: "/student/profile", icon: "user" },
          { label: "Settings", href: "/student/settings", icon: "settings" }
        ]} 
      />
    </div>
  );
}

// Loading skeleton for the dashboard
function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-md" />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full md:col-span-2 rounded-md" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[250px] w-full rounded-md" />
          <Skeleton className="h-[250px] w-full md:col-span-2 rounded-md" />
        </div>
      </div>
    </div>
  );
}