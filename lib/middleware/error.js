module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  let message = err.message;
    
  if(status === 500 && process.env.NODE_ENV === 'production') {
    message = 'Server Error the ship is going down!';
  }
  res.status(status);

  if (process.env.NODE_ENV !== 'test' || status === 500){
    console.log(err);
  }

  res.send({ status, message });
};
