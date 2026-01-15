export const DateUtils = {
  getMonths(count: number): string[] {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months.slice(0, count);
  }
}