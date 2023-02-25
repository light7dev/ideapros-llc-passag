const validator = {
  name: {
    regEx: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
    error: 'Only aplhabetic letters are allowed with spaces in between.',
  },
  email: {
    regEx:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Invalid email address.',
  },
  phone: {
    regEx: /^\d+$/,
    error: 'Enter a valid phone number without a + sign.',
  },
  password: {
    regEx: /(?=^.{8,16}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    error:
      'Password must be minimum length 8 and maximum length 16 characters (with at least a lowercase letter and uppercase letter, a number and special character.',
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters',
    },
  },
  currentPassword: {
    regEx: /(?=^.{8,16}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    error:
      'Password must be minimum length 8 and maximum length 16 characters (with at least a lowercase letter and uppercase letter, a number and special character.',
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters',
    },
  },
  numeric: {
    regEx: /^\d+$/,
    error: 'Only numeric digits allowed.',
  },
};

export default validator;
