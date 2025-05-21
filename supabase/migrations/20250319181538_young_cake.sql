/*
  # Add INSERT policy for applications table

  1. Changes
    - Add INSERT policy to allow anyone to submit applications
    - This is necessary because form submissions come from unauthenticated users
*/

CREATE POLICY "Enable insert access for all users"
  ON applications
  FOR INSERT
  TO anon
  WITH CHECK (true);