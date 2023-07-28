export const handleThunkError = (e, thunkApi) => {
  let errorMessage = 'Something went wrong'
  if (e && e.response && e.response.data && e.response.data.ErrorMessageEN) {
    errorMessage = e.response.data.ErrorMessageEN
  } else if (e && e.message) {
    errorMessage = e.message
  }

  return thunkApi.rejectWithValue({
    message: errorMessage,
  })
}
