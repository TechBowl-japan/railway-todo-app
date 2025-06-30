/*
 * redux-toolkitでは、createAsyncThunk内で値をthrowしてもdispatch側で受け取れないため、
 * rejectWithValueを使ってエラーをdispatch側で受け取れるようにしている。
 */
export const handleThunkError = (e, thunkApi) => {
  let errorMessage = 'Something went wrong';
  if (e && e.response && e.response.data && e.response.data.ErrorMessageEN) {
    errorMessage = e.response.data.ErrorMessageEN;
  } else if (e && e.message) {
    errorMessage = e.message;
  }

  // NOTE: そのままエラーを入れるとシリアライズに失敗する
  return thunkApi.rejectWithValue({
    message: errorMessage,
  });
};
