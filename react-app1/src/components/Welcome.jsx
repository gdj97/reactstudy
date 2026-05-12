const Welcome = function() {
  const name = "홍길동"
  const myStyle = {
      color : "yellow",
      backgroundColor : "black",
      padding : "10px",
      borderRadius : "20px"
  }
   return(
   <h1 style={myStyle}>안녕하세요. {name} 입니다</h1>
   )
}
export default Welcome;