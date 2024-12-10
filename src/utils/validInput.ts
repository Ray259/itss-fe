export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&]).{8,}$/.test(password);
export const isValidUsername = (username: string): boolean => username.length >= 6;
