import { ApprovedCompanyRepository } from "../repositories/approvedCompanyRepository";
import { ApprovedCompany } from "../types/approvedCompany";

export class ApprovedCompanyService {
  private approvedCompanyRepository: ApprovedCompanyRepository;

  constructor() {
    this.approvedCompanyRepository = new ApprovedCompanyRepository();
  }

  public async addApprovedCompany(approvedCompany: ApprovedCompany): Promise<void> {
    try {
      if (!approvedCompany.name || !approvedCompany.taxId) {
        throw new Error("Company name and tax ID are required.");
      }

      await this.approvedCompanyRepository.create(approvedCompany);
    } catch (error) {
      console.error("Failed to add approved company", error);
      throw error;
    }
  }

  public async getApprovedCompanyById(id: string): Promise<ApprovedCompany | null> {
    try {
      return await this.approvedCompanyRepository.getById(id);
    } catch (error) {
      console.error("Failed to get approved company", error);
      throw error;
    }
  }
}
