namespace Utils{
    class CustomException: Exception{
        public int ErrorCode{get;}
        public string Details{get;}
        public CustomException(string message, string details,int errorCode = 500):base(message){
            ErrorCode = errorCode;
            Details = details;
        }
    }
}