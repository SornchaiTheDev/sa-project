import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB, queryDB, disconnectDB } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const students = await queryDB('SELECT * FROM students');
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await disconnectDB();
}
