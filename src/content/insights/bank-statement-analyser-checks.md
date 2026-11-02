---
title: What a bank statement analyser should check before you lend
description: "A practical checklist for credit teams: document integrity, balance continuity, bounces, existing EMIs, circular transactions and human judgement."
date: 2026-10-08
tags: [Lending, Underwriting, Bank statements]
featured: true
product: bank-statement-analyser
related:
  - { label: BSA (Bank Statement Analyser), path: /products/bank-statement-analyser/ }
  - { label: "NBFC & Lending", path: /industries/nbfc-lending/ }
---

For most retail and MSME loans in India, the bank statement is the single richest document in the file. It shows income, spending, existing obligations and stress, all in one place. It is also easy to misread when an underwriter has forty files in the queue and six months of PDF to scroll through.

A bank statement analyser exists to do the mechanical part quickly and the same way every time, so the credit officer can spend their attention on judgement. Here is what a good one should check, roughly in the order a careful underwriter would.

## 1. Is the document what it claims to be?

Before reading a single transaction, check the file itself.

- **Source and format.** Statements downloaded from net banking usually have a consistent layout, fonts and metadata for that bank. A PDF produced by a word processor or an image editor, or one modified after its creation date, deserves a closer look.
- **Account holder details.** Name, account number and IFSC should match the application and KYC. A statement in a relative's or a business partner's name is not necessarily fraud, but it changes the story.
- **Period coverage.** If you asked for six months, confirm that every day of those six months is present. Missing pages and missing date ranges are common, and not always innocent.

Where the borrower can share data through the RBI's Account Aggregator framework, prefer it. Data pulled with consent directly from the bank removes most of the document-tampering risk, and the analyser can then focus on the behaviour in the data.

## 2. Do the numbers add up?

Every row on a statement should satisfy a simple rule: the previous balance, plus credits, minus debits, equals the new balance. A tool can check this for every transaction on upload. A human almost never does.

Breaks in this chain are one of the strongest signals that a statement has been edited, because people who alter a salary credit or delete a bounce often forget to fix every running balance after it. The analyser should flag the exact row where continuity breaks.

## 3. What does real income look like?

Declared income and observed income are different things. The analyser should:

- Identify recurring salary credits by narration (employer name, "SAL", NEFT or IMPS references) and by timing.
- Check that salary amounts and dates are consistent month to month, and match the payslips on file.
- For self-employed borrowers, separate business receipts from transfers between the borrower's own accounts, loan disbursals and refunds, which are credits but not income.
- Flag large cash deposits, especially in the weeks just before the application. They may be genuine, but they inflate average balances.

## 4. What does the borrower already owe?

Existing obligations decide how much more someone can safely repay. Look for:

- **Recurring EMIs** through NACH, ECS or standing instructions, with the counterparty identified where the narration allows.
- **Recent disbursals** from other lenders. Several small loans in a short window can mean a borrower is stacking credit across apps.
- **Credit card payments** and their pattern: full payment, minimum due, or erratic.

These feed directly into a fixed obligation to income ratio (FOIR) calculation, which should use observed EMIs, not only what the borrower declared.

## 5. Signs of stress

- **Bounces and returns.** Inward cheque returns, NACH and ECS returns, and the associated return charges. Count them, date them, and note whether they cluster around particular months.
- **Penal charges.** Minimum balance charges and overdraft interest are quiet indicators of a tight month.
- **Balance on key days.** The average monthly balance hides a lot. Balance on EMI dates, and the lowest balance each month, say more about repayment capacity.

## 6. Unusual patterns

Some patterns are not proof of anything, but they warrant a question:

- **Circular transactions:** money going out to a party and coming back from the same party, often on the same or next day, which inflates turnover.
- **Round-figure transfers** in and out with no apparent business purpose.
- **Sudden changes in behaviour** in the last month or two compared to the rest of the period.
- **Transactions with high-risk categories** your credit policy cares about, identified from narrations.

## 7. A summary a human can act on

The output matters as much as the analysis. A credit officer should see, on one screen: monthly income and its stability, existing obligations, bounce count, balance trends, and a short list of flags with links to the exact transactions behind each one. A score without the evidence behind it is hard to trust and impossible to explain to a borrower or an auditor.

## Where the tool stops

An analyser is good at consistency, arithmetic and pattern-matching across hundreds of rows. It is not good at context. A cash deposit might be a wedding gift. A bounce might be a bank error. A drop in salary might be a planned job change with an offer letter in the file.

The goal is not to automate the credit decision. It is to make sure that every file gets the same thorough first read, and that the underwriter's time goes to the questions that actually need a person.
