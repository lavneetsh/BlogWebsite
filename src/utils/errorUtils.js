export function getFriendlyAuthErrorMessage(error) {
  // The error object from Firebase has a `code` property
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/weak-password':
      return 'Your password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    // Add more cases for other Firebase errors as needed
    default:
      // For any other error, return a generic message
      return 'An unexpected error occurred. Please try again.';
  }
}