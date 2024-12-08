const isTokenExpired = (exp) => {
  const expTime = parseInt(exp, 10);

  const expDate = new Date(expTime * 1000);

  const expDateMinus5Minutes = new Date(expDate.getTime() - 5 * 60 * 1000);

  const currentDate = new Date();

  return currentDate >= expDateMinus5Minutes;
};

export default isTokenExpired;
