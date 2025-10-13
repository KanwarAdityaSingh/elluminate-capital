const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5050';

export interface InvestmentCardSection {
  sectionId: string;
  title: string;
  content: string | string[];
  order: number;
}

export interface InvestmentCard {
  _id: string;
  cardId: string;
  companyName: string;
  companyLogo: string;
  sections: InvestmentCardSection[];
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentCardsResponse {
  success: boolean;
  message: string;
  data: InvestmentCard[];
}

class InvestmentCardService {
  async getAllInvestmentCards(): Promise<InvestmentCard[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/cards/getAllInvestmentCards`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch investment cards');
      }

      const result: InvestmentCardsResponse = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch investment cards');
      }
    } catch (error) {
      console.error('Error fetching investment cards:', error);
      throw error;
    }
  }
}

export default new InvestmentCardService();

