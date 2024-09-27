export default function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? "lime" : "white",
  };
  return (
    <div className="dice-div" style={style} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
}
