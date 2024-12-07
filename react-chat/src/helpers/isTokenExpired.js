const isTokenExpired = (exp) => {
  const expTime = parseInt(exp, 10);

  const expDate = new Date(expTime * 1000);

  const currentDate = new Date();

  return currentDate >= expDate;
};

export default isTokenExpired;
