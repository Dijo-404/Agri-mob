import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, Clock, GraduationCap, Layers, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { farmingCourses, type Course, type CourseModule } from "@/data/farmingCourses";

export default function LearnFarmerCourse() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [completedModules, setCompletedModules] = useState<Record<string, string[]>>({});

  const getCourseProgress = (courseId: string) => {
    const completed = completedModules[courseId] || [];
    const course = farmingCourses.find((c) => c.id === courseId);
    if (!course) return 0;
    return Math.round((completed.length / course.modules.length) * 100);
  };

  const markModuleComplete = (courseId: string, moduleId: string) => {
    setCompletedModules((prev) => {
      const completed = prev[courseId] || [];
      if (!completed.includes(moduleId)) {
        return { ...prev, [courseId]: [...completed, moduleId] };
      }
      return prev;
    });
    setSelectedModule(null);
  };

  const isModuleCompleted = (courseId: string, moduleId: string) => {
    return (completedModules[courseId] || []).includes(moduleId);
  };

  // Render module content
  if (selectedModule && selectedCourse) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="glass-card frosted-border rounded-2xl p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedModule(null)}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-display font-semibold text-foreground">{selectedModule.title}</h1>
        </div>

        <div className="glass-card frosted-border rounded-2xl p-6 space-y-6">
          {selectedModule.videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              <img
                src={selectedModule.imageUrl || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"}
                alt={selectedModule.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={selectedModule.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Play className="h-8 w-8 text-primary ml-1" />
                </a>
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                Click to watch on YouTube
              </p>
            </div>
          )}

          <div className="space-y-4">
            {selectedModule.content.map((paragraph, idx) => (
              <p key={idx} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <Button
            onClick={() => markModuleComplete(selectedCourse.id, selectedModule.id)}
            className="w-full"
            style={{ backgroundColor: selectedCourse.color }}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
          </Button>
        </div>
      </motion.div>
    );
  }

  // Render course detail
  if (selectedCourse) {
    const progress = getCourseProgress(selectedCourse.id);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="glass-card frosted-border rounded-2xl p-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <div className="flex items-start gap-4">
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${selectedCourse.color}20` }}
            >
              <BookOpen className="h-8 w-8" style={{ color: selectedCourse.color }} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold text-foreground">{selectedCourse.title}</h1>
              <p className="text-muted-foreground mt-1">{selectedCourse.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  {selectedCourse.modules.length} Modules
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{progress}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {selectedCourse.modules.map((module, idx) => {
            const completed = isModuleCompleted(selectedCourse.id, module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedModule(module)}
                className="glass-card frosted-border rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    completed ? "" : "bg-muted"
                  }`}
                  style={completed ? { backgroundColor: selectedCourse.color } : {}}
                >
                  {completed ? (
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : (
                    <span className="font-semibold text-foreground">{idx + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{module.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {module.type === "quiz" ? "Quiz" : "Lesson"}
                  </p>
                </div>
                <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Render course list
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_40%)]" />
        <div className="relative p-6 sm:p-8 text-center">
          <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold">Learn Farmer Course</h1>
          <p className="text-white/80 mt-1">Enhance your farming knowledge</p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {farmingCourses.map((course, idx) => {
          const progress = getCourseProgress(course.id);
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCourse(course)}
              className="glass-card frosted-border rounded-2xl p-5 flex gap-4 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${course.color}20` }}
              >
                <BookOpen className="h-7 w-7" style={{ color: course.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {course.modules.length} Modules
                  </span>
                </div>
                <div className="mt-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: course.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{progress}% Complete</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
