export class UtilsHelper {
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
