// ─── Finance ────────────────────────────────────────────────────────────────

const emiCalculator = {
  id: "emi-calculator",
  name: "EMI Calculator",
  category: "Finance",
  description: "Calculate monthly EMI for any loan",
  inputs: [
    { name: "loanAmount", label: "Loan Amount (₹)", type: "number", placeholder: "500000" },
    { name: "interestRate", label: "Annual Interest Rate (%)", type: "number", placeholder: "8.5" },
    { name: "tenure", label: "Tenure (months)", type: "number", placeholder: "60" },
  ],
  calculate: ({ loanAmount, interestRate, tenure }) => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure);
    if (!P || !r || !n) return null;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return {
      primary: { label: "Monthly EMI", value: `₹${emi.toFixed(2)}` },
      breakdown: [
        { label: "Principal Amount", value: `₹${P.toLocaleString()}` },
        { label: "Total Interest", value: `₹${totalInterest.toFixed(2)}` },
        { label: "Total Payment", value: `₹${totalPayment.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "An EMI (Equated Monthly Instalment) is a fixed payment you make to a lender every month until the loan is fully paid off. It covers both the principal and the interest component. EMIs make large purchases — like a home, car, or personal loan — affordable by spreading the cost over time.",
    formula: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)\n\nWhere P = principal loan amount, r = monthly interest rate (annual rate ÷ 12 ÷ 100), n = loan tenure in months.",
    example: "Loan: ₹5,00,000 | Rate: 8.5% p.a. | Tenure: 60 months\nMonthly rate r = 8.5 / 12 / 100 = 0.00708\nEMI = 5,00,000 × 0.00708 × (1.00708)⁶⁰ / ((1.00708)⁶⁰ − 1) ≈ ₹10,248",
    faqs: [
      { q: "What is EMI?", a: "EMI stands for Equated Monthly Instalment — a fixed monthly payment that repays both principal and interest on a loan." },
      { q: "How is EMI calculated?", a: "EMI is calculated using the formula: P × r × (1+r)ⁿ / ((1+r)ⁿ−1), where P is the loan amount, r is the monthly interest rate, and n is the number of months." },
      { q: "Does prepayment reduce EMI?", a: "Yes. Prepayment reduces the outstanding principal, which lowers either your EMI amount or the remaining tenure, depending on your lender's policy." },
      { q: "What affects EMI amount?", a: "Three factors: loan amount (higher principal = higher EMI), interest rate (higher rate = higher EMI), and tenure (longer tenure = lower EMI but more total interest)." },
      { q: "Is EMI tax deductible?", a: "The interest portion of home loan EMIs is deductible under Section 24(b) up to ₹2 lakh per year. Principal repayment qualifies under Section 80C up to ₹1.5 lakh." },
    ],
    related: ["sip-calculator", "fd-calculator", "simple-interest-calculator", "compound-interest-calculator"],
  },
};

const sipCalculator = {
  id: "sip-calculator",
  name: "SIP Calculator",
  category: "Finance",
  description: "Calculate returns on Systematic Investment Plan",
  inputs: [
    { name: "monthlyInvestment", label: "Monthly Investment (₹)", type: "number", placeholder: "5000" },
    { name: "annualReturn", label: "Expected Annual Return (%)", type: "number", placeholder: "12" },
    { name: "years", label: "Investment Period (years)", type: "number", placeholder: "10" },
  ],
  calculate: ({ monthlyInvestment, annualReturn, years }) => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 12 / 100;
    const n = parseFloat(years) * 12;
    if (!P || !r || !n) return null;
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    const gains = futureValue - invested;
    return {
      primary: { label: "Maturity Value", value: `₹${futureValue.toFixed(0)}` },
      breakdown: [
        { label: "Amount Invested", value: `₹${invested.toLocaleString()}` },
        { label: "Estimated Gains", value: `₹${gains.toFixed(0)}` },
        { label: "Total Value", value: `₹${futureValue.toFixed(0)}` },
      ],
    };
  },
  content: {
    what: "A SIP (Systematic Investment Plan) lets you invest a fixed amount in a mutual fund every month. Instead of timing the market with a lump sum, SIP uses rupee cost averaging — you buy more units when prices are low and fewer when prices are high. Over time, compounding turns small monthly contributions into significant wealth.",
    formula: "FV = P × ((1 + r)ⁿ − 1) / r × (1 + r)\n\nWhere P = monthly investment, r = monthly return rate (annual ÷ 12 ÷ 100), n = total months.",
    example: "Monthly SIP: ₹5,000 | Return: 12% p.a. | Period: 10 years\nMonthly rate r = 0.01, n = 120 months\nFV ≈ ₹11,61,695 | Invested: ₹6,00,000 | Gains: ₹5,61,695",
    faqs: [
      { q: "What is a SIP?", a: "SIP is a method of investing a fixed sum regularly (usually monthly) in a mutual fund scheme. It enforces financial discipline and benefits from compounding." },
      { q: "Is SIP return guaranteed?", a: "No. SIP returns depend on mutual fund performance which is linked to market conditions. The calculator uses an assumed rate for estimation." },
      { q: "Can I stop or pause a SIP?", a: "Yes. Most mutual funds allow you to pause, reduce, or stop a SIP anytime without penalty, though it affects your final corpus." },
      { q: "What is a good SIP return rate to assume?", a: "Historically, equity mutual funds in India have delivered 10–14% CAGR over the long term. For conservative estimates, use 10–11%." },
      { q: "SIP vs lump sum — which is better?", a: "SIP is better for salaried investors without a large lump sum. Lump sum can outperform SIP in a consistently rising market, but SIP reduces timing risk." },
    ],
    related: ["emi-calculator", "fd-calculator", "ppf-calculator", "compound-interest-calculator"],
  },
};

const fdCalculator = {
  id: "fd-calculator",
  name: "FD Calculator",
  category: "Finance",
  description: "Calculate Fixed Deposit maturity amount",
  inputs: [
    { name: "principal", label: "Principal Amount (₹)", type: "number", placeholder: "100000" },
    { name: "rate", label: "Annual Interest Rate (%)", type: "number", placeholder: "6.5" },
    { name: "years", label: "Duration (years)", type: "number", placeholder: "3" },
  ],
  calculate: ({ principal, rate, years }) => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);
    if (!P || !r || !n) return null;
    const maturity = P * Math.pow(1 + r / 4, 4 * n);
    const interest = maturity - P;
    return {
      primary: { label: "Maturity Amount", value: `₹${maturity.toFixed(2)}` },
      breakdown: [
        { label: "Principal", value: `₹${P.toLocaleString()}` },
        { label: "Interest Earned", value: `₹${interest.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "A Fixed Deposit (FD) is a savings instrument offered by banks and NBFCs where you deposit a lump sum for a fixed tenure at a predetermined interest rate. FDs are one of the safest investments in India, offering guaranteed returns regardless of market conditions.",
    formula: "Maturity = P × (1 + r/4)^(4n)\n\nWhere P = principal, r = annual interest rate (decimal), n = tenure in years. This formula assumes quarterly compounding, which is standard for most Indian bank FDs.",
    example: "Principal: ₹1,00,000 | Rate: 6.5% p.a. | Tenure: 3 years\nMaturity = 1,00,000 × (1 + 0.065/4)^12 ≈ ₹1,21,308\nInterest earned: ₹21,308",
    faqs: [
      { q: "What is an FD?", a: "A Fixed Deposit is a financial instrument where you deposit money with a bank for a fixed period at a fixed rate of interest." },
      { q: "Is FD interest taxable?", a: "Yes. FD interest is fully taxable as per your income tax slab. TDS of 10% is deducted by the bank if interest exceeds ₹40,000 per year (₹50,000 for senior citizens)." },
      { q: "Can I break an FD early?", a: "Yes, most banks allow premature withdrawal with a penalty of 0.5–1% reduction in the applicable interest rate." },
      { q: "What is the safest FD tenure?", a: "1–3 year FDs often offer the best balance of rate and liquidity. Long-term FDs lock your money in at current rates which may lag inflation." },
      { q: "FD vs SIP — which is better?", a: "FD gives guaranteed, predictable returns with no risk. SIP in equity mutual funds can deliver higher returns over 5+ years but carries market risk." },
    ],
    related: ["sip-calculator", "ppf-calculator", "simple-interest-calculator", "compound-interest-calculator"],
  },
};

const gstCalculator = {
  id: "gst-calculator",
  name: "GST Calculator",
  category: "Finance",
  description: "Calculate GST inclusive or exclusive amounts",
  inputs: [
    { name: "amount", label: "Amount (₹)", type: "number", placeholder: "1000" },
    { name: "gstRate", label: "GST Rate (%)", type: "number", placeholder: "18" },
  ],
  calculate: ({ amount, gstRate }) => {
    const A = parseFloat(amount);
    const G = parseFloat(gstRate);
    if (!A || !G) return null;
    const gstAmount = (A * G) / 100;
    const total = A + gstAmount;
    return {
      primary: { label: "Total (with GST)", value: `₹${total.toFixed(2)}` },
      breakdown: [
        { label: "Original Amount", value: `₹${A.toFixed(2)}` },
        { label: "GST Amount", value: `₹${gstAmount.toFixed(2)}` },
        { label: "Total Payable", value: `₹${total.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "GST (Goods and Services Tax) is India's unified indirect tax that replaced VAT, service tax, and excise duty. It applies to the supply of goods and services across India. The GST council has set four main rate slabs: 5%, 12%, 18%, and 28%.",
    formula: "GST Amount = Original Amount × GST Rate / 100\nTotal = Original Amount + GST Amount\n\nTo find original price from GST-inclusive price:\nOriginal = Total / (1 + GST Rate / 100)",
    example: "Amount: ₹1,000 | GST Rate: 18%\nGST = 1,000 × 18 / 100 = ₹180\nTotal = ₹1,000 + ₹180 = ₹1,180",
    faqs: [
      { q: "What are the GST slabs in India?", a: "GST has four main slabs: 5% (essentials like food, transport), 12% (processed food, clothes above ₹1,000), 18% (most services, electronics), and 28% (luxury goods, tobacco, automobiles)." },
      { q: "What is CGST and SGST?", a: "For intra-state transactions, GST is split equally between CGST (Central GST) and SGST (State GST). For inter-state transactions, IGST (Integrated GST) applies." },
      { q: "How do I calculate GST backwards?", a: "To find the original price from a GST-inclusive amount: Original = Total ÷ (1 + rate/100). For example, ₹1,180 at 18% → 1,180 ÷ 1.18 = ₹1,000." },
      { q: "Is GST applicable on exports?", a: "No. Exports are zero-rated under GST, meaning the rate is 0% and exporters can claim refund of input tax credit." },
    ],
    related: ["discount-calculator", "percentage-calculator", "emi-calculator"],
  },
};

const ppfCalculator = {
  id: "ppf-calculator",
  name: "PPF Calculator",
  category: "Finance",
  description: "Calculate Public Provident Fund maturity",
  inputs: [
    { name: "yearlyInvestment", label: "Yearly Investment (₹)", type: "number", placeholder: "150000" },
    { name: "rate", label: "Annual Interest Rate (%)", type: "number", placeholder: "7.1" },
    { name: "years", label: "Duration (years)", type: "number", placeholder: "15" },
  ],
  calculate: ({ yearlyInvestment, rate, years }) => {
    const P = parseFloat(yearlyInvestment);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(years);
    if (!P || !r || !n) return null;
    let balance = 0;
    for (let i = 0; i < n; i++) {
      balance = (balance + P) * (1 + r);
    }
    const invested = P * n;
    const interest = balance - invested;
    return {
      primary: { label: "Maturity Amount", value: `₹${balance.toFixed(2)}` },
      breakdown: [
        { label: "Total Invested", value: `₹${invested.toLocaleString()}` },
        { label: "Interest Earned", value: `₹${interest.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "PPF (Public Provident Fund) is a long-term government-backed savings scheme in India with a 15-year lock-in. It offers tax benefits under Section 80C, tax-free interest, and tax-free maturity — making it one of the rare EEE (Exempt-Exempt-Exempt) investment options. The maximum yearly investment is ₹1,50,000.",
    formula: "Maturity = Σ P × (1 + r)^(n−i+1) for i = 1 to n\n\nOr iteratively: Balance = (Balance + Yearly Deposit) × (1 + r) each year.\nWhere r = annual interest rate and n = number of years.",
    example: "Yearly Investment: ₹1,50,000 | Rate: 7.1% | Duration: 15 years\nMaturity ≈ ₹40,68,209 | Invested: ₹22,50,000 | Interest: ₹18,18,209",
    faqs: [
      { q: "What is PPF?", a: "PPF is a 15-year government savings scheme with guaranteed returns. Investments up to ₹1.5 lakh per year qualify for Section 80C deduction." },
      { q: "Can I withdraw from PPF early?", a: "Partial withdrawal is allowed from the 7th year onwards. Premature closure is permitted only under specific conditions like medical emergencies or higher education." },
      { q: "What is the current PPF interest rate?", a: "The PPF rate is revised quarterly by the government. As of recent quarters it is 7.1% p.a., but confirm the current rate at your bank or post office." },
      { q: "Can I extend PPF after 15 years?", a: "Yes, in blocks of 5 years — with or without additional contributions. Extension with contributions continues to grow the corpus with compounding." },
      { q: "Is PPF better than FD?", a: "PPF generally offers better post-tax returns than FD since PPF interest is tax-free, while FD interest is fully taxable as per your income slab." },
    ],
    related: ["sip-calculator", "fd-calculator", "compound-interest-calculator", "emi-calculator"],
  },
};

const simpleInterestCalculator = {
  id: "simple-interest-calculator",
  name: "Simple Interest",
  category: "Finance",
  description: "Calculate simple interest on principal",
  inputs: [
    { name: "principal", label: "Principal (₹)", type: "number", placeholder: "10000" },
    { name: "rate", label: "Annual Rate (%)", type: "number", placeholder: "5" },
    { name: "time", label: "Time (years)", type: "number", placeholder: "2" },
  ],
  calculate: ({ principal, rate, time }) => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);
    if (!P || !R || !T) return null;
    const si = (P * R * T) / 100;
    return {
      primary: { label: "Simple Interest", value: `₹${si.toFixed(2)}` },
      breakdown: [
        { label: "Principal", value: `₹${P.toLocaleString()}` },
        { label: "Interest", value: `₹${si.toFixed(2)}` },
        { label: "Total Amount", value: `₹${(P + si).toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "Simple Interest is interest calculated only on the original principal, not on accumulated interest. It is commonly used for short-term loans, car loans, and some personal loans. The interest amount stays the same for each period, making it straightforward to calculate.",
    formula: "SI = (P × R × T) / 100\n\nWhere P = principal amount, R = annual interest rate (%), T = time in years.\nTotal Amount = P + SI",
    example: "Principal: ₹10,000 | Rate: 5% p.a. | Time: 2 years\nSI = (10,000 × 5 × 2) / 100 = ₹1,000\nTotal = ₹11,000",
    faqs: [
      { q: "What is simple interest?", a: "Simple interest is calculated only on the original principal. Unlike compound interest, it does not factor in previously earned interest." },
      { q: "When is simple interest used?", a: "Simple interest is used in short-term loans, auto loans, certain personal loans, and fixed-income instruments where the rate is applied to the original principal only." },
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is calculated on the original principal only. Compound interest is calculated on the principal plus accumulated interest, resulting in faster growth over time." },
    ],
    related: ["compound-interest-calculator", "fd-calculator", "emi-calculator", "ppf-calculator"],
  },
};

const compoundInterestCalculator = {
  id: "compound-interest-calculator",
  name: "Compound Interest",
  category: "Finance",
  description: "Calculate compound interest on principal",
  inputs: [
    { name: "principal", label: "Principal (₹)", type: "number", placeholder: "10000" },
    { name: "rate", label: "Annual Rate (%)", type: "number", placeholder: "8" },
    { name: "time", label: "Time (years)", type: "number", placeholder: "5" },
    { name: "n", label: "Compounding / Year", type: "number", placeholder: "12" },
  ],
  calculate: ({ principal, rate, time, n }) => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const N = parseFloat(n) || 1;
    if (!P || !R || !T) return null;
    const amount = P * Math.pow(1 + R / N, N * T);
    const ci = amount - P;
    return {
      primary: { label: "Compound Interest", value: `₹${ci.toFixed(2)}` },
      breakdown: [
        { label: "Principal", value: `₹${P.toLocaleString()}` },
        { label: "Interest", value: `₹${ci.toFixed(2)}` },
        { label: "Total Amount", value: `₹${amount.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Often called 'interest on interest', it causes investments to grow exponentially. Albert Einstein reportedly called it the eighth wonder of the world.",
    formula: "A = P × (1 + r/n)^(n×t)\nCI = A − P\n\nWhere P = principal, r = annual rate (decimal), n = compounding frequency per year, t = time in years.",
    example: "Principal: ₹10,000 | Rate: 8% | Time: 5 years | Compounding: 12/year\nA = 10,000 × (1 + 0.08/12)^60 ≈ ₹14,898\nCI = ₹4,898",
    faqs: [
      { q: "What is compound interest?", a: "Compound interest is interest computed on the principal plus all previously earned interest. It accelerates growth compared to simple interest." },
      { q: "What compounding frequency gives the best returns?", a: "The more frequent the compounding, the higher the returns. Daily compounding gives slightly more than monthly, which gives more than annually." },
      { q: "How long does it take to double money?", a: "Use the Rule of 72: divide 72 by the annual interest rate. At 8%, money doubles in about 9 years (72 ÷ 8 = 9)." },
    ],
    related: ["simple-interest-calculator", "sip-calculator", "fd-calculator", "ppf-calculator"],
  },
};

// ─── Health ──────────────────────────────────────────────────────────────────

const bmiCalculator = {
  id: "bmi-calculator",
  name: "BMI Calculator",
  category: "Health",
  description: "Calculate Body Mass Index",
  inputs: [
    { name: "weight", label: "Weight (kg)", type: "number", placeholder: "70" },
    { name: "height", label: "Height (cm)", type: "number", placeholder: "175" },
  ],
  calculate: ({ weight, height }) => {
    const W = parseFloat(weight);
    const H = parseFloat(height) / 100;
    if (!W || !H) return null;
    const bmi = W / (H * H);
    const category =
      bmi < 18.5 ? "Underweight"
      : bmi < 25 ? "Normal weight"
      : bmi < 30 ? "Overweight"
      : "Obese";
    return {
      primary: { label: "BMI", value: bmi.toFixed(1) },
      breakdown: [
        { label: "Category", value: category },
        { label: "Healthy Range", value: "18.5 – 24.9" },
      ],
    };
  },
  content: {
    what: "BMI (Body Mass Index) is a numerical value calculated from your height and weight that serves as a simple screening tool for weight categories. It is widely used by healthcare professionals to identify potential weight-related health risks. BMI is not a diagnostic tool — it doesn't measure body fat directly.",
    formula: "BMI = Weight (kg) / Height (m)²\n\nCategories: Underweight < 18.5 | Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: ≥ 30",
    example: "Weight: 70 kg | Height: 175 cm (1.75 m)\nBMI = 70 / (1.75)² = 70 / 3.0625 ≈ 22.9 → Normal weight",
    faqs: [
      { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is considered normal/healthy for adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese." },
      { q: "Is BMI accurate?", a: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat, so muscular individuals may have a high BMI without excess fat." },
      { q: "What is a healthy BMI for Indians?", a: "Some studies suggest lower BMI cutoffs for South Asians — overweight at 23 and obese at 25 — due to higher visceral fat at lower BMIs compared to Western populations." },
      { q: "How can I lower my BMI?", a: "BMI decreases with weight loss, achieved through a calorie deficit (diet + exercise). Even a 5–10% reduction in body weight can significantly improve health markers." },
    ],
    related: ["bmr-calculator", "ideal-weight-calculator", "calories-burned-calculator", "water-intake-calculator"],
  },
};

const bmrCalculator = {
  id: "bmr-calculator",
  name: "BMR Calculator",
  category: "Health",
  description: "Basal Metabolic Rate (Mifflin-St Jeor)",
  inputs: [
    { name: "weight", label: "Weight (kg)", type: "number", placeholder: "70" },
    { name: "height", label: "Height (cm)", type: "number", placeholder: "175" },
    { name: "age", label: "Age (years)", type: "number", placeholder: "25" },
    { name: "gender", label: "Gender (1=Male, 0=Female)", type: "number", placeholder: "1" },
  ],
  calculate: ({ weight, height, age, gender }) => {
    const W = parseFloat(weight);
    const H = parseFloat(height);
    const A = parseFloat(age);
    const G = parseFloat(gender);
    if (!W || !H || !A) return null;
    const bmr = G === 0
      ? 10 * W + 6.25 * H - 5 * A - 161
      : 10 * W + 6.25 * H - 5 * A + 5;
    return {
      primary: { label: "BMR (calories/day)", value: bmr.toFixed(0) },
      breakdown: [
        { label: "Sedentary (×1.2)", value: `${(bmr * 1.2).toFixed(0)} kcal` },
        { label: "Moderate (×1.55)", value: `${(bmr * 1.55).toFixed(0)} kcal` },
        { label: "Active (×1.725)", value: `${(bmr * 1.725).toFixed(0)} kcal` },
      ],
    };
  },
  content: {
    what: "BMR (Basal Metabolic Rate) is the number of calories your body needs at complete rest just to maintain vital functions — breathing, circulation, cell production, and temperature regulation. It is the baseline for calculating total daily calorie needs and is essential for designing effective diet plans.",
    formula: "Mifflin-St Jeor Equation:\nMale: BMR = 10W + 6.25H − 5A + 5\nFemale: BMR = 10W + 6.25H − 5A − 161\n\nW = weight (kg), H = height (cm), A = age (years)\nMultiply by activity factor for TDEE (Total Daily Energy Expenditure).",
    example: "Male | Weight: 70 kg | Height: 175 cm | Age: 25\nBMR = (10×70) + (6.25×175) − (5×25) + 5 = 700 + 1093.75 − 125 + 5 = 1,673.75 kcal/day",
    faqs: [
      { q: "What is BMR?", a: "BMR is the number of calories your body burns at rest to maintain basic life functions. It accounts for roughly 60–70% of total daily calorie expenditure." },
      { q: "How do I use BMR to lose weight?", a: "Multiply your BMR by your activity factor to get TDEE. Eat 300–500 calories below TDEE to lose weight at a healthy rate of 0.3–0.5 kg per week." },
      { q: "Does BMR change with age?", a: "Yes. BMR generally decreases with age as muscle mass declines. This is why maintaining muscle through resistance training is important for long-term metabolic health." },
      { q: "What is the difference between BMR and TDEE?", a: "BMR is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) is BMR multiplied by an activity factor — it represents actual daily calorie needs." },
    ],
    related: ["bmi-calculator", "calories-burned-calculator", "ideal-weight-calculator", "water-intake-calculator"],
  },
};

const caloriesBurnedCalculator = {
  id: "calories-burned-calculator",
  name: "Calories Burned",
  category: "Health",
  description: "Estimate calories burned during exercise",
  inputs: [
    { name: "weight", label: "Weight (kg)", type: "number", placeholder: "70" },
    { name: "duration", label: "Duration (minutes)", type: "number", placeholder: "30" },
    { name: "met", label: "MET (3=walk, 6=run, 8=swim)", type: "number", placeholder: "6" },
  ],
  calculate: ({ weight, duration, met }) => {
    const W = parseFloat(weight);
    const D = parseFloat(duration);
    const M = parseFloat(met);
    if (!W || !D || !M) return null;
    const calories = (M * W * D) / 60;
    return {
      primary: { label: "Calories Burned", value: `${calories.toFixed(0)} kcal` },
      breakdown: [
        { label: "Duration", value: `${D} min` },
        { label: "MET Value", value: M.toString() },
        { label: "Intensity", value: M < 4 ? "Light" : M < 7 ? "Moderate" : "Vigorous" },
      ],
    };
  },
  content: {
    what: "Calories burned during exercise depend on your body weight, the duration of activity, and the intensity measured by MET (Metabolic Equivalent of Task). A MET of 1 equals the energy spent sitting at rest. Walking has a MET of ~3.5, jogging ~7, and running ~9+.",
    formula: "Calories = MET × Weight (kg) × Duration (hours)\nOr: Calories = (MET × Weight × Duration in minutes) / 60",
    example: "Weight: 70 kg | Duration: 30 min | MET: 6 (jogging)\nCalories = (6 × 70 × 30) / 60 = 210 kcal",
    faqs: [
      { q: "What is a MET value?", a: "MET (Metabolic Equivalent of Task) measures exercise intensity relative to rest. Walking ≈ 3.5, cycling ≈ 6, running ≈ 8–10, swimming ≈ 7–8." },
      { q: "Why does body weight affect calories burned?", a: "Heavier individuals burn more calories doing the same activity because more energy is required to move greater mass." },
      { q: "How accurate is this calculator?", a: "It provides a good estimate. Actual calories vary based on fitness level, terrain, temperature, and individual metabolism." },
    ],
    related: ["bmi-calculator", "bmr-calculator", "water-intake-calculator", "ideal-weight-calculator"],
  },
};

const waterIntakeCalculator = {
  id: "water-intake-calculator",
  name: "Water Intake",
  category: "Health",
  description: "Daily water intake recommendation",
  inputs: [
    { name: "weight", label: "Weight (kg)", type: "number", placeholder: "70" },
    { name: "activityLevel", label: "Activity (1=low, 2=mod, 3=high)", type: "number", placeholder: "2" },
  ],
  calculate: ({ weight, activityLevel }) => {
    const W = parseFloat(weight);
    const A = parseFloat(activityLevel) || 1;
    if (!W) return null;
    const base = W * 0.033;
    const extra = A === 2 ? 0.35 : A === 3 ? 0.7 : 0;
    const total = base + extra;
    return {
      primary: { label: "Daily Water Intake", value: `${total.toFixed(1)} L` },
      breakdown: [
        { label: "Base Intake", value: `${base.toFixed(1)} L` },
        { label: "Activity Bonus", value: `${extra.toFixed(1)} L` },
        { label: "Glasses (~250ml)", value: `${Math.round(total / 0.25)}` },
      ],
    };
  },
  content: {
    what: "Staying properly hydrated is essential for nearly every bodily function — digestion, temperature regulation, joint lubrication, and cognitive performance. Water needs vary by body weight, activity level, climate, and diet. This calculator gives a personalised daily water intake target.",
    formula: "Base = Weight (kg) × 0.033 litres\nActivity bonus: Moderate = +0.35 L, High = +0.70 L\nTotal = Base + Activity bonus",
    example: "Weight: 70 kg | Moderate activity\nBase = 70 × 0.033 = 2.31 L\nBonus = 0.35 L\nTotal = 2.66 L ≈ 11 glasses",
    faqs: [
      { q: "How much water should I drink per day?", a: "A common guideline is 35 ml per kg of body weight. Active individuals need more to compensate for fluid lost through sweat." },
      { q: "Does coffee count towards water intake?", a: "Mildly caffeinated drinks (1–2 cups of coffee/tea) do contribute to hydration. Highly caffeinated drinks have a mild diuretic effect." },
      { q: "What are signs of dehydration?", a: "Dark urine, dry mouth, fatigue, dizziness, and headaches are common signs. Mild dehydration of just 1–2% body weight can impair concentration." },
    ],
    related: ["bmi-calculator", "bmr-calculator", "calories-burned-calculator", "ideal-weight-calculator"],
  },
};

const idealWeightCalculator = {
  id: "ideal-weight-calculator",
  name: "Ideal Weight",
  category: "Health",
  description: "Calculate ideal body weight",
  inputs: [
    { name: "height", label: "Height (cm)", type: "number", placeholder: "175" },
    { name: "gender", label: "Gender (1=Male, 0=Female)", type: "number", placeholder: "1" },
  ],
  calculate: ({ height, gender }) => {
    const H = parseFloat(height);
    const G = parseFloat(gender);
    if (!H) return null;
    const hInches = H / 2.54;
    const base = G === 0 ? 45.5 : 50;
    const ideal = base + 2.3 * (hInches - 60);
    return {
      primary: { label: "Ideal Weight", value: `${ideal.toFixed(1)} kg` },
      breakdown: [
        { label: "Formula", value: "Devine" },
        { label: "Height", value: `${H} cm` },
        { label: "Range", value: `${(ideal - 5).toFixed(1)} – ${(ideal + 5).toFixed(1)} kg` },
      ],
    };
  },
  content: {
    what: "Ideal body weight is an estimate of the optimal weight for a given height, used as a reference in medical dosing, nutritional assessment, and health goal setting. Multiple formulas exist; this calculator uses the Devine formula, which is widely used in clinical practice.",
    formula: "Devine Formula:\nMale: IBW = 50 + 2.3 × (height in inches − 60)\nFemale: IBW = 45.5 + 2.3 × (height in inches − 60)",
    example: "Male | Height: 175 cm = 68.9 inches\nIBW = 50 + 2.3 × (68.9 − 60) = 50 + 20.47 ≈ 70.5 kg",
    faqs: [
      { q: "What is ideal body weight?", a: "IBW is a weight range considered healthy for a given height and gender, based on statistical and clinical data." },
      { q: "Is ideal weight the same for everyone of the same height?", a: "No. Muscle mass, bone density, and body composition all affect what is 'ideal' for an individual. IBW is a starting point, not an absolute target." },
      { q: "Which formula is most accurate?", a: "No single formula is universally accurate. The Devine, Hamwi, and Robinson formulas are all commonly used. BMI combined with body composition is a more complete picture." },
    ],
    related: ["bmi-calculator", "bmr-calculator", "calories-burned-calculator", "water-intake-calculator"],
  },
};

// ─── Math ────────────────────────────────────────────────────────────────────

const percentageCalculator = {
  id: "percentage-calculator",
  name: "Percentage Calculator",
  category: "Math",
  description: "Calculate percentage of a number",
  inputs: [
    { name: "value", label: "Value", type: "number", placeholder: "200" },
    { name: "percentage", label: "Percentage (%)", type: "number", placeholder: "15" },
  ],
  calculate: ({ value, percentage }) => {
    const V = parseFloat(value);
    const P = parseFloat(percentage);
    if (isNaN(V) || isNaN(P)) return null;
    const result = (V * P) / 100;
    return {
      primary: { label: `${P}% of ${V}`, value: result.toFixed(2) },
      breakdown: [
        { label: "Remaining", value: (V - result).toFixed(2) },
        { label: "Total with %", value: (V + result).toFixed(2) },
      ],
    };
  },
  content: {
    what: "A percentage is a way of expressing a number as a fraction of 100. Percentages are used everywhere — from calculating discounts and tax to expressing exam scores and interest rates. This calculator handles the most common percentage operations.",
    formula: "X% of Y = (X × Y) / 100\nPercentage change = ((New − Old) / Old) × 100",
    example: "15% of 200 = (15 × 200) / 100 = 30\nRemaining = 200 − 30 = 170",
    faqs: [
      { q: "How do I calculate what percentage one number is of another?", a: "Divide the part by the whole and multiply by 100. Example: 30 is what % of 200? → (30/200) × 100 = 15%." },
      { q: "How do I calculate a percentage increase?", a: "((New Value − Old Value) / Old Value) × 100. Example: from 100 to 120 → ((120−100)/100) × 100 = 20% increase." },
    ],
    related: ["discount-calculator", "gst-calculator", "ratio-calculator", "average-calculator"],
  },
};

const discountCalculator = {
  id: "discount-calculator",
  name: "Discount Calculator",
  category: "Math",
  description: "Calculate price after discount",
  inputs: [
    { name: "originalPrice", label: "Original Price (₹)", type: "number", placeholder: "1000" },
    { name: "discount", label: "Discount (%)", type: "number", placeholder: "20" },
  ],
  calculate: ({ originalPrice, discount }) => {
    const P = parseFloat(originalPrice);
    const D = parseFloat(discount);
    if (!P || isNaN(D)) return null;
    const discountAmount = (P * D) / 100;
    const finalPrice = P - discountAmount;
    return {
      primary: { label: "Final Price", value: `₹${finalPrice.toFixed(2)}` },
      breakdown: [
        { label: "Original Price", value: `₹${P.toFixed(2)}` },
        { label: "Discount", value: `₹${discountAmount.toFixed(2)}` },
        { label: "You Save", value: `₹${discountAmount.toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "A discount is a reduction in the original price of a product or service. Discounts are expressed as a percentage and are common in retail sales, e-commerce, and B2B pricing. Knowing the actual savings amount — not just the percentage — helps make better purchase decisions.",
    formula: "Discount Amount = Original Price × Discount% / 100\nFinal Price = Original Price − Discount Amount",
    example: "Original: ₹1,000 | Discount: 20%\nDiscount = 1,000 × 20 / 100 = ₹200\nFinal price = ₹800",
    faqs: [
      { q: "How do I calculate the final price after a discount?", a: "Multiply the original price by (1 − discount%/100). For 20% off ₹1,000 → 1,000 × 0.8 = ₹800." },
      { q: "How do I find the original price from a discounted price?", a: "Divide the discounted price by (1 − discount%/100). Example: ₹800 after 20% off → 800 / 0.8 = ₹1,000." },
    ],
    related: ["percentage-calculator", "gst-calculator", "tip-calculator"],
  },
};

const powerCalculator = {
  id: "power-calculator",
  name: "Power / Exponent",
  category: "Math",
  description: "Calculate base raised to a power",
  inputs: [
    { name: "base", label: "Base", type: "number", placeholder: "2" },
    { name: "exponent", label: "Exponent", type: "number", placeholder: "10" },
  ],
  calculate: ({ base, exponent }) => {
    const B = parseFloat(base);
    const E = parseFloat(exponent);
    if (isNaN(B) || isNaN(E)) return null;
    const result = Math.pow(B, E);
    return {
      primary: { label: `${B}^${E}`, value: result.toString() },
      breakdown: [
        { label: "Square Root", value: Math.sqrt(Math.abs(result)).toFixed(4) },
        { label: "Log (base 10)", value: result > 0 ? Math.log10(result).toFixed(4) : "N/A" },
      ],
    };
  },
  content: {
    what: "A power or exponent represents repeated multiplication of a base number by itself. Exponents are foundational in algebra, computer science (binary: 2^n), finance (compound growth), and physics. Negative exponents represent fractions; fractional exponents represent roots.",
    formula: "bⁿ = b × b × b … (n times)\nb⁻ⁿ = 1 / bⁿ\nb^(1/n) = ⁿ√b",
    example: "2^10 = 1024\n2^-3 = 1/8 = 0.125\n9^0.5 = √9 = 3",
    faqs: [
      { q: "What is a negative exponent?", a: "A negative exponent means the reciprocal: b^−n = 1/bⁿ. For example, 2^−3 = 1/8 = 0.125." },
      { q: "What is anything raised to the power of 0?", a: "Any non-zero number raised to the power of 0 equals 1. This is a mathematical convention." },
    ],
    related: ["percentage-calculator", "ratio-calculator", "average-calculator", "compound-interest-calculator"],
  },
};

const ratioCalculator = {
  id: "ratio-calculator",
  name: "Ratio Calculator",
  category: "Math",
  description: "Simplify and solve ratios",
  inputs: [
    { name: "a", label: "Value A", type: "number", placeholder: "4" },
    { name: "b", label: "Value B", type: "number", placeholder: "6" },
  ],
  calculate: ({ a, b }) => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    if (!A || !B) return null;
    const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(A, B);
    return {
      primary: { label: "Simplified Ratio", value: `${A / g} : ${B / g}` },
      breakdown: [
        { label: "Percentage A", value: `${((A / (A + B)) * 100).toFixed(1)}%` },
        { label: "Percentage B", value: `${((B / (A + B)) * 100).toFixed(1)}%` },
      ],
    };
  },
  content: {
    what: "A ratio compares two quantities by division. Ratios are used in cooking, finance (debt-to-equity), maps, and engineering. Simplifying a ratio means dividing both values by their GCD (Greatest Common Divisor) to get the smallest equivalent whole numbers.",
    formula: "Simplified Ratio = A/GCD : B/GCD\nWhere GCD = Greatest Common Divisor of A and B",
    example: "A = 4, B = 6 → GCD = 2\nSimplified = 4/2 : 6/2 = 2 : 3\nA is 40%, B is 60% of the total.",
    faqs: [
      { q: "How do you simplify a ratio?", a: "Divide both numbers by their Greatest Common Divisor (GCD). For example, 12:8 → GCD is 4 → 3:2." },
      { q: "What is a ratio used for?", a: "Ratios are used in recipes, maps (scale), finance (P/E ratio, debt-to-equity), and any situation where you compare two quantities proportionally." },
    ],
    related: ["percentage-calculator", "average-calculator", "discount-calculator"],
  },
};

const averageCalculator = {
  id: "average-calculator",
  name: "Average Calculator",
  category: "Math",
  description: "Calculate average of numbers (comma-separated)",
  inputs: [
    { name: "numbers", label: "Numbers (comma-separated)", type: "text", placeholder: "10, 20, 30, 40" },
  ],
  calculate: ({ numbers }) => {
    const nums = String(numbers).split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return null;
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    return {
      primary: { label: "Average (Mean)", value: avg.toFixed(2) },
      breakdown: [
        { label: "Count", value: nums.length.toString() },
        { label: "Sum", value: sum.toFixed(2) },
        { label: "Median", value: median.toFixed(2) },
        { label: "Min / Max", value: `${Math.min(...nums)} / ${Math.max(...nums)}` },
      ],
    };
  },
  content: {
    what: "The average (arithmetic mean) is the sum of all values divided by the count. It is the most commonly used measure of central tendency. The median (middle value) is often more useful when data has outliers. This calculator gives you both along with min, max, and sum.",
    formula: "Mean = Sum of all values / Count\nMedian = Middle value when sorted (or average of two middle values)",
    example: "Numbers: 10, 20, 30, 40\nSum = 100 | Count = 4\nMean = 25 | Median = 25",
    faqs: [
      { q: "What is the difference between mean and median?", a: "Mean is the arithmetic average. Median is the middle value. Median is less affected by outliers — for example, median salary is more representative than mean salary in a skewed dataset." },
      { q: "When should I use median instead of mean?", a: "Use median when your dataset has extreme outliers (like income data). Use mean when data is normally distributed without extreme values." },
    ],
    related: ["percentage-calculator", "ratio-calculator", "grade-calculator"],
  },
};

// ─── Unit Converters ─────────────────────────────────────────────────────────

const lengthConverter = {
  id: "length-converter",
  name: "Length Converter",
  category: "Converter",
  description: "Convert between length units",
  inputs: [
    { name: "value", label: "Value", type: "number", placeholder: "100" },
    { name: "from", label: "From (1=m, 2=km, 3=cm, 4=ft, 5=in)", type: "number", placeholder: "1" },
    { name: "to", label: "To (1=m, 2=km, 3=cm, 4=ft, 5=in)", type: "number", placeholder: "4" },
  ],
  calculate: ({ value, from, to }) => {
    const V = parseFloat(value);
    const F = parseInt(from);
    const T = parseInt(to);
    if (isNaN(V) || !F || !T) return null;
    const toMeters = { 1: 1, 2: 1000, 3: 0.01, 4: 0.3048, 5: 0.0254 };
    const labels = { 1: "m", 2: "km", 3: "cm", 4: "ft", 5: "in" };
    const meters = V * (toMeters[F] || 1);
    const result = meters / (toMeters[T] || 1);
    return {
      primary: { label: `${V} ${labels[F]} in ${labels[T]}`, value: result.toFixed(4) },
      breakdown: [
        { label: "In meters", value: `${meters.toFixed(4)} m` },
        { label: "In km", value: `${(meters / 1000).toFixed(6)} km` },
        { label: "In feet", value: `${(meters / 0.3048).toFixed(4)} ft` },
      ],
    };
  },
  content: {
    what: "Length conversion lets you translate a measurement from one unit system to another. The metric system (mm, cm, m, km) and the imperial system (inches, feet, yards, miles) are the two most common. Accurate conversions are essential in engineering, construction, travel, and everyday tasks.",
    formula: "All units convert via meters:\n1 km = 1000 m | 1 cm = 0.01 m | 1 ft = 0.3048 m | 1 in = 0.0254 m\nTo convert A → B: convert A to meters, then meters to B.",
    example: "100 cm to feet:\n100 cm = 1 m\n1 m / 0.3048 = 3.2808 ft",
    faqs: [
      { q: "How many cm in an inch?", a: "1 inch = 2.54 cm exactly. Conversely, 1 cm = 0.3937 inches." },
      { q: "How many feet in a meter?", a: "1 meter = 3.2808 feet. 1 foot = 0.3048 meters." },
      { q: "How many km in a mile?", a: "1 mile = 1.60934 km. 1 km = 0.62137 miles." },
    ],
    related: ["weight-converter", "temperature-converter", "speed-converter"],
  },
};

const temperatureConverter = {
  id: "temperature-converter",
  name: "Temperature Converter",
  category: "Converter",
  description: "Convert between Celsius, Fahrenheit, Kelvin",
  inputs: [
    { name: "value", label: "Temperature Value", type: "number", placeholder: "100" },
    { name: "from", label: "From (1=°C, 2=°F, 3=K)", type: "number", placeholder: "1" },
  ],
  calculate: ({ value, from }) => {
    const V = parseFloat(value);
    const F = parseInt(from);
    if (isNaN(V) || !F) return null;
    let celsius;
    if (F === 1) celsius = V;
    else if (F === 2) celsius = (V - 32) * 5 / 9;
    else celsius = V - 273.15;
    const fahrenheit = celsius * 9 / 5 + 32;
    const kelvin = celsius + 273.15;
    return {
      primary: { label: "Celsius", value: `${celsius.toFixed(2)} °C` },
      breakdown: [
        { label: "Fahrenheit", value: `${fahrenheit.toFixed(2)} °F` },
        { label: "Kelvin", value: `${kelvin.toFixed(2)} K` },
      ],
    };
  },
  content: {
    what: "Temperature can be expressed in three main scales: Celsius (°C) used in most countries, Fahrenheit (°F) used in the US, and Kelvin (K) used in scientific contexts. Kelvin starts at absolute zero (−273.15°C), the lowest possible temperature.",
    formula: "°C to °F: F = C × 9/5 + 32\n°F to °C: C = (F − 32) × 5/9\n°C to K: K = C + 273.15\nK to °C: C = K − 273.15",
    example: "100°C to °F: 100 × 9/5 + 32 = 212°F (water boiling point)\n0°C = 32°F = 273.15 K (water freezing point)",
    faqs: [
      { q: "What is the formula to convert Celsius to Fahrenheit?", a: "°F = °C × 9/5 + 32. For example, 37°C (body temperature) = 37 × 1.8 + 32 = 98.6°F." },
      { q: "What is absolute zero?", a: "Absolute zero is 0 Kelvin = −273.15°C = −459.67°F. It is the theoretical lowest possible temperature where particles have minimal thermal motion." },
      { q: "At what temperature are Celsius and Fahrenheit equal?", a: "At −40°. Both scales read −40 at that point." },
    ],
    related: ["length-converter", "weight-converter", "speed-converter"],
  },
};

const weightConverter = {
  id: "weight-converter",
  name: "Weight Converter",
  category: "Converter",
  description: "Convert between weight units",
  inputs: [
    { name: "value", label: "Value", type: "number", placeholder: "70" },
    { name: "from", label: "From (1=kg, 2=lb, 3=g, 4=oz)", type: "number", placeholder: "1" },
    { name: "to", label: "To (1=kg, 2=lb, 3=g, 4=oz)", type: "number", placeholder: "2" },
  ],
  calculate: ({ value, from, to }) => {
    const V = parseFloat(value);
    const F = parseInt(from);
    const T = parseInt(to);
    if (isNaN(V) || !F || !T) return null;
    const toKg = { 1: 1, 2: 0.453592, 3: 0.001, 4: 0.0283495 };
    const labels = { 1: "kg", 2: "lb", 3: "g", 4: "oz" };
    const kg = V * (toKg[F] || 1);
    const result = kg / (toKg[T] || 1);
    return {
      primary: { label: `${V} ${labels[F]} in ${labels[T]}`, value: result.toFixed(4) },
      breakdown: [
        { label: "In kg", value: `${kg.toFixed(4)} kg` },
        { label: "In pounds", value: `${(kg / 0.453592).toFixed(4)} lb` },
        { label: "In grams", value: `${(kg * 1000).toFixed(2)} g` },
      ],
    };
  },
  content: {
    what: "Weight (or mass) units vary by context: kilograms and grams are metric; pounds and ounces are imperial. Accurate weight conversion is important in cooking, shipping, fitness, and medicine.",
    formula: "Base unit: kilogram (kg)\n1 lb = 0.453592 kg | 1 g = 0.001 kg | 1 oz = 0.0283495 kg\nConvert via kg: value × fromFactor / toFactor",
    example: "70 kg to pounds:\n70 × (1 / 0.453592) = 154.32 lb",
    faqs: [
      { q: "How many kg in a pound?", a: "1 pound = 0.4536 kg. 1 kg = 2.2046 pounds." },
      { q: "How many grams in an ounce?", a: "1 ounce = 28.3495 grams." },
      { q: "How many kg in a stone?", a: "1 stone = 6.35029 kg (used in UK for body weight)." },
    ],
    related: ["length-converter", "temperature-converter", "bmi-calculator"],
  },
};

const speedConverter = {
  id: "speed-converter",
  name: "Speed Converter",
  category: "Converter",
  description: "Convert between speed units",
  inputs: [
    { name: "value", label: "Speed Value", type: "number", placeholder: "100" },
    { name: "from", label: "From (1=km/h, 2=mph, 3=m/s, 4=knots)", type: "number", placeholder: "1" },
  ],
  calculate: ({ value, from }) => {
    const V = parseFloat(value);
    const F = parseInt(from);
    if (isNaN(V) || !F) return null;
    const toMps = { 1: 1 / 3.6, 2: 0.44704, 3: 1, 4: 0.514444 };
    const mps = V * (toMps[F] || 1);
    return {
      primary: { label: "m/s", value: `${mps.toFixed(4)} m/s` },
      breakdown: [
        { label: "km/h", value: `${(mps * 3.6).toFixed(4)}` },
        { label: "mph", value: `${(mps / 0.44704).toFixed(4)}` },
        { label: "knots", value: `${(mps / 0.514444).toFixed(4)}` },
      ],
    };
  },
  content: {
    what: "Speed measures distance travelled per unit of time. Different industries use different units: km/h for road vehicles, mph in the US and UK, m/s in physics, and knots in aviation and maritime navigation.",
    formula: "Base unit: m/s\n1 km/h = 1/3.6 m/s ≈ 0.2778 m/s\n1 mph = 0.44704 m/s\n1 knot = 0.514444 m/s",
    example: "100 km/h to mph:\n100 km/h = 100/3.6 m/s = 27.78 m/s\n27.78 / 0.44704 ≈ 62.14 mph",
    faqs: [
      { q: "How many km/h is 60 mph?", a: "60 mph = 96.56 km/h." },
      { q: "What is a knot?", a: "A knot is one nautical mile per hour. 1 knot = 1.852 km/h = 1.151 mph. Used in aviation and maritime navigation." },
    ],
    related: ["length-converter", "weight-converter", "temperature-converter", "fuel-cost-calculator"],
  },
};

// ─── Education ───────────────────────────────────────────────────────────────

const cgpaCalculator = {
  id: "cgpa-calculator",
  name: "CGPA Calculator",
  category: "Education",
  description: "Convert CGPA to percentage and grade",
  inputs: [
    { name: "cgpa", label: "CGPA (out of 10)", type: "number", placeholder: "8.5" },
  ],
  calculate: ({ cgpa }) => {
    const C = parseFloat(cgpa);
    if (!C || C > 10) return null;
    const percentage = C * 9.5;
    const grade =
      C >= 9 ? "O (Outstanding)"
      : C >= 8 ? "A+ (Excellent)"
      : C >= 7 ? "A (Very Good)"
      : C >= 6 ? "B+ (Good)"
      : C >= 5 ? "B (Above Average)"
      : "F (Fail)";
    return {
      primary: { label: "Percentage", value: `${percentage.toFixed(2)}%` },
      breakdown: [
        { label: "CGPA", value: C.toString() },
        { label: "Grade", value: grade },
      ],
    };
  },
  content: {
    what: "CGPA (Cumulative Grade Point Average) is the average of grade points obtained in all subjects, measured on a scale of 10 in most Indian universities. Converting CGPA to percentage is required for job applications, higher education admissions, and government forms.",
    formula: "Percentage = CGPA × 9.5\n(This is the formula prescribed by CBSE and many Indian universities.)",
    example: "CGPA: 8.5\nPercentage = 8.5 × 9.5 = 80.75%",
    faqs: [
      { q: "How is CGPA converted to percentage?", a: "Multiply your CGPA by 9.5. This formula is standardised by CBSE and used by most Indian universities." },
      { q: "Is 7.5 CGPA a first class?", a: "Yes. 7.5 CGPA = 71.25%, which qualifies as First Class (≥60%) in most Indian university grading systems." },
      { q: "What is a good CGPA?", a: "8.0+ is considered excellent, 7.0–7.9 is very good, 6.0–6.9 is good. Many companies set a minimum CGPA of 6.0 or 7.0 for campus placements." },
    ],
    related: ["grade-calculator", "percentage-calculator", "average-calculator"],
  },
};

const gradeCalculator = {
  id: "grade-calculator",
  name: "Grade Calculator",
  category: "Education",
  description: "Calculate weighted average grade",
  inputs: [
    { name: "scores", label: "Scores (comma-separated)", type: "text", placeholder: "85, 90, 78, 92" },
    { name: "weights", label: "Weights (comma-separated, optional)", type: "text", placeholder: "1, 1, 1, 1" },
  ],
  calculate: ({ scores, weights }) => {
    const S = String(scores).split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const W = String(weights || "").split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (S.length === 0) return null;
    const effectiveWeights = W.length === S.length ? W : S.map(() => 1);
    const totalWeight = effectiveWeights.reduce((a, b) => a + b, 0);
    const weightedSum = S.reduce((acc, s, i) => acc + s * effectiveWeights[i], 0);
    const avg = weightedSum / totalWeight;
    const grade =
      avg >= 90 ? "A"
      : avg >= 80 ? "B"
      : avg >= 70 ? "C"
      : avg >= 60 ? "D"
      : "F";
    return {
      primary: { label: "Weighted Average", value: avg.toFixed(2) },
      breakdown: [
        { label: "Letter Grade", value: grade },
        { label: "Subjects", value: S.length.toString() },
        { label: "Highest", value: Math.max(...S).toString() },
        { label: "Lowest", value: Math.min(...S).toString() },
      ],
    };
  },
  content: {
    what: "A grade calculator helps students find their weighted average across subjects or assignments. When subjects carry different credits or weights (e.g., major subjects worth more than electives), a simple average isn't accurate — a weighted average is needed.",
    formula: "Weighted Average = Σ(Score × Weight) / Σ(Weights)\nIf no weights provided, all subjects are equally weighted.",
    example: "Scores: 85, 90, 78 | Weights: 3, 2, 1\nWeighted sum = (85×3) + (90×2) + (78×1) = 255+180+78 = 513\nTotal weight = 6 | Average = 513/6 = 85.5",
    faqs: [
      { q: "What is a weighted grade?", a: "A weighted grade accounts for the relative importance of each subject or assignment. Subjects with higher credit hours or weights contribute more to the final average." },
      { q: "How do I calculate my final grade?", a: "Enter all your subject scores separated by commas. If subjects have different credits/weights, enter those too. The calculator gives your weighted average." },
    ],
    related: ["cgpa-calculator", "percentage-calculator", "average-calculator"],
  },
};

// ─── Everyday ────────────────────────────────────────────────────────────────

const ageCalculator = {
  id: "age-calculator",
  name: "Age Calculator",
  category: "Everyday",
  description: "Calculate exact age from date of birth",
  inputs: [
    { name: "dob", label: "Date of Birth", type: "date", placeholder: "" },
  ],
  calculate: ({ dob }) => {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    return {
      primary: { label: "Age", value: `${years} years` },
      breakdown: [
        { label: "Months & Days", value: `${months} months, ${days} days` },
        { label: "Total Days", value: totalDays.toLocaleString() },
        { label: "Total Weeks", value: Math.floor(totalDays / 7).toLocaleString() },
      ],
    };
  },
  content: {
    what: "An age calculator computes the exact age from your date of birth to today, broken down into years, months, days, total weeks, and total days. It is commonly used for filling forms, checking eligibility criteria, and planning birthdays.",
    formula: "Age = Today's date − Date of Birth\nCalculated precisely accounting for leap years and varying month lengths.",
    example: "DOB: Jan 1, 2000 | Today: Jun 7, 2026\nAge = 26 years, 5 months, 6 days\nTotal days ≈ 9,654",
    faqs: [
      { q: "How is age calculated exactly?", a: "By subtracting the birth date from today's date, accounting for month-end boundaries and leap years." },
      { q: "Why does my age in days differ from age × 365?", a: "Because years have 365 or 366 days (leap years), and the calculator counts each day precisely rather than estimating." },
    ],
    related: ["date-difference-calculator", "tip-calculator", "fuel-cost-calculator"],
  },
};

const dateDiffCalculator = {
  id: "date-difference-calculator",
  name: "Date Difference",
  category: "Everyday",
  description: "Calculate difference between two dates",
  inputs: [
    { name: "date1", label: "Start Date", type: "date", placeholder: "" },
    { name: "date2", label: "End Date", type: "date", placeholder: "" },
  ],
  calculate: ({ date1, date2 }) => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2 - d1);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365.25);
    return {
      primary: { label: "Days Between", value: days.toLocaleString() },
      breakdown: [
        { label: "Weeks", value: weeks.toLocaleString() },
        { label: "Months (approx)", value: months.toString() },
        { label: "Years (approx)", value: years.toString() },
      ],
    };
  },
  content: {
    what: "The date difference calculator finds the number of days, weeks, months, or years between any two dates. Useful for project timelines, contract durations, tracking deadlines, calculating someone's age between two specific dates, or finding how many days until an event.",
    formula: "Difference = |Date2 − Date1| in milliseconds\nDays = Difference / (1000 × 60 × 60 × 24)",
    example: "Start: Jan 1, 2024 | End: Jun 7, 2026\nDays = 888 | Weeks = 126 | Months ≈ 29 | Years ≈ 2",
    faqs: [
      { q: "How do I count the number of working days between two dates?", a: "This calculator counts all calendar days. For working days, subtract weekends (approximately 2/7 of total days) and public holidays." },
      { q: "Why is the month count approximate?", a: "Calendar months vary in length (28–31 days). The calculator uses 30.44 days/month (365.25 ÷ 12) as an average." },
    ],
    related: ["age-calculator", "tip-calculator", "fuel-cost-calculator"],
  },
};

const tipCalculator = {
  id: "tip-calculator",
  name: "Tip Calculator",
  category: "Everyday",
  description: "Split bill and calculate tip",
  inputs: [
    { name: "bill", label: "Bill Amount (₹)", type: "number", placeholder: "1000" },
    { name: "tipPercent", label: "Tip (%)", type: "number", placeholder: "15" },
    { name: "people", label: "Number of People", type: "number", placeholder: "4" },
  ],
  calculate: ({ bill, tipPercent, people }) => {
    const B = parseFloat(bill);
    const T = parseFloat(tipPercent);
    const P = parseFloat(people) || 1;
    if (!B || isNaN(T)) return null;
    const tip = (B * T) / 100;
    const total = B + tip;
    return {
      primary: { label: "Per Person", value: `₹${(total / P).toFixed(2)}` },
      breakdown: [
        { label: "Bill", value: `₹${B.toFixed(2)}` },
        { label: "Tip", value: `₹${tip.toFixed(2)}` },
        { label: "Total", value: `₹${total.toFixed(2)}` },
        { label: "Tip per Person", value: `₹${(tip / P).toFixed(2)}` },
      ],
    };
  },
  content: {
    what: "A tip calculator quickly computes the tip amount and splits the total bill equally among a group of people. Tipping norms vary by country — in India tipping is discretionary, while in the US 15–20% is standard at restaurants.",
    formula: "Tip = Bill × Tip% / 100\nTotal = Bill + Tip\nPer Person = Total / Number of People",
    example: "Bill: ₹1,000 | Tip: 10% | 4 people\nTip = ₹100 | Total = ₹1,100\nPer person = ₹275",
    faqs: [
      { q: "How much should I tip in India?", a: "Tipping is discretionary in India. 5–10% is common at restaurants, and rounding up works at cafes. Hotel staff and delivery personnel appreciate ₹20–100." },
      { q: "Is tip calculated before or after tax?", a: "Conventionally, tip is calculated on the pre-tax amount, though in practice many people tip on the total bill." },
    ],
    related: ["discount-calculator", "percentage-calculator", "fuel-cost-calculator"],
  },
};

const fuelCostCalculator = {
  id: "fuel-cost-calculator",
  name: "Fuel Cost",
  category: "Everyday",
  description: "Calculate fuel cost for a trip",
  inputs: [
    { name: "distance", label: "Distance (km)", type: "number", placeholder: "500" },
    { name: "mileage", label: "Mileage (km/l)", type: "number", placeholder: "15" },
    { name: "fuelPrice", label: "Fuel Price (₹/l)", type: "number", placeholder: "100" },
  ],
  calculate: ({ distance, mileage, fuelPrice }) => {
    const D = parseFloat(distance);
    const M = parseFloat(mileage);
    const P = parseFloat(fuelPrice);
    if (!D || !M || !P) return null;
    const liters = D / M;
    const cost = liters * P;
    return {
      primary: { label: "Trip Cost", value: `₹${cost.toFixed(2)}` },
      breakdown: [
        { label: "Fuel Required", value: `${liters.toFixed(2)} L` },
        { label: "Cost per km", value: `₹${(cost / D).toFixed(2)}` },
        { label: "Distance", value: `${D} km` },
      ],
    };
  },
  content: {
    what: "The fuel cost calculator estimates how much a road trip will cost in fuel based on your vehicle's mileage (efficiency), the distance, and current fuel prices. Useful for trip planning, comparing car running costs, or deciding between driving and other transport.",
    formula: "Fuel Required = Distance / Mileage\nCost = Fuel Required × Fuel Price per Litre",
    example: "Distance: 500 km | Mileage: 15 km/l | Fuel price: ₹100/l\nFuel = 500/15 = 33.33 L\nCost = 33.33 × 100 = ₹3,333",
    faqs: [
      { q: "What is a good mileage for a car in India?", a: "Petrol hatchbacks average 15–20 km/l, sedans 12–17 km/l, SUVs 10–14 km/l, and diesel cars are typically 2–4 km/l better." },
      { q: "How do I find my car's actual mileage?", a: "Fill a full tank, drive normally, then refill and note the litres used and kilometres driven. Divide km by litres for real-world mileage." },
      { q: "How can I improve fuel efficiency?", a: "Maintain steady speeds, keep tyres properly inflated, avoid harsh acceleration/braking, and service your vehicle regularly." },
    ],
    related: ["tip-calculator", "date-difference-calculator", "speed-converter"],
  },
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const calculators = [
  emiCalculator,
  sipCalculator,
  fdCalculator,
  gstCalculator,
  ppfCalculator,
  simpleInterestCalculator,
  compoundInterestCalculator,
  bmiCalculator,
  bmrCalculator,
  caloriesBurnedCalculator,
  waterIntakeCalculator,
  idealWeightCalculator,
  percentageCalculator,
  discountCalculator,
  powerCalculator,
  ratioCalculator,
  averageCalculator,
  lengthConverter,
  temperatureConverter,
  weightConverter,
  speedConverter,
  cgpaCalculator,
  gradeCalculator,
  ageCalculator,
  dateDiffCalculator,
  tipCalculator,
  fuelCostCalculator,
];

export const categories = [...new Set(calculators.map(c => c.category))];

export const getCalculatorById = (id) => calculators.find(c => c.id === id);
export const getCalculatorsByCategory = (cat) => calculators.filter(c => c.category === cat);
