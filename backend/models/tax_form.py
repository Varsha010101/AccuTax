from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database.connection import Base

class TaxForm(Base):
    __tablename__ = "tax_forms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    annual_income = Column(Integer, nullable=False)
    section80C = Column(Integer, default=0)
    section80D = Column(Integer, default=0)
    section80E = Column(Integer, default=0)
    section80G = Column(Integer, default=0)
    prev_year_income = Column(Integer, default=0)
    second_last_year_income = Column(Integer, default=0)
    taxable_income = Column(Integer)
    tax_payable = Column(Integer)

    # Relationship to User table
    user = relationship("User", back_populates="tax_forms")

    def calculate_taxable_income(self):
        # Calculate deductions
        total_deductions = (
            self.section80C + self.section80D + self.section80E + self.section80G
        )
        
        # Calculate taxable income
        self.taxable_income = self.annual_income - total_deductions
        return self.taxable_income

    def calculate_tax_payable(self):
        # Ensure taxable income is calculated first
        if self.taxable_income is None:
            self.calculate_taxable_income()

        # Define tax slabs (example: modify according to your requirement)
        if self.taxable_income <= 250000:
            self.tax_payable = 0
        elif self.taxable_income <= 500000:
            self.tax_payable = self.taxable_income * 0.05
        elif self.taxable_income <= 1000000:
            self.tax_payable = self.taxable_income * 0.1
        else:
            self.tax_payable = self.taxable_income * 0.2
        
        return self.tax_payable

    def save_calculations(self, session):
        # Save the taxable income and tax payable to the database
        session.commit()  # This will save the updated values to the DB

    def __repr__(self):
        return f"<TaxForm {self.id}, User {self.user_id}>"
