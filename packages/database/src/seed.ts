import { PrismaClient, CourseRole } from "../generated/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Support both seed-data (dash) and seed_data (underscore)
function seedDir(): string {
  const dash = path.join(__dirname, "..", "seed-data");
  const underscore = path.join(__dirname, "..", "seed_data");
  if (fs.existsSync(dash)) return dash;
  if (fs.existsSync(underscore)) return underscore;
  throw new Error("Seed folder not found. Create packages/database/seed-data or seed_data");
}
const SDIR = seedDir();
const load = <T>(file: string): T => JSON.parse(fs.readFileSync(path.join(SDIR, file), "utf8"));

async function main() {
  const users       = load<any[]>("users.json");
  const courses     = load<any[]>("courses.json");
  const sections    = load<any[]>("sections.json");
  const enrollments = load<any[]>("enrollments.json");
  const assignments = load<any[]>("assignments.json");
  const problems    = load<any[]>("problems.json");
  const submissions = load<any[]>("submissions.json");
  const artifacts   = load<any[]>("artifacts.json");
  const grades      = load<any[]>("grades.json");

  // Users
  const userByEmail = new Map<string, any>();
  for (const u of users) {
    const row = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { name: u.name, email: u.email }
    });
    userByEmail.set(row.email!, row);
  }

  // Courses
  const courseByCode = new Map<string, any>();
  for (const c of courses) {
    const row = await prisma.course.upsert({
      where: { code: c.code },
      update: { title: c.title, description: c.description ?? null },
      create: { code: c.code, title: c.title, description: c.description ?? null }
    });
    courseByCode.set(row.code, row);
  }

  // Sections — deterministic IDs so we can upsert by id
  const sectionKey = (courseCode: string, sectionCode: string) => `${courseCode}:${sectionCode}`;
  const sectionByKey = new Map<string, any>();
  for (const s of sections) {
    const course = courseByCode.get(s.courseCode);
    if (!course) continue;
    const id = sectionKey(s.courseCode, s.sectionCode);
    const row = await prisma.section.upsert({
      where: { id },
      update: { code: s.sectionCode },
      create: { id, courseId: course.id, code: s.sectionCode }
    });
    sectionByKey.set(id, row);
  }

  // Enrollments
  for (const e of enrollments) {
    const user = userByEmail.get(e.email);
    const section = sectionByKey.get(sectionKey(e.courseCode, e.sectionCode));
    if (!user || !section) continue;
    const role = (e.role as CourseRole) ?? CourseRole.STUDENT;
    await prisma.enrollment.upsert({
      where: { userId_sectionId: { userId: user.id, sectionId: section.id } },
      update: { role },
      create: { userId: user.id, sectionId: section.id, role }
    });
  }

  // Assignments — deterministic IDs by section + title
  const assignmentKey = (courseCode: string, sectionCode: string, title: string) =>
    `${courseCode}:${sectionCode}:${title}`;
  const assignmentByTitle = new Map<string, any>(); // key by plain title for problems/submissions lookup
  for (const a of assignments) {
    const sec = sectionByKey.get(sectionKey(a.courseCode, a.sectionCode));
    if (!sec) continue;
    const id = assignmentKey(a.courseCode, a.sectionCode, a.title);
    const row = await prisma.assignment.upsert({
      where: { id },
      update: { title: a.title, dueAt: a.dueAt ? new Date(a.dueAt) : null },
      create: { id, sectionId: sec.id, title: a.title, dueAt: a.dueAt ? new Date(a.dueAt) : null }
    });
    assignmentByTitle.set(a.title, row); // assume unique titles per seed set
  }

  // Problems
  const problemKey = (assignmentTitle: string, title: string) => `${assignmentTitle}:${title}`;
  const problemByKey = new Map<string, any>();
  for (const p of problems) {
    const asg = assignmentByTitle.get(p.assignmentTitle);
    if (!asg) continue;
    const row = await prisma.problem.create({
      data: { assignmentId: asg.id, title: p.title, points: p.points ?? 10 }
    });
    problemByKey.set(problemKey(p.assignmentTitle, p.title), row);
  }

  // Submissions
  const submissionKey = (email: string, assignmentId: string, problemId?: string | null) =>
    `${email}:${assignmentId}:${problemId ?? ""}`;
  const submissionByKey = new Map<string, any>();
  for (const s of submissions) {
    const user = userByEmail.get(s.email);
    const asg = assignmentByTitle.get(s.assignmentTitle);
    const prob = s.problemTitle ? problemByKey.get(problemKey(s.assignmentTitle, s.problemTitle)) : null;
    if (!user || !asg) continue;
    const row = await prisma.submission.create({
      data: {
        userId: user.id,
        assignmentId: asg.id,
        problemId: prob?.id ?? null,
        content: s.content ?? ""
      }
    });
    submissionByKey.set(submissionKey(user.email, asg.id, prob?.id), row);
  }

  // Artifacts (attach to existing submissions)
  for (const a of artifacts) {
    const user = userByEmail.get(a.email);
    const asg = assignmentByTitle.get(a.assignmentTitle);
    const prob = a.problemTitle ? problemByKey.get(problemKey(a.assignmentTitle, a.problemTitle)) : null;
    if (!user || !asg) continue;
    const sub = submissionByKey.get(submissionKey(user.email, asg.id, prob?.id));
    if (!sub) continue;
    await prisma.submissionArtifact.create({
      data: { submissionId: sub.id, label: a.label, url: a.url }
    });
  }

  // Grades
  for (const g of grades) {
    const user = userByEmail.get(g.email);
    const asg = assignmentByTitle.get(g.assignmentTitle);
    const prob = g.problemTitle ? problemByKey.get(problemKey(g.assignmentTitle, g.problemTitle)) : null;
    if (!user || !asg) continue;
    const sub = submissionByKey.get(submissionKey(user.email, asg.id, prob?.id));
    if (!sub) continue;
    await prisma.grade.create({
      data: {
        submissionId: sub.id,
        pointsEarned: g.pointsEarned,
        pointsMax: g.pointsMax
      }
    });
  }

  console.log("✅ JSON seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
