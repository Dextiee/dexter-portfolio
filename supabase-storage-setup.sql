-- Supabase Storage Setup for Portfolio Images
-- Run this in your Supabase SQL Editor

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true);

-- Create policy to allow public read access to images
CREATE POLICY "Public read access for portfolio images" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload portfolio images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to update their images
CREATE POLICY "Authenticated users can update portfolio images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to delete their images
CREATE POLICY "Authenticated users can delete portfolio images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Optional: Set file size limit (5MB)
-- This is handled in the application code, but you can also set it at the database level
-- ALTER TABLE storage.objects ADD CONSTRAINT file_size_check CHECK (octet_length(decode(encode, 'base64')) <= 5242880);
