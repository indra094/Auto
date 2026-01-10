import { DB } from './db';
import { TeamService } from './TeamService';
import { FounderService } from './FounderService';
import { ExternalService } from './ExternalService';

export const IntelligenceService = {
  getDashboardStats: async () => {
    await DB.simulateDelay();
    
    // Fetch real counts from simulated backend
    const employees = await TeamService.getEmployees();
    const founders = await FounderService.getFounders();
    const customers = await ExternalService.getCustomers();

    const teamSizeHuman = founders.length + employees.filter(e => e.type === 'Human').length;
    const teamSizeAI = employees.filter(e => e.type === 'AI').length;
    
    // Mock risk calculation logic
    const alignmentScore = await FounderService.getAlignmentScore();
    let risk = 'Low';
    if (alignmentScore < 80) risk = 'Medium';
    if (alignmentScore < 60) risk = 'High';

    return {
      risk,
      burnRate: teamSizeHuman * 5000, // Mock calculation
      runway: teamSizeHuman > 0 ? '12 months' : 'Infinite',
      teamSize: `${teamSizeHuman} + ${teamSizeAI} AI`,
      customerCount: customers.length
    };
  },

  getRelevantConnections: async () => {
     await DB.simulateDelay();
     return [
       { id: 1, name: 'John VC', role: 'Investor', company: 'Sequoia', relevance: 'High' },
       { id: 2, name: 'Sarah Angel', role: 'Angel', company: 'AngelList', relevance: 'High' }
     ];
  }
};
