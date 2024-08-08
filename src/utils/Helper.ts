export class Helper {
    static generateUniqueUsername() {
      return `user${Math.floor(Math.random() * 10000)}`;
    }
  }
  