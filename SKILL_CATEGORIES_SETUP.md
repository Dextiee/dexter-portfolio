# Skill Categories Setup

This feature allows admins to dynamically create and manage skill categories instead of using hardcoded categories.

## Database Setup

1. Run the SQL script in your Supabase SQL Editor:
   ```sql
   -- Copy and paste the contents of skill-categories-setup.sql
   ```

2. The script will:
   - Create the `skill_categories` table
   - Insert default categories (Frontend, Backend, Database, DevOps, Languages, Mobile, Design, IoT)
   - Set up proper permissions for public read access and authenticated user management

## Features Added

### New Components
- **CategoryForm**: Modal form for adding/editing skill categories
- **CategoryList**: Admin interface for managing categories
- **useSkillCategories**: Hook for category CRUD operations

### Updated Components
- **SkillForm**: Now uses dynamic categories from database instead of hardcoded list
- **AdminDashboard**: Added new "Categories" tab for category management
- **DataContext**: Added category management functions

### Database Schema
```sql
skill_categories:
- id (UUID, Primary Key)
- name (TEXT, Unique)
- description (TEXT, Optional)
- created_at (TIMESTAMP)
```

## Usage

1. **Admin Access**: Log into the admin dashboard
2. **Navigate**: Click on the "Categories" tab
3. **Add Category**: Click "Add New Category" button
4. **Edit/Delete**: Use the edit/delete buttons on each category card
5. **Skills**: When adding skills, categories will be dynamically loaded from the database

## Migration Notes

- Existing skills will continue to work with their current categories
- You can manually update skill categories through the admin interface
- The system maintains backward compatibility with existing skill data

## Security

- Public read access for categories (needed for skill form dropdown)
- Authenticated users can manage categories (add/edit/delete)
- Categories are validated for uniqueness
