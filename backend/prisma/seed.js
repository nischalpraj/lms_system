const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed templates
  const templates = await Promise.all([
    prisma.resumeTemplate.upsert({
      where: { resume_id: 'tpl_single_01' },
      update: {},
      create: {
        resume_id: 'tpl_single_01',
        resume_name: 'Classic Single Column',
        layout_type: 'single',
        theme_config: { primaryColor: '#2c3e50', fontFamily: 'Georgia', fontSize: 14 },
        is_system: true,
        is_active: true,
      },
    }),
    prisma.resumeTemplate.upsert({
      where: { resume_id: 'tpl_modern_01' },
      update: {},
      create: {
        resume_id: 'tpl_modern_01',
        resume_name: 'Modern Professional',
        layout_type: 'modern',
        theme_config: { primaryColor: '#3498db', fontFamily: 'Inter', fontSize: 13, accentColor: '#2ecc71' },
        is_system: true,
        is_active: true,
      },
    }),
    prisma.resumeTemplate.upsert({
      where: { resume_id: 'tpl_minimal_01' },
      update: {},
      create: {
        resume_id: 'tpl_minimal_01',
        resume_name: 'Minimal Clean',
        layout_type: 'minimal',
        theme_config: { primaryColor: '#000000', fontFamily: 'Helvetica', fontSize: 12 },
        is_system: true,
        is_active: true,
      },
    }),
    prisma.resumeTemplate.upsert({
      where: { resume_id: 'tpl_double_01' },
      update: {},
      create: {
        resume_id: 'tpl_double_01',
        resume_name: 'Double Column Executive',
        layout_type: 'double',
        theme_config: { primaryColor: '#8e44ad', fontFamily: 'Calibri', fontSize: 13, sidebarWidth: '30%' },
        is_system: true,
        is_active: true,
      },
    }),
  ]);
  console.log(`✅ ${templates.length} templates seeded`);

  // Admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@resumebuilder.com' },
    update: {},
    create: {
      full_name: 'Super Admin',
      email: 'admin@resumebuilder.com',
      password: adminPassword,
      role: 'admin',
      is_active: true,
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // Student users
  const studentPassword = await bcrypt.hash('Student@123', 10);
  const student1 = await prisma.user.upsert({
    where: { email: 'john.doe@student.edu' },
    update: {},
    create: {
      full_name: 'John Doe',
      email: 'john.doe@student.edu',
      password: studentPassword,
      role: 'student',
      lms_user_id: 'lms_user_001',
      is_active: true,
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'jane.smith@student.edu' },
    update: {},
    create: {
      full_name: 'Jane Smith',
      email: 'jane.smith@student.edu',
      password: studentPassword,
      role: 'student',
      lms_user_id: 'lms_user_002',
      is_active: true,
    },
  });
  console.log(`✅ Student users seeded`);

  // Skills
  const skillData = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'TypeScript', category: 'Programming' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Tools' },
    { name: 'Python', category: 'Programming' },
  ];

  for (const s of skillData) {
    await prisma.skill.upsert({
      where: { normalized_name: s.name.toLowerCase() },
      update: {},
      create: { name: s.name, normalized_name: s.name.toLowerCase(), category: s.category },
    });
  }
  console.log(`✅ ${skillData.length} skills seeded`);

  // Sample resume for student1
  const jsSkill = await prisma.skill.findUnique({ where: { normalized_name: 'javascript' } });
  const nodeSkill = await prisma.skill.findUnique({ where: { normalized_name: 'node.js' } });

  const resume = await prisma.resume.create({
    data: {
      title: 'Software Engineer Resume',
      status: 'published',
      visibility: 'private',
      user_id: student1.user_id,
      template_id: 'tpl_modern_01',
      education: {
        create: [{
          institution: 'Tribhuvan University',
          degree: 'Bachelor of Science',
          field_of_study: 'Computer Science',
          gpa: 3.7,
          start_date: new Date('2019-08-01'),
          end_date: new Date('2023-07-01'),
          display_order: 0,
        }],
      },
      workExperience: {
        create: [{
          company: 'Tech Solutions Pvt. Ltd.',
          position: 'Junior Developer',
          location: 'Kathmandu, Nepal',
          description: 'Built RESTful APIs and maintained React frontend applications.',
          start_date: new Date('2023-08-01'),
          is_current: true,
          display_order: 0,
        }],
      },
      resumeSkills: {
        create: [
          { skill_id: jsSkill.id, proficiency_level: 'expert', display_order: 0 },
          { skill_id: nodeSkill.id, proficiency_level: 'intermediate', display_order: 1 },
        ],
      },
    },
  });
  console.log(`✅ Sample resume created: ${resume.title}`);

  // LMS Course & Achievement
  const course = await prisma.lmsCourse.upsert({
    where: { code: 'CS101' },
    update: {},
    create: {
      title: 'Introduction to Web Development',
      code: 'CS101',
      category: 'Programming',
      credit_hours: 3,
      is_published: true,
    },
  });

  await prisma.lmsAchievement.create({
    data: {
      type: 'completion',
      grade: 'A',
      score: 92.5,
      completed_at: new Date('2023-12-01'),
      user_id: student1.user_id,
      course_id: course.id,
    },
  });
  console.log(`✅ LMS data seeded`);

  console.log('\n🎉 Seeding complete!\n');
  console.log('Admin credentials:  admin@resumebuilder.com / Admin@123');
  console.log('Student credentials: john.doe@student.edu / Student@123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
