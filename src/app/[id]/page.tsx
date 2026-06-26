import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseQuizMarkdown } from '@/utils/quizParser';
import AlgorithmClientPage from './AlgorithmClientPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!['toileting', 'feeding', 'transfer'].includes(id)) {
    return notFound();
  }
  
  // Read markdown file
  let quizzes: any[] = [];
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'cases', `${id}Cases.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    quizzes = parseQuizMarkdown(fileContent);
  } catch (error) {
    console.error(`Failed to load quizzes for ${id}:`, error);
  }
  
  return <AlgorithmClientPage algoId={id} quizzes={quizzes} />;
}

export async function generateStaticParams() {
  return [
    { id: 'toileting' },
    { id: 'feeding' },
    { id: 'transfer' },
  ];
}
