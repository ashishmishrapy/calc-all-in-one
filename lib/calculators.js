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
