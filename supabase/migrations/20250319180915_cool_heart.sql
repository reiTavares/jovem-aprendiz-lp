/*
  # Create applications table for Jovem Aprendiz

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `whatsapp` (text)
      - `responsible_name` (text)
      - `responsible_phone` (text)
      - `region` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `applications` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  whatsapp text NOT NULL,
  responsible_name text NOT NULL,
  responsible_phone text NOT NULL,
  region text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON applications
  FOR SELECT
  TO authenticated
  USING (true);