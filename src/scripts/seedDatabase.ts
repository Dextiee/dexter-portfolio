import { supabase } from '../lib/supabase';
import { sampleProjects, sampleExperiences } from '../data/seedData';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed projects
    console.log('📁 Seeding projects...');
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .insert(sampleProjects)
      .select();

    if (projectsError) {
      console.error('❌ Error seeding projects:', projectsError);
      return;
    }

    console.log(`✅ Seeded ${projects?.length || 0} projects`);

    // Seed experiences
    console.log('💼 Seeding experiences...');
    const { data: experiences, error: experiencesError } = await supabase
      .from('experiences')
      .insert(sampleExperiences)
      .select();

    if (experiencesError) {
      console.error('❌ Error seeding experiences:', experiencesError);
      return;
    }

    console.log(`✅ Seeded ${experiences?.length || 0} experiences`);
    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
};

// Run seeding if this file is executed directly
if (import.meta.hot) {
  // This will only run in development
  console.log('To seed the database, call seedDatabase() in your browser console');
}
