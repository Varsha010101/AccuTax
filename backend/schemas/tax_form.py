from pydantic import BaseModel

class TaxFormCreate(BaseModel):
    user_id: int
    annual_income: int
    section80C: int = 0
    section80D: int = 0
    section80E: int = 0
    section80G: int = 0
    prev_year_income: int = 0
    second_last_year_income: int = 0

    class Config:
        from_attributes = True
