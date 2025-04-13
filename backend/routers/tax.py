from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from models.tax_form import TaxForm
from schemas.tax_form import TaxFormCreate
from models.user import User

router = APIRouter()

@router.post("/submit_tax_form/")
def submit_tax_form(tax_form_data: TaxFormCreate, db: Session = Depends(get_db)):
    # Your tax form logic here
    new_tax_form = TaxForm(
        user_id=tax_form_data.user_id,
        annual_income=tax_form_data.annual_income,
        section80C=tax_form_data.section80C,
        section80D=tax_form_data.section80D,
        section80E=tax_form_data.section80E,
        section80G=tax_form_data.section80G,
        prev_year_income=tax_form_data.prev_year_income,
        second_last_year_income=tax_form_data.second_last_year_income
    )

    # Perform the calculations
    new_tax_form.calculate_taxable_income()
    new_tax_form.calculate_tax_payable()

    # Save the tax form in the database
    db.add(new_tax_form)
    db.commit()
    db.refresh(new_tax_form)

    return {"message": "Tax form submitted successfully", "taxable_income": new_tax_form.taxable_income, "tax_payable": new_tax_form.tax_payable}
