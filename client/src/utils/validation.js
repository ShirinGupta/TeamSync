// Form validation utilities

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhoneNumber = (phone) => {
  // Accepts 10-15 digit phone numbers with optional +, -, (), spaces
  const regex = /^[+]?(?:[(]?[0-9]{3}[)]?)?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return regex.test(phone.replace(/\s/g, ''));
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateRole = (role) => {
  return role.trim().length >= 2;
};

export const validateFormData = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateRole(formData.role)) {
    errors.role = 'Role must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhoneNumber(formData.contact)) {
    errors.contact = 'Please enter a valid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getErrorMessage = (errors) => {
  return Object.values(errors).join(', ');
};
