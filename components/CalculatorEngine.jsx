"use client";
import { useCalculator } from "@/hooks/useCalculator";
import { getCalculatorById } from "@/lib/calculators";

// config prop only carries serializable data (id, name, inputs)
// We re-attach the calculate function from the registry on the client
export default function CalculatorEngine({ id }) {
  const config = getCalculatorById(id);
  const { values, result, handleChange, reset } = useCalculator(config);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Inputs */}
      <div className="space-y-3 mb-6">
        {config.inputs.map((input) => (
          <div key={input.name}>
            <label
              htmlFor={`input-${input.name}`}
              className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1"
            >
              {input.label}
            </label>
            <input
              id={`input-${input.name}`}
              type={input.type === "date" ? "date" : input.type === "text" ? "text" : "number"}
              inputMode={input.type === "number" ? "decimal" : undefined}
              placeholder={input.placeholder}
              value={values[input.name]}
              onChange={(e) => handleChange(input.name, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-lg text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 focus:bg-white transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Result */}
      {result ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-900 text-white px-5 py-5 text-center">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
              {result.primary.label}
            </p>
            <p className="text-4xl font-bold tracking-tight">{result.primary.value}</p>
          </div>
          {result.breakdown?.length > 0 && (
            <div className="divide-y divide-gray-100">
              {result.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="border border-dashed border-gray-200 rounded-lg px-5 py-8 text-center">
          <p className="text-gray-300 text-sm">Enter values above to see result</p>
        </div>
      )}

      <button
        onClick={reset}
        className="mt-4 w-full text-sm text-gray-400 hover:text-gray-700 py-2 transition-colors"
      >
        Clear
      </button>
    </div>
  );
}
