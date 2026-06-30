export function formatDateRange(startDate, endDate) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function sumMacros(ingredients) {
  return ingredients.reduce(
    (totals, ingredient) => ({
      calories: totals.calories + Number(ingredient.calories || 0),
      protein: totals.protein + Number(ingredient.protein || 0),
      carbs: totals.carbs + Number(ingredient.carbs || 0),
      fat: totals.fat + Number(ingredient.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}
