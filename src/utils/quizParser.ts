import { CaseStudy } from '@/data';

export function parseQuizMarkdown(content: string): CaseStudy[] {
  const quizzes: CaseStudy[] = [];
  const lines = content.split('\n');
  let currentCategory: 'A' | 'B' | 'C' | 'D' = 'A';
  let currentQuiz: Partial<CaseStudy> | null = null;
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Category match
    const categoryMatch = trimmed.match(/^##\s*Category:\s*([A-D])/i);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].toUpperCase() as any;
      continue;
    }
    
    // ID match
    const idMatch = trimmed.match(/^###\s*ID:\s*(\S+)/i);
    if (idMatch) {
      if (currentQuiz && currentQuiz.id && currentQuiz.question) {
        quizzes.push(currentQuiz as CaseStudy);
      }
      currentQuiz = {
        id: idMatch[1],
        scenario: '',
        question: '',
        options: [],
        correctAnswerIndex: 0,
        explanation: '',
        category: currentCategory
      };
      continue;
    }
    
    if (currentQuiz) {
      // Question match
      const qMatch = trimmed.match(/^####\s*Question:\s*(.*)/i);
      if (qMatch) {
        currentQuiz.question = qMatch[1];
        continue;
      }
      
      // Option match
      const optMatch = trimmed.match(/^-\s*\[([ xX])\]\s*(.*)/);
      if (optMatch) {
        const isCorrect = optMatch[1].toLowerCase() === 'x';
        const optionText = optMatch[2].trim();
        currentQuiz.options = currentQuiz.options || [];
        currentQuiz.options.push(optionText);
        if (isCorrect) {
          currentQuiz.correctAnswerIndex = currentQuiz.options.length - 1;
        }
        continue;
      }
      
      // Explanation match
      const expMatch = trimmed.match(/^\*\*Explanation:\*\*\s*(.*)/i);
      if (expMatch) {
        currentQuiz.explanation = expMatch[1];
        continue;
      }
    }
  }
  
  if (currentQuiz && currentQuiz.id && currentQuiz.question) {
    quizzes.push(currentQuiz as CaseStudy);
  }
  
  return quizzes;
}
