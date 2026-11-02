---
title: "Spotting a fake payslip: 7 checks lenders can automate"
description: Seven checks software can run on every slip, without slowing down honest borrowers.
date: 2026-10-17
tags: [Lending, Fraud prevention, Payslips]
product: payslip-checker
related:
  - { label: Payslip Checker, path: /products/payslip-checker/ }
---

A salary slip is one of the easiest documents in a loan file to fake. Templates are a search away, editing a PDF takes minutes, and most lenders verify payslips by eye, if at all. That makes it a soft target for anyone inflating income to qualify for a bigger loan.

The good news is that a fake payslip usually has to get many small things right at once, and it rarely does. Each of the checks below is something software can do consistently on every file. None of them needs the borrower to do anything extra.

## 1. The arithmetic

Start with the simplest test. Gross earnings should equal the sum of the earnings lines: basic, HRA, special allowance and so on. Net pay should equal gross minus total deductions. Year-to-date figures, where shown, should grow sensibly from month to month.

People who edit a payslip tend to change the one number they care about, usually basic or net pay, and leave the totals or the other components alone. A tool that recomputes every total will catch this every time.

## 2. Statutory deductions that match the salary

Indian payslips carry deductions with known rules, and the rules have to agree with the earnings shown.

- **Provident Fund.** The employee's EPF contribution is 12% of basic wages plus dearness allowance. Many employers cap the base at the statutory wage ceiling of ₹15,000 a month. Either way, the PF line should follow from the basic, not float independently.
- **ESI.** ESI applies to employees whose gross wages are within the scheme's wage limit, currently ₹21,000 a month. A high-salary slip showing an ESI deduction, or a low-salary slip from a covered employer without one, is worth a question.
- **Professional tax.** Professional tax is set by each state, within a constitutional cap of ₹2,500 a year. The amount should match the slab for the state where the employee works, and it should be absent in states that do not levy it.
- **TDS.** Income tax deducted should be broadly plausible for the annualised salary. You do not need to recompute it exactly, but an inflated salary with an unchanged TDS line is a classic giveaway.

Rates and limits do change, so keep these rules in configuration, not hard-coded, and review them when government notifications change.

## 3. The bank statement agrees

The most reliable cross-check is the salary credit itself. Net pay on the slip should match the credit in the bank statement for the same month, within a small tolerance, and the credit should arrive around the same date each month, ideally with the employer's name in the narration.

If the borrower submits three payslips and a statement covering the same period, this check costs nothing and closes off most simple edits.

## 4. The employer exists and is the right size

A slip from a company that does not exist, or that exists but could not plausibly employ this person at this salary, is a red flag. Useful public sources include:

- The Ministry of Corporate Affairs company records, for registration status and the registered address.
- The GST portal's taxpayer search, if a GSTIN is printed on the slip.
- EPFO's establishment search, to confirm that an employer deducting PF is actually registered with EPFO.

These lookups can be automated or semi-automated and cached, since the same employers appear again and again across your files.

## 5. Document forensics

Look at the file, not just the text on it.

- **Metadata.** The PDF's creation and modification dates, and the software that produced it. A payslip for March created in an image editor in June needs explaining.
- **Fonts and alignment.** Edited figures often use a slightly different font, size or baseline from the surrounding text.
- **Layers and images.** A scanned or flattened image with a sharp, clean block of text pasted over one area is a common edit.

Forensic checks produce probabilities, not proof. Treat them as reasons to look closer.

## 6. Consistency across months

Ask for three slips rather than one and compare them. Employee ID, designation, date of joining, PAN, UAN and bank account should stay the same. Basic pay should not jump without a reason such as an appraisal month. The layout, logo position and footer text should be identical from a real payroll system.

Fabricated sets often get one month right and then drift.

## 7. Calendar logic

Small details trip up fabricated documents:

- Paid days that exceed the days in the month, such as 31 paid days in a 30-day month.
- Loss-of-pay days that do not reduce pay.
- A pay date that falls before the end of the pay period, or a month name spelled differently from the rest of the document.

These are trivial for software to check and surprisingly common in fakes.

## What to do with a flag

A failed check should route the file to a person, not reject the borrower automatically. Payroll systems have bugs, small employers use spreadsheets, and honest people send blurry photos. The aim is to put the right files in front of a credit officer with the reason highlighted, so they can ask one specific question rather than re-read everything.

Run all seven checks together and record which ones passed. Over time that record tells you which checks actually catch problems in your portfolio, and which ones only create noise.
